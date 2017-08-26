# FlushModules.com


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
> Register a connector 
```js

```
