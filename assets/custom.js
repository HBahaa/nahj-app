	console.log("ready")
$(function () {
	$('[data-toggle="sidebar"]').click(function(e) {
	  e.preventDefault();
	  $("#sidebar-wrapper").toggleClass("toggled");
	});
	$(".dropdown-menu a").click(function() {
	    $(this).closest(".dropdown-menu").prev().dropdown("toggle");
	});
})
