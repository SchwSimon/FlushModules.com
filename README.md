# FlushModules.com

Community driven open source social network platform

**_https://FlushModules.com_**

# Module structure

How to build a module

> Following module keys are reserved, do not use them!
> - name
> - end

```js
(function( $, module ) {
	
  "use strict";

  $.mod.register( "myModule", module );
	
})( $, {
  
  // gets triggered when the module stops (on module change)
  onEnd: function() {
    this.node_myModule.removeEventListener( "click", this.listen, false );
  },
  
  listen: function( event ) {},
  
  // gets triggered when the module starts
  init: function( $, main, isMe, request ) {
    // $ -> reference to the global SewerFlush object
    // main -> the document node where to put your module's HTML in
    // isMe -> result of the $.isMe() function, see SewerFlush documentation below for info
    // request -> when opening flushmodules.com with the parameter "main" request will be its value
    
    
    // if this module is a user only module (means that client has to be on a users profile),
    // you can use this function to deny access to the module and print out an error message
    // - No user selected
    // - This user is not your friend
    if ( !$.mod.checkAccess( isMe ) ) { // module will only start when the client is logged in
      return;                           // the client is on his own module page
    }                                   // the client is on a friends module page
    // OR
    // if its a user only module but the client dont need to be friends or even logged in
    if ( !$.mod.checkAccess( isMe, false ) ) {  // just pass false as second argument
      return;
    }
    
    main.innerHTML =  '<div id="myModule">' +
                        '<div id="myModule-something">Something in here</div>' +
           (( isMe ) ?  '<div id="myModule-somethingPrivate">This will only see the logged in client on his own module page</div>' : '' ) +
                      '</div>';

    this.node_myModule = $.doc.getElementById( "myModule" );
    if ( isMe ) {
      this.node_somethingPrivate = $.doc.getElementById( "myModule-somethingPrivate" );
    }
    
    this.node_myModule.addEventListener( "click", this.listen, false );
  }
  
});
```

# App structure

How apps are started

Via HTML, by clicking one of these html elements
```html
<div data-app="myApp"></div>  <!-- Start "myApp" without a starter reference and optional argument -->
<div data-app="myApp:optArg"></div> <!-- Start "myApp" with an optional argument: "optArg" -->
<div data-app="myApp::starterName"></div> <!-- Start "myApp" with the starter name "starterName" -->
<div data-app="myApp:optArg:starterName"></div> <!-- Start "myApp" with an optiona argument and starter name -->
```
Via Javascript, by passing a string as it would be provided in an html element attribute like above
```js
$.app.start( "myApp" ); // Start "myApp" without a starter reference and optional argument
$.app.start( "myApp:optArg" );  // Start "myApp" with an optional argument: "optArg"
$.app.start( "myApp::starterName" );  // Start "myApp" with the starter name "starterName"
$.app.start( "myApp:optArg:starterName" );  // Start "myApp" with an optiona argument and starter name
```

How to build an app

> Following app keys are reserved, do not use them!
> - name
> - close (use "this.close();" when you want to programmatically close the app by itself)
> - pid
> - starter
> - kill
> - cKey (when using $.connector)
> - zLayer (when using zLayer)
> - zClick (when using zLayer)
> - zMin (when using zLayer)

