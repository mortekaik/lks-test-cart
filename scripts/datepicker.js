$(document).ready(function() {
	
	/*---- PickMeUP - datepicker ----*/

	pickmeup.defaults.locales['ru'] = {
		days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	};

	pickmeup('#input_pickdate', {
		position: 'right',
		hide_on_select: true
	});
	

	pickmeup('#pickdate', {
		flat: true,
		mode: 'multiple',
		locale: 'ru'
	});

	/*---- Air-datepicker ----*/

	$('#air_pickdate').datepicker({
		multipleDates: true,
		// range: true,
		// multipleDatesSeparator: ','
		todayButton: new Date(),
		clearButton: true
	});

}); // End of Ready Function
