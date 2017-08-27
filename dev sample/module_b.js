(function( $, module ) {
	
  "use strict";

  $.mod.register( "module_b", module );
	
})( $, {
  
  node_main: null,
  
  onEnd: function() {
    this.node_main.removeEventListener( "click", this.listen, false );
  },
  
  listen: function( event ) {},
  
  init: function( $, main ) {

	main.innerHTML =	'<div id="module_b">' +
									'<div id="module_b-title">This is module B</div>' +
								'</div>';

    this.node_main = $.doc.getElementById( "module_b" );
    
    this.node_main.addEventListener( "click", this.listen, false );
  }
  
});