## Without zLayer
```js
(function( $, app ) {
	
  "use strict";

  $.app.register( app, "myApp" );
	
})( $, {
  
  // gets triggered when the app gets closed
  onClose: function() {},
  
  // gets triggered on app start
  init: function( $, startArg ) {
    // $ -> reference to the global SewerFlush object
    // startArg -> an optional argument which can be given at app start
  }
	
});
```
## With zLayer
```js
(function( $, app ) {
	
  "use strict";

  $.app.register( app, "myApp" );
	
})( $, {
  
  // The html content for your zLayer
  // DO NOT use id's when the app is intended for running multiple times
  zHtml:  '<div class="app-myApp">' +
           '<div class="app-myApp-title">This is myApp</div>' +
          '</div>',
  
  // The click event which gets automatically binded to your zLayer
  zClick: function( event ) {},
  
  // Gets triggered when the zLayer gets minified
  zMin: function() {},
  
  // gets triggered when the app gets closed
  onClose: function() {},
  
  // some submit function for showcase only
  submit: function( data ) {
    if ( this.cKey ) {
      $.connector.use( this.cKey, data );
      this.close(); // close the app by itself
    }
  },
  
  // gets triggerd on app start OR on opening(when was minified)
  init: function( $, startArg ) {
    // $ -> reference to the global SewerFlush object
    // startArg -> an optional argument which can be given at app start
   
    // creates a new zLayer object OR trys to open if this reference exists and is minified
    if ( $.zLayer.create( this ) ) {
      // new zLayer created
      
      this.node_myApp = this.zLayer.zBody.getElementsByClassName( "app-myApp" )[0];
      this.node_title = this.zLayer.zBody.getElementsByClassName( "app-myApp-title" )[0];
    } else {
      // reference exists already
      
      this.node_title.textContent = "something";
    }
    
    // ---------------
    // assuming the app is intended to get an connector key as optional argument
    // the connector has to be registered before starting the app
    // A registered connector will get automatically removed on app close, as long as you 
    // define the cKey object variable like below.
    if ( startArg ) {
      this.cKey = startArg; // use "cKey" to store the connector key name
      $.connector.use( this.cKey, {
        somevar: "Hello callback!",
        app: this // like this you can pass the current app reference trough the connector
      });
    }
  }
	
});
```

# SewerFlush Documentation

**$**
> The global SewerFlush variable

**$.global**
> A reference to the global *window* object

**$.doc**
> A reference to the *window.document* object

**_$.url_** (var)
> Object containing complete urls *(directoy urls ending with a leading slash '/')*
> $.url.host  -> Domain url including the protocol
> $.url.data  -> Data path url
> $.url.ajax  -> Url for ajax requests
> $.url.users -> Users data url

**_$.user_**  (var)
> Contains the client user data *(if logged in)*
> $.user.id     -> User id
> $.user.name   -> Username
> $.user.avatar -> Avatar.jpg
> $.user.path   -> The users data path

**_$.userMain_**  (var)
> Contains the user data from the requested user
> Same as **$.user** except for one additional parameter
> $.userMain.isFriend  -> true / false

**_$.hOffset_** (var)
> The height offset in pixel from the global header


**_$.isMe()_**  (function)
> returns true if the client is logged in AND the requested user is the client himself respectively there is no user requested

**_$.userFriends.get()_** (function)
> Get the client's friends (only if logged in)
```js
$.userFriends.get({
  bind: this,
  success: function( data, $, bind ) {
    // data ->  array of user data objects
    // data[0].friend_id, data[0].username, data[0].avatar
    // $ -> SewerFlush reference
    // bind -> whatever you binded above
  },
  complete: function( $, bind ) {
    // optional on complete function
  }
});
```

**_$.hasClass()_**  (function)
> true / false
```js
$.hasClass( node, "classname" );
```

**_$.addClass()_**  (function)
> Adds a class to the node if it not already got that class
```js
$.addClass( node, "classname" );
```

**_$.removeClass()_**  (function)
> Removes a class from a node
```js
$.removeClass( node, "classname" );
```

**_$.toggleClass()_**  (function)
> Toggles a class on a node
```js
$.toggleClass( node, "classname" );
```

**_$.closest()_**  (function)
> Return the node which has the given class or id, beginning from input node upwards 
> If none found return false
```js
$.closest( node, ".classname" );
$.closest( node, "id" );
```

**_$.arrayIndexOfKey()_**  (function)
> Searches for a value in a given array of key value object
> Return the array index if found else null
```js
var arr = [ {"key_A":"value a"}, {"key_B":"value b"}, {"KeY":"ValuE"} ];
$.arrayIndexOfKey( arr, "KeY", "ValuE" ); // will return 2
```

