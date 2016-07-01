$(document).ready(function() {
	var count = $('#count').text();
	var sum = $('#sum').text();
	console.log(count, sum);
	if (sum < 1 || count < 1) {
		$('.item-count').fadeOut();
		$('.item-sum').fadeOut();
	}
	$('.button').on('click', function() {
		// var productId = ($(this).attr('id')).split('_')[1];
		var productId = ($(this).attr('id')).slice(8);
		console.log(productId);
		var productPrice = ($(this).prev('.price').text()).slice(0, -2);
		console.log(productPrice);
		$.ajax({
			url: 'samplehtml.html',
			type: 'POST',
			data: {
				productId: productId,
				productPrice: productPrice
			},
			success: function (data) {
				$('.empty-cart').html(data);
			},
			error: function() {
					alert('Something wrong...')
			}
		});
			// success: function (data) {
				// if (data) {
				// 	$('.empty-cart').fadeOut();
				// 	$('.item-count').fadeIn();
				// 	$('.item-sum').fadeIn();
				// }
			// },
			// error: function() {
			// 	alert("Something wrong ...");
			// }
		});
});