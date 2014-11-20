(function(){

	// ready, set, go
	$(document).ready(function(){

		// init on all page
		// activate menu
		$('.toggle-menu').jPushMenu();

		// hide head
		$('header').ingestHead({
			className: 'stuck',
			top: 50
		});

		// on about page
		if ($(".aboutus").length > 0){
		  
		  // attach event
		  $("#video-open-button").click(function(){ video.open(); });

		  // attach event
		  $("#video-close-button").click(function(){ video.close(); });
		}
	});

	// video functionality
	var video = new function(){

		// open video
		this.open = function(){
			$("#intro-heading").hide();
			$("#intro-text").hide();
			$("#intro-video").show();
		};

		// close video
		this.close = function() {
			$("#intro-video").hide();
			$("#intro-heading").show();
			$("#intro-text").show();
		};
	};
}());

