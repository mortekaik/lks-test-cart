$(document).ready(function () {
	/* ------------ слайдер цены ----- */
	var $filterUrl = $('#filter-box').attr('action');
	
	$checkIdArr = $('#filter-box input:checkbox:checked').map(function() {
		var checkboxId = $(this).attr('id');
		var $checkFilterId = checkboxId.slice(checkboxId.indexOf('_') + 1);
		return $checkFilterId;
	}).get();
	$checkValArr = $('#filter-box input:checkbox:checked').map(function() {
		var $checkboxVal = $(this).val();
		return $checkboxVal;
	}).get();

	$('.price-slider').slider({
		range: true,
		min: 0,
		max: 1000,
		values: [100, 500],
		slide: function(event, ui) {
			$('#price-from').val(ui.values[0]);
			$('#price-to').val(ui.values[1]);
		},
		stop: function() {
			var $minPrice = $('#price-from').val();
			console.log($minPrice);
			var $maxPrice = $('#price-to').val();
			console.log($maxPrice);
			
			console.log($checkIdArr);
			console.log($checkValArr);

			$.ajax({
				type: 'POST',
				url: $filterUrl,
				dataType: 'json',
				cache: false,
				data: {
					post: 'slider_price',
					checkboxValue: $checkValArr,
					checkboxId: $checkIdArr,
					min_price: $minPrice,
					max_price: $maxPrice
				},
				success: function(data) {
					console.log(data);
				}
			});
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
	  	console.log(value1 + ', ' + value2);

	  	console.log($checkIdArr);
		console.log($checkValArr);

	  	$.ajax({
	        type: 'POST',
	        url: $filterUrl,
	        dataType: 'json',
	        data: {
	        	post: 'input-minPrice',
	        	checkboxValue: $checkValArr,
				checkboxId: $checkIdArr,
	        	min_price: value1,
	        	max_price: value2
	        },
	        cache: false,
	        success: function(data){
	            console.log(data);
	        }
	    });
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
	  	console.log(value1 + ', ' + value2);

	  	console.log($checkIdArr);
			console.log($checkValArr);

	  	$.ajax({
	        type: 'POST',
	        url: $filterUrl,
	        dataType: 'json',
	        data: {
	        	post: 'input-maxPrice',
						checkboxValue: $checkValArr,
						checkboxId: $checkIdArr,
						min_price: value1,
						max_price: value2
	        },
	        cache: false,
	        success: function(data){
	            console.log(data);
	        }
	    });
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
		if(key === null || key === 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39 ) 
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
				beforeSend: function (data) {
					$('#loading_box').show();
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
	// var $checkUrl = $("form input:checkbox").closest('form').attr('action');
	
	$('.filter-block').on('change', 'input:checkbox', function() {
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

		var $minPrice = $('#price-from').val();
		console.log($minPrice);
		var $maxPrice = $('#price-to').val();
		console.log($maxPrice);

		$.ajax({
			type: 'POST',
			url: $filterUrl,
			dataType: 'json',
			data: {
				post: 'check_filter',
				checkboxValue: $checkValArr,
				checkboxId: $checkIdArr,
				min_price: $minPrice,
				max_price: $maxPrice
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

	/*---------- разворачивание пунктов меню категорий в фильтре ------------*/ 
		//var $fltrBlock = $(".filter-block");
		// $('.filter-block h3').next().hide();
		$('.filter-aside').on('click', '.filter-block .fltr-heading', function() {
			$(this).next().slideToggle();
			$(this).toggleClass('collapsed');
		});

	/*---------- End of разворачивание пунктов меню категорий в фильтре ------------*/

	/*---------- отображение всех позиций в каждом пункте меню категорий в фильтре ------------*/
	$('.filter-block ul > li a').each(function(i, elem) {
		var $listItemValue = $(this).attr('class');
		var $listId = $listItemValue.slice($listItemValue.indexOf('_') + 1);
		if ($(this).hasClass('show-all_' + $listId)) {
			$(this).on('click', function(e) { 
				e.preventDefault();	
				showAllValues($listId);
			});
		}
	});
	function showAllValues(id) {
        $('.fltr-' + id + ' li.hidden').slideToggle(300).toggleClass('inv');
        $('.show-all_' + id).text(function (i, text) {
            return $.trim(text) == "Показать все" ? "Свернуть" : "Показать все";
        });
    }
    /*---------- end of отображение всех позиций в каждом пункте меню категорий в фильтре ------------*/

    /*---------- Подсказка к категориям фильтра ------------*/

	$('.filter-aside').on('click', '.filter-block .info-tooltip_icon', function(event) {
		
		if ( !$(this).is('.active') ) {
			$('.info-tooltip_icon').removeClass('active');
			$('.info-tooltip_content').fadeOut(600);
		}

		var $this 				= $(this),
			$content 			= $this.next('.info-tooltip_content'),
			tooltipWidth 		= $content.outerWidth(true),
			tooltipHeight 		= $content.outerHeight(true),
			topCoord 			= $this.offset().top,
			leftCoord 			= $this.offset().left;

		if ( topCoord + tooltipHeight + 100 >= $(document).height() ) {
			$content.addClass('bottom');
		}
		if ( leftCoord - tooltipWidth <= 50 ) {
			$content.addClass('left');
		}

		if ( $this.is('.active') ) {
			$this.toggleClass('active');
			$content.fadeToggle(600);
			// return;
		} else {
			$this.addClass('active');
			$content.fadeToggle(600);
		}

		// if ( !$(this).is('.mouseenter') ) {
		// 	$this.toggleClass('active');
		// 	$content.fadeToggle();
		// } else {
		// 	$this.addClass('active');
		// 	$content.show();
		// }
		event.stopPropagation();
	});

	$('.filter-aside').on('click', '.info-tooltip_content', function () {
		return false;
	});
	// $('.filter-aside').on('mouseenter', '.filter-block .info-tooltip', function() {
	// 	if ( $('.info-tooltip_icon', this).is('.active') ) return;
	// 	$('.info-tooltip_icon').removeClass('active');
	// 	$('.info-tooltip_content').fadeOut();
	// 	$('.info-tooltip_icon', this).addClass('mouseenter');
	// 	$('.info-tooltip_content', this).stop(true, true).fadeIn();
	// }).on('mouseleave', '.filter-block .info-tooltip', function() {
	// 	if ( $('.info-tooltip_icon', this).is('.active') ) return;
	// 	$('.info-tooltip_icon', this).removeClass('mouseenter');
	// 	$('.info-tooltip_content', this).stop(true, true).fadeOut();
	// });

	$(document).click(function(event) {
		if ( $(event.target).closest('.info-tooltip').length ) return;
		$('.info-tooltip_icon').removeClass('active');
		$('.info-tooltip_content').fadeOut();
		event.stopPropagation();
	});

    /*---------- end of подсказки к категориям фильтра ------------*/
}); // End of ready function

