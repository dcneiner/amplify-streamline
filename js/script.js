(function ( $ ) {

amplify.request( "shots", { type: "popular" }, function ( data ) {
	if ( data && data.shots ) {
		$( "#shot-template" )
			.tmpl( data.shots )
			.appendTo( "#portfolio-shots" );
	} else {
		// Error handling needs to go here
	}
});


// Code for visual display

var li_cache, over = false;

$( "#portfolio-shots" )
	.delegate( "li", "mouseenter", function ( e ) {
		var $li = $( this ), speed;

		if ( li_cache === this && over ) {
			$.doTimeout( "hoverOut" );
			return;
		}

		if ( over ) {
			$.doTimeout( "hoverOut", true );
			speed = 0;
		} else {
			$.doTimeout( "hoverOut" );
			speed = 500;
		}

		$.doTimeout( "hoverIn", speed, function () {
			over = true;
			$li.find( "div" ).fadeTo( 200, 1.0 );
		});
	})
	.delegate( "li", "mouseleave", function ( e ) {
		var $li = $( this );

		$.doTimeout( "hoverIn" );
		$.doTimeout( "hoverOut", 500, function () {
			over = false;
			$li.find( "div" ).stop( true ).fadeOut();
		});
	});



}( jQuery ));

// 
// 
// { "date": "October 28, 2011" }
// 
// {
// 	status: "success",
// 	data: {
// 		"date": "October 28, 2011"
// 	}
// }
// 
// {
// 	status: "error",
// 	message: "Y U NO WORK"
// }
// 
// 
// 





