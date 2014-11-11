
// ready, set, go
$(document).ready(function(){

	// init on all page
	// activate menu
	$('.toggle-menu').jPushMenu();

	/* hide head */
	$('header').ingestHead({
		className: 'stuck',
		top: 50
	});  
});