**_$.empty()_**  (function)
> Emptys a node
```js
$.empty( $.doc.getElementById( "main" ) );
```

**_$.prefix()_**  (function)
> Returns a prefixed string by placing the prefix string before the needle (intended for prefixing filesnames)
```js
$.prefix( "avatar.jpg", "_prefix" );  // return "avatar_prefix.jpg"
```

**_$.htmlspecialdecode()_**  (function)
> When putting escaped text into input, textarea or into a node by using "node.textContent" use this function
> to decode the escapes back to characters
```js
$.htmlspecialdecode( "&amp; &quot; &lt; &gt;" );  // return '& " < >'
```

**_$.parseText()_**  (function)
> Returns the parsed html text ready for putting in to a node using "node.innerHTML"
```js
$.parseText( "@Simon here is a link https://flushmodules.com \n&lt;- Here is a break" );
// Returned html will be:  
// <a class="ov-link" href="https://flushmodules.com/?user=Simon" target="_blank">@Simon</a>  
// here is a link  
// <a class="ov-link" href="https://flushmodules.com" target="_blank">https://flushmodules.com</a>  
// <br><- Here is a break
```

**_$.uniqid()_**  (function)
> Returns a unique alphabetical string, prefixed by default with an underscore
```js
$.uniqid();  // return something like "_5j6gfndyh"
$.uniqid( "----" ); // return something like "----78afx6ob9"
```

**_$.time.parse()_**  (function)
> Parses a timestamp in the following format "year-month-day hours:minutes:seconds"
> Returns an object
```js
var time = $.time.parse( "2017-08-26 22:45:00" );
time.obj // An js Date object
time.date // "26.08.2017 - 22:45"
time.dateOnly // "26.08.2017"
time.time // "22:45"
time.past // "xx minutes/hours/days/weeks/months"
```

**_$.info()_**  (function)
> Creates an info popup dialog
```js
$.info( "Info title", "Info body content" );  // can be closed by clicking anywhere (has only an "Ok" button)
$.info( "Info title", "Info body content", function() { // when passing a function as third argument 
  console.log( "Confirmed" );                           // the dialog becomes a "Cancel" and "Confirm" button
});                                                     // now the dialog can only be close by cliing one of these
                                                        // will trigger the function on confirm
```

**_$.docScroll_**  (object)
> Set or get the document scroll position
```js
$.docScroll.get();  // the page Y offset (vertical scroll position) in pixel
$.docScroll.set( 500 ); // scrolls the document to 500px from top (without transition)
```

**_$.volume_**  (object)
> Set or get the global sound volume
```js
$.volume.get();  // returns a float value from 0.00 to 1.00
$.volume.set( 0.5 ); // set the global sound volume to 0.5
```

**_$.connector_**  (object)
> Register, use or remove a connector
> Connectors are used for app to app or module to app communication
```js
$.connector.register( "connector_key", function( data ) {
  console.log( data );
});
$.connector.is( "connector_key" );  // returns true
$.connector.use( "connector_key", "Hello data!" ); // will console.log -> "Hello data!"
$.connector.remove( "connector_key" );  // removes the connector
```

**_$.listen_**  (object)
> Register or remove global listening events
> !NOTE: "resize" and "scroll" events are getting throttled by 180ms so no need to take care of
> !!NOTE: Do not use a variable called 'e'
> !!!NOTE: There is only one global listener per event, one lister contains all registered functions for the given event
> !!!!IMPORTANT: Only register functions as string like in the example below
> Because otherwise the scripts may break when getting minified...
```js
$.listen.register( "resize", "listen_key", "function( e ) {" + // the function gets passed here as concated string
  "console.log('hello');" +                                    // for better readability
"}", true );                                                   // dont forget to pass true as last argument
$.listen.remove( "listen_key" );  // removes all listeners with the given key
$.listen.remove( "listen_key", "resize" ); // only removes the resize listener with that key
```



