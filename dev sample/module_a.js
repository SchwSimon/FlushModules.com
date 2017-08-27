(function( $, module ) {
	
  "use strict";

  $.mod.register( "module_a", module );
	
})( $, {

  isMe: null,
  node_main: null,
  node_somethingPrivate: null,
  
  onEnd: function() {
	if ( this.isMe ) {
		this.node_somethingPrivate.removeEventListener( "mouseover", this.mouseover, false );
	}
    this.node_main.removeEventListener( "click", this.listen, false );
  },
  
  listen: function( event ) {},
  mouseover: function( event ) {},
  
  init: function( $, main, isMe ) {
	  
	this.isMe = isMe;

	main.innerHTML =	'<div id="module_a">' +
									'<div id="module_a-title">This is module A</div>' +
					(( isMe ) ?	'<div id="module_a-somethingPrivate">This will only see the logged in client on his own module page</div>' : '' ) +
								'</div>';

    this.node_main = $.doc.getElementById( "module_a" );
    if ( isMe ) {
      this.node_somethingPrivate = $.doc.getElementById( "module_a-somethingPrivate" );
	  this.node_somethingPrivate.addEventListener( "mouseover", this.mouseover, false );
    }
    
    this.node_main.addEventListener( "click", this.listen, false );
  }
  
});