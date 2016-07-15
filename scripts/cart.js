$(document).ready(function() {
	var h_hght = 120; // высота шапки
    var h_mrg = 0; // отступ когда шапка уже не видна

    $(window).scroll(function() { // скроллинг горизонтального меню
            var top = $(this).scrollTop();
            var elem = $('#top_nav');
            if (top + h_mrg < h_hght) {
                elem.css('top', (h_hght - top));
                $("#top-link").css("display", "none");
            } else {
                elem.css('top', h_mrg);
                $("#top-link").css("display", "block");
            }
        }); // конец скроллинга горизонтального меню

    $("a[href='#top-link']").click(function() { // ссылка возврата на верх страницы
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        }); // конец функции для ссылки возврата на верх страницы
    
    $('.deals').on('click', '.button', function(e) { // добавляем товар в корзину
        e.preventDefault();
        $(this).fadeOut().fadeIn().toggleClass('button btn-added').text('To Cart');
        var idOfBtn = $(this).attr('id');
            console.log(idOfBtn);
        var productId = idOfBtn.slice(idOfBtn.indexOf('_')+1);
            console.log(productId);
        $.ajax({ 
            type: 'POST',
            url: '../input.php',
            data: {
                post: 'add_cart',
                productid: productId,
                num: 1
            },
            dataType: 'json',
            success: function(data) {
                if (!!data) {
                    getAnswer(data);
                }
            },
            error: function() {
                alert('Something wrong ...');
            }
        });  // конец ajax-запроса

        $('#overlay').css('display', 'block'); // показываем подложку
        $('#modal_cart').css('visibility', 'visible'); // показываем окно
        
        $('#modal_cart_close, .modal_cart_close_btn, #overlay').click( function(){ // лoвим клик
            $('#modal_cart').css('visibility', 'hidden'); // скрываем окно
            $('#overlay').css('display', 'none'); // скрываем подложку
        });
    }); // конец добавления товара в корзину

    function getAnswer(response) { // функция, которая распределяет ответ сервера на страницу
        $('.page-cart_empty').hide();
        $(response.pageCart).appendTo('#cart');
        $('#modal_cart').prepend(response.cart);
    } // end of getAnswer

    $('#cart').on('click', '.page-cart', function(e) { // переход в окно корзины
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

    function deleteFromCart() {
        $('.page-cart, #cart .delete-item').remove();
        $('.page-cart_empty').show();
    }

}); // end of ready function