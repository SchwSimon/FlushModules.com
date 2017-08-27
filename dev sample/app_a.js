(function( $, app ) {
	
  "use strict";

  $.app.register( app, "app_a" );
	
})( $, {
	
  dialog: null,
  
  onClose: function() {
	this.dialog.removeEventListener( "click", this.onClick, false );
	this.dialog.parentNode.removeChild( this.dialog );
  },
  
  onClick: function(e) {
	if ( e.target.hasAttribute( "data-close" ) ) {
		$.app.appsRunning[ e.target.getAttribute( "data-close" ) ].close();
	}
  },
  
  init: function( $, initArg ) {

	if ( !this.dialog ) {
		var dialog = $.doc.createElement( "div" );
		dialog.className = "app-app_a";
		dialog.setAttribute( "style", "border: 1px solid gray;" );
		dialog.innerHTML =	(( !initArg ) ? "app started without init argument" : "init argument: " + initArg) +
										'<div data-close="' + this.starter + '" style="color:red;text-decoration:underline;cursor:pointer">click to close the app</div>';
		dialog.addEventListener( "click", this.onClick, false );
		$.doc.body.appendChild( dialog );
		
		this.dialog = dialog;
	}

  }
	
});