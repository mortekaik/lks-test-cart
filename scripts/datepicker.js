$(document).ready(function() {

	function sendDate($el) {
		$.ajax({
				type: 'POST',
				url: 'input.php',
				cache: false,
				dataType: 'json',
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

	/*---- Air-datepicker ----*/

	var airPickdateInput = $('#input_air_pickdate');
	var airPickdateId = $('#air_pickdate');
	var airPickedDate;

	$(airPickdateInput).datepicker({
		multipleDates: true,
		multipleDatesSeparator: '; ',
		todayButton: new Date(),
		clearButton: true,
		// position: 'top left',
		onSelect: function(formattedDate, date, el) {
			airPickedDate = formattedDate.split(';/\n');
			console.log(airPickedDate);
			sendDate(airPickedDate);
		}
	});

	$(airPickdateId).datepicker({
		multipleDates: 3,
		multipleDatesSeparator: '; ',
		todayButton: new Date(),
		clearButton: true,
		dateFormat: 'dd-mm-yyyy',
		// altField: $('#input_alt_pickdate'),
		// altFieldDateFormat: 'dd/mm/yyyy',
		onSelect: function(formattedDate, date, el) {
			airPickedDate = formattedDate.split(';/\n');
			console.log(airPickedDate);
			sendDate(airPickedDate);
		}
	});

}); // End of Ready Function
