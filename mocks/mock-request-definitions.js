(function () {

/********************************************************
 ** Please use one of these methods at a time
 ** Both are included for learning, but one should
 ** be commented while using the other definition.
 ********************************************************/


/********************************************************
 ** First method, using JS to generate a mock
 ********************************************************/


amplify.request.define( "shots", function ( settings ) {
	var i = 0, shots = [];
	
	for ( ; i < 6; i++ ) {
		shots.push({
			title: "My Title " + (i + 1),
			url: "#",
			image_teaser_url: "mocks/placeholder.jpg"
		});
	}
	
	settings.success( { shots: shots });
});


/********************************************************
 ** Second method, using mockJSON to generate a mock
 ********************************************************/

// And a custom PLACEHOLDER replacement
$.mockJSON.data.PLACEHOLDER = [
	"placeholder",
	"placeholder-2"
];

var mock_shots = {
	// Generate between 6 and 9 shots
	"shots|6-9": [
		{
			title: "@LOREM",
			url: "#",
			image_teaser_url: "mocks/@PLACEHOLDER.jpg"
		}
	]
};

amplify.request.define( "shots", function ( settings ) {
	// Run the template, and pass it to the success
	settings.success( $.mockJSON.generateFromTemplate( mock_shots ));
});

}());