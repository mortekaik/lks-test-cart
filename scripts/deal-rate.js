$(document).ready(function () {
	
	// function sendDate($el) {
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: 'input.php',
	// 		cache: false,
	// 		dataType: 'json',
	// 		data: {
	// 			post: 'selected_date',
	// 			selectedDate: $el
	// 		},
	// 		success: function (data) {
	// 			if (data !== '') {
	// 				console.log(data);
	// 			}
	// 		},
	// 		error: function (error) {
	// 			alert('Something wrong: ' + error.statusText);
	// 			console.log(error);
	// 		}
	// 	});
	// }

	$('.deal-rate > div').each(function(index, el) {
		var ratingStars = $(this).data('rating');
		console.log(ratingStars);
		$(this).next('.counter').text('(' + ratingStars + ')');

		$(this).rateYo({
			rating: ratingStars,
			numStars: 5,
			minValue: 1,
			maxValue: 5,
			fullStar: true,
			// precision: 1,
			starWidth: "15px",
			spacing: "3px",
			ratedFill: '#f1c40f',
			onInit: function() {
				console.log("On Init");
			},
			onSet: function(rating) {
				console.log("On Set to: " + rating);
				$(this).next().text('(' + rating + ')');
			},
			onChange: function(rating) {
				$(this).next().text('(' + rating + ')');
			}
		}).on("rateyo.set", function() {
			console.log("rateyo.set");
		});
	});
}); // End if Ready Function