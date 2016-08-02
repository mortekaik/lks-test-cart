$(document).ready(function () {
	// слайдер цены
	$('.price-slider').slider({
		range: true,
		min: 0,
		max: 1000,
		values: [0, 1000],
		slide: function( event, ui ) {
			$('#price-from').val(ui.values[0]);
			$('#price-to').val(ui.values[1]);
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

	// выборка выделенных чекбоксов
	$('.producer-list').on('change', 'input[type=checkbox]', function() {
		var $this = $(this);
		var $checkbox = $('input[name=producer]');
		
	});
});

