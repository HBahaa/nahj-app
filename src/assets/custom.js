	console.log("ready")
$(function () {
	$('[data-toggle="sidebar"]').click(function(e) {
	  e.preventDefault();
	  $("#sidebar-wrapper").toggleClass("toggled");
	});
})