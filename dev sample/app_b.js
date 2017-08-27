(function( $, app ) {
	
  "use strict";

  $.app.register( app, "app_b" );
	
})( $, {
  
  zHtml:	'<div class="app-app_b">' +
					'<div class="app-app_b-title">App B</div>' +
					'<input type="text">' +
				'</div>',
				
  zClick: function( e ) {
    if ( e.target.className === "app-app_b-title" ) {
      console.log( "click on title" );
    }
  },
  
  zMin: function() {
	console.log( "app got minified" );
  },
  
  onClose: function() {

  },
  
  node_title: null,

  init: function( $, initArg ) {
	if ( $.zLayer.create( this ) ) {
		this.node_title = this.zLayer.zBody.getElementsByClassName( "app-app_b-title" )[0];
	}
  }
	
});