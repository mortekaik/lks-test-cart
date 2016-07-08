$(document).ready(function () {
	$('.deals').on('click', '.button', addToCart); // добавление товара в корзину по клику
	
	$('#cart').on('click', '#empty-cart', function() { // клик по пустой корзине
		return false;
	});

	$('#cart').on('click', '#cart-slot', function() { // переход в окно корзины
		moveToCart();
		$('body').addClass('lock');
		$('#overlay').css('display', 'block');
		$('#modal_cart').css('visibility', 'visible'); // показываем окно
		
		$('#modal_cart_close, .modal_cart_close_btn').click( function(){ // лoвим клик
			$('#modal_cart').css('visibility', 'hidden'); // скрываем окно
			$('#overlay').css('display', 'none');
			$('body').removeClass('lock');
		});
		return false;
	});

	/* функция добавления кол-ва товара и суммы в корзину */
	function addToCart() {
		// var productId = ($(btnDeals).attr('id')).split('_')[1];
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
				if (data !== '0') {
					$('#empty-cart').hide();
					$('#cart').append(data);
					console.log(data);
				}
			},
			error: function() {
				alert('Something wrong...');
			}
		});
	}
	
	/* функция для открытия корзины в отдельном окне */
	function moveToCart() {
		$.ajax({
			url: 'samplehtml.html',
			type: 'POST',
			success: function(data) {
				$(data).prependTo('#modal_cart');
			},
			error: function() {
				alert('something error...');
			}
		});
	}
});