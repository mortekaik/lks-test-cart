$(document).ready(function() {

	$.datetimepicker.setLocale('ru');
	$('#pickdate').datetimepicker({
		timepicker: false,
		defaultDate:new Date(),
		format: 'd.m.Y',
		dateFormat: 'd/m/Y',
		inline: true,
		onSelectDate:function(ct, $i) {
			alert(ct.dateFormat('d/m/Y'))
		}
	});


}); // End of Ready Function