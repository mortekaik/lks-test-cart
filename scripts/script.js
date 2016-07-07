$(document).ready(function () {
	var btnDeals = $('.button');

	$(btnDeals).on('click', addToCart); // добавление товара в корзину по клику
	$('#cart-slot').on('click', moveToCart);

	/* функция добавления кол-ва товара и суммы в корзину */
	function addToCart(btnDeals) {
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
				if (data == '0') {
					$('#cart-slot').html('Пусто');
				} else {
					$('#cart-slot').html(data);
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
				if (data !== 0) {
					$('#modal_cart').append(data);
					loadCart();
				}	
			},
			error: function() {
				alert('something error...');
			}
		});
	}

	function loadCart() { // переход в окно корзины
		$('body').addClass('lock'); // лочим скролл у body
		$('#overlay').fadeIn(400, // пoкaзывaем пoдлoжку 
		 	function(){ // пoсле выпoлнения предыдущей aнимaции
				$('#modal_cart') 
					.css('display', 'block') // показываем окно
					.animate({opacity: 1, top: '50%'}, 200); // прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		});
	};
	/* Зaкрытие мoдaльнoгo oкнa, тo же сaмoе в oбрaтнoм пoрядке */
	$('#modal_cart_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('#modal_cart')
			.animate({opacity: 0, top: '45%'}, 200,  // меняем прoзрaчнoсть нa 0 и двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // скрываем окно;
					$('#overlay').fadeOut(400); // скрывaем пoдлoжку
				}
			);
		$('body').removeClass('lock'); // разлочим скроллы у body
	});
});