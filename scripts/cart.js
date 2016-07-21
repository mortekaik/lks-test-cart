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
    
    // function checkInCart() {
    //     var $modalCart = $('#modal_cart');
    //     if ($modalCart.has('ul.cart-list')) {
    //         var cartListItem = $('.cart-list .cart-list-item').data('id');
    //         console.log(cartListItem);
    //         var dealsBtn = $('.deals .button');
    //         var btnProductId = dealsBtn.slice(dealsBtn.indexOf('_')+1);
    //         console.log(btnProductId);
    //         // $dealsBtn.each(function(){
    //         //     // if () {}
    //         // });
    //     }
    // }
    // checkInCart();

    $('.deals').on('click', '.button', function(e) { // добавляем товар в корзину
        e.preventDefault();
        $(this).fadeOut().fadeIn().toggleClass('button btn-added').text('To Cart');
        var idOfBtn = $(this).attr('id');
            console.log(idOfBtn);
        var productId = idOfBtn.slice(idOfBtn.indexOf('_')+1);
            console.log(productId);
        $.ajax({ 
            type: 'POST',
            url: '/input.php',
            cache: false,
            dataType: 'json',
            data: {
                post: 'add_cart',
                productid: productId,
                num: 1
            },
            success: function(data) {
                if (data !== '') {
                    console.log(data);
                    getAnswer(data);
                }
            },
            error: function(error) {
                alert('Something wrong: ' + error.statusText);
                console.log(error);
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
        var $pageCart = $(response.pageCart);
            if ($('#cart .image-cart').next().length > 0) { 
                $('.page-cart').remove();
                $($pageCart).appendTo('#cart');
            } else { 
                $($pageCart).appendTo('#cart');
                //$('.page-cart_empty').show();
            }
        var $itemModalCart = $(response.cart);
        if ($('#modal_cart #modal_cart_close').siblings('ul').length > 0) {
            $('ul.cart-list').remove();
             $('#modal_cart').prepend($itemModalCart);
        } else {
            $('#modal_cart').prepend($itemModalCart);
        }

        var $cart = $('#cart ul.cart-list li.cart-list-item');
        console.log($cart);
        $($cart).each(function(){
            console.log($(this));
            var $spinWrap = $(this).children('.spinner-wrap');
            console.log($spinWrap);
            var $spinInput = $($spinWrap).children('.spin-input').val();
                console.log($spinInput);
            $($spinWrap).on('click', 'a.spin-down', function() {
                if (typeof $spinInput === 'number') {
                    $spinInput.val(parseInt($spinInput.val())--, 0);
                }
                return false;
            });
            $($spinWrap).on('click', 'a.spin-up', function() {
                if (typeof $spinInput === 'number') {
                    $spinInput.val(parseInt($spinInput.val())++);
                    console.log($spinInput);
                }
                return false;
            });
        });
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