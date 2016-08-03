$(document).ready(function () {
	// слайдер цены
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
	// конец слайдера цены

	// jquery UI Autocomplete
	$('#search-type').autocomplete ({
		source: function(request, response) {
			var $search = $('#search-type').val();
			console.log($search);
			$.ajax({
				url: 'input.php',
				type: 'POST',
				dataType: 'json',
				cache: false,
				data: {
					post: 'search',
					searchField: $search
				},
				success: function(data) {
					console.log(data);
				}
			});
		},
		minLength: 3,
		// appendTo: ,
		// disabled: true,
		// delay: 300,
		select: function(event, ui) {
			// alert('Event: ' + event.type + '\nValue: ' + ui.item.value);
			$('<p/>').text(ui.item ? ui.item.value : 'Nothing is selected').prependTo('#log');
			$('#log').attr('scrollTop, 0');
		}
	});
	

	// $('#searchForm').on('click', '#search', function() {
	// 	$('#search-type').autocomplete('search');
	// });
	// $('#searchForm').on('click', '#close', function() {
	// 	$('search-type').autocomplete('close');
	// });


});

