$(document).ready(function () {
	// слайдер цены
	$('.price-slider').slider({
		range: true,
		min: 0,
		max: 1000,
		values: [100, 500],
		slide: function( event, ui ) {
			$('#price-from').html(ui.values[0]);
			$('#price-to').html(ui.values[1]);
		}
		});
	
	$('#price-from').change(function() {
		var valFrom = $(this).val();
		$('.price-slider').slider("values", 0, valFrom);
	});
	$('#price-to').change(function() {
		var valTo = $(this).val();
		$('.price-slider').slider("values", 1, valTo);
	});



	// конец слайдера цены
});