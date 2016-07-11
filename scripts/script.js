$(document).ready(function () { 
	$('.deals').on('click', '.button', function() { // добавление товара в корзину по клику
		//var productId = ($(this).attr('id')).split('_')[1];
		var productId = ($(this).attr('id')).slice(8);
		console.log(productId);
		var productPrice = ($(this).prev('.price').text()).slice(0, -2);
		console.log(productPrice);
		addToCart();
		$('body').addClass('lock'); // лочим скролл
		$('#overlay').css('display', 'block'); // показываем подложку
		$('#modal_cart').css('visibility', 'visible'); // показываем окно
		
		$('#modal_cart_close, .modal_cart_close_btn, #overlay').click( function(){ // лoвим клик
			$('#modal_cart').css('visibility', 'hidden'); // скрываем окно
			$('#overlay').css('display', 'none'); // скрываем подложку
			$('body').removeClass('lock'); // возвращаем скролл
		});
	});
	
	$('#cart').on('click', '#empty-cart', function(e) { // клик по пустой корзине
		e.preventDefault();
	});

	$('#cart').on('click', '#cart-slot', function(e) { // переход в окно корзины
		e.preventDefault(); // отменяем переход по ссылке
		$('body').addClass('lock'); // лочим скролл
		$('#overlay').css('display', 'block'); // показываем подложку
		$('#modal_cart').css('visibility', 'visible'); // показываем окно
	});

	/* функция добавления кол-ва товара и суммы в корзину */
	function addToCart() {
		$.ajax({
			url: 'samplehtml.html',
			type: 'POST',
			success: function (data) {
				if (data !== '0') {
					$('#empty-cart').hide();
					$('#cart').append(data);
					$(data).prependTo('#modal_cart');
					console.log(data);
				}
			},
			error: function() {
				alert('Something wrong...');
			}
		});
	}
});