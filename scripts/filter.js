$(document).ready(function () {
	/* ------------ слайдер цены ----- */
	$('.price-slider').slider({
		range: true,
		min: 0,
		max: 1000,
		values: [100, 500],
		slide: function( event, ui ) {
			$('#price-from').val(ui.values[0]);
			$('#price-to').val(ui.values[1]);
		}
	});
	
	$('#price-from').val($(".price-slider").slider('values', 0));
	$('#price-to').val($(".price-slider").slider('values', 1));
	
	// Изменение местоположения ползунка при вводе данных в первый элемент input
	$("input#price-from").change(function() {
	  	var value1 = $('input#price-from').val();
	  	var value2=$("input#price-to").val();
	  	if (parseInt(value1) > parseInt(value2)) {
	  		value1 = value2;
	  		$("input#price-from").val(value1);
	  	}
	  	$(".price-slider").slider("values", 0, value1);
	});
		      
	// Изменение местоположения ползунка при вводе данных в второй элемент input 	
	$("input#price-to").change(function(){
		var value1=$("input#price-from").val();
		var value2=$("input#price-to").val();
		if (parseInt(value1) > parseInt(value2)) {
	  		value2 = value1;
	  		$("input#price-to").val(value2);
	  	}
		$(".price-slider").slider("values", 1, value2);
	});

	// фильтрация ввода в поля
	$('#price-from, #price-to').keypress(function(event) {
		var key, keyChar;
		if (!event) 
			var event = window.event;
		if (event.keyCode) 
			key = event.keyCode;
		else if(event.which) 
			key = event.which;
		if(key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39 ) 
			return true;
		keyChar=String.fromCharCode(key);
		if(!/\d/.test(keyChar))	
			return false;
	}); 
	/*------------ конец слайдера цены ------------------*/

	/*------------ jquery UI Autocomplete ---------------*/
	$('#search-type').autocomplete ({
		source: function(req, response) {
			var $searchUrl = $('#searchForm').attr('action');
			var $term = req.term;
			$.ajax({
				type: 'POST',
				url: $searchUrl,
				dataType: 'json',
				cache: false,
				data: {
					post: 'search',
					searchField: $term
				},
				success: function(data) {
					response(data);
				}
			});
		},
		minLength: 1,
		select: function(event, ui) {
			log( ui.item ? "Selected: " + ui.item.value : "Nothing selected, input was " + this.value );
		}
	});
	function log(message) {
		$('#log-search').empty().prepend(message);
	}
	/*----------- end of jqueryUI autocomplete ----------*/

	/*---------- выбор по чекбоксам в фильтре ------------*/
	var $checkIdArr = [], $checkValArr = [];
	$('.filterForm').on('change', 'input:checkbox', function() {
		$checkIdArr = $('input:checkbox:checked').map(function() {
			var checkboxId = $(this).attr('id');
			var $checkFilterId = checkboxId.slice(checkboxId.indexOf('_') + 1);
			return $checkFilterId;
		}).get();
		$checkValArr = $('input:checkbox:checked').map(function() {
			var $checkboxVal = $(this).val();
			return $checkboxVal;
		}).get();

		console.log($checkIdArr);
		console.log($checkValArr);
		var $checkUrl = $(this).closest('form').attr('action');
		$.ajax({
			type: 'POST',
			url: $checkUrl,
			dataType: 'json',
			data: {
				post: 'check_filter',
				checkboxValue: $checkValArr,
				checkboxId: $checkIdArr
			},
			success: function (data) {
            	if (data !== '') {
                	console.log(data);
                	// getResultFilter(data);
            	}
        	},
            error: function (error) {
                alert('Something wrong: ' + error.statusText);
                console.log(error);
        	}
		});
	});
	/*---------- конец выбора по чекбоксам в фильтре ------------*/
});

