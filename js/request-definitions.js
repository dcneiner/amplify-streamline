( function () {

/********************************************************
 ** Please use one of these definitions at a time
 ** Both are included for learning, but one should
 ** be commented while using the other definition.
 ********************************************************/

amplify.publish( "camera.added", { camera: 1 } );

amplify.subscribe( "camera.added", 3, function ( camera ) {
	
	return false;
});




/********************************************************
 ** Dribble API Request
 ********************************************************/

amplify.request.define( "shots", "ajax", {
	url: "http://api.dribbble.com/shots/{type}",
	dataType: "jsonp",

	// Data will be merged with what you pass
	// in on a request.
	data: {
		type: "popular",
		per_page: 6
	}
});


/********************************************************
 ** Forrst API Request with a custom decoder
 ********************************************************/

amplify.request.define( "shots", "ajax", {
	url: "https://forrst.com/api/v2/posts/list",
	dataType: "jsonp",
	data: {
		post_type: "snap"
	},
	
	// Read more about the decoder online:
	// http://amplifyjs.com/api/request/#custom_decoders
	decoder: function ( data, status, xhr, success, error ) {
		if ( data && data.resp ) {
			var shots = [];
			$.each( data.resp.posts, function ( i, post ) {
				
				// Map the API to what I was using
				// with Dribbble
				shots.push({
					title: post.title,
					url: post.post_url,
					image_teaser_url: post.snaps.keith_url
				});
				
				if ( i === 5 ) {
					return false;
				}
			});
			
			success( { shots: shots } );
		} else {
			error( "Y U NO WORK?" );
		}
	}
});

}());