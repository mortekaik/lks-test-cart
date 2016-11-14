$(document).ready(function() {
	
	/*---- PickMeUP - datepicker ----*/

	pickmeup.defaults.locales['ru'] = {
		days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	};

	var pickDateInput = document.getElementById('input_pickdate');
	var pickedDate = {};
	pickmeup(pickDateInput, {
		locale: 'ru',
		position: 'right',
		hide_on_select: true,
		default_date: false,
		mode: 'multiple',
		format: 'd-m-Y',
		separator: ';',
		change: pickDateInput.addEventListener('pickmeup-change', function (e) {
			pickedDate = e.detail.formatted_date;
			console.log(pickedDate);
			getDate(pickedDate);
		})
	});

	var pickDateId = document.getElementById('pickdate');
	pickmeup(pickDateId, {
		flat: true,
		mode: 'multiple',
		locale: 'ru',
		default_date: false,
		format: 'd-m-Y',
		separator: ';',
		change: pickDateId.addEventListener('pickmeup-change', function (e) {
			pickedDate = e.detail.formatted_date;
			console.log(pickedDate);
			getDate(pickedDate);
		})
	});

	function getDate($el) {
		$.ajax({
				type: 'POST',
				url: 'input.php',
				cache: false,
				data: {
					post: 'selected_date',
					selectedDate: $el
				},
				success: function (data) {
					if (data !== '') {
						console.log(data);
					}
				},
				error: function (error) {
					alert('Something wrong: ' + error.statusText);
					console.log(error);
				}
			});
	}

	$('.pickmeup_clear').click(function() {
		pickmeup('#pickdate').clear();
	});

	/*---- Air-datepicker ----*/

	$('#input_air_pickdate').datepicker({
		multipleDates: true,
		multipleDatesSeparator: '; ',
		todayButton: new Date(),
		clearButton: true
	});

	$('#air_pickdate').datepicker({
		multipleDates: true,
		// range: true,
		multipleDatesSeparator: '; ',
		todayButton: new Date(),
		clearButton: true
	});

}); // End of Ready Function
