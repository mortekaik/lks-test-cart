$(document).ready(function () {
	var h_hght = 120; // высота шапки
    var h_mrg = 0; // отступ когда шапка уже не видна

    $(window).scroll(function() {
            var top = $(this).scrollTop();
            var elem = $('#top_nav');
            if (top + h_mrg < h_hght) {
                elem.css('top', (h_hght - top));
                $("#top-link").css("display", "none");
            } else {
                elem.css('top', h_mrg);
                $("#top-link").css("display", "block");
            }
        });

    $("a[href='#top-link']").click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });

	$('.deals').on('click', '.button', function() { // добавление товара в корзину по клику
		$(this).fadeOut().fadeIn().toggleClass('button btn-added').text('To Cart');
		//var productId = ($(this).attr('id')).split('_')[1];
		var productId = ($(this).attr('id')).slice(8);
		console.log(productId);
		var productPrice = ($(this).prev('.price').text()).slice(0, -2);
		console.log(productPrice);
		addToCart();
		$('#overlay').css('display', 'block'); // показываем подложку
		$('#modal_cart').css('visibility', 'visible'); // показываем окно
		
		$('#modal_cart_close, .modal_cart_close_btn, #overlay').click( function(){ // лoвим клик
			$('#modal_cart').css('visibility', 'hidden'); // скрываем окно
			$('#overlay').css('display', 'none'); // скрываем подложку
		});
	});
	
	$('#cart').on('click', '#empty-cart', function(e) { // клик по пустой корзине
		e.preventDefault(); // отменяем переход по ссылке
	});

	$('#cart').on('click', '#cart-slot', function(e) { // переход в окно корзины
		e.preventDefault(); // отменяем переход по ссылке
		$('#overlay').css('display', 'block'); // показываем подложку
		$('#modal_cart').css('visibility', 'visible'); // показываем окно
	});

	$('.deals').on('click', '.btn-added', function(e) { // переход в окно корзины
		e.preventDefault(); // отменяем переход по ссылке
		$('#overlay').css('display', 'block'); // показываем подложку
		$('#modal_cart').css('visibility', 'visible'); // показываем окно
	});
	$('#modal_cart').on('click', '.delete-item', function() { // удаляем товар из корзины и из корзины, которая на странице
		deleteFromCart();
		$(this).hide(); // скрываем кнопку удаления товара
		$('.deals span[id^=product_]').each(function() { // возвращаем кнопку в первоначальное состояние
			if ($(this).hasClass('btn-added')) {
				return $(this).toggleClass('btn-added button').empty();
			}
		});
	});

	/* функция добавления кол-ва товара и суммы в корзину */
	function addToCart() {
		$.ajax({
			url: 'answer.html',
			type: 'POST',
			dataType: 'html',
			success: function (data) {
				if (data !== '0') {
					$('#empty-cart').hide();
					$('#cart').append(data);
					$(data).each(function() {
						var answer = ($(this)).split('___');
					});
					$('<span>' + data + '<\/span>').prependTo('#modal_cart');
					console.log(data);
					console.log(answer);
				}
			},
			error: function() {
				alert('Something wrong...');
			}
		});
	}

	function deleteFromCart() {
		$('#cart-slot, #cart .delete-item').remove();
		$('#empty-cart').show();
	}
});