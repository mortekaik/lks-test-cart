$(document).ready(function () {
    var h_hght = 120; // высота шапки
    var h_mrg = 0; // отступ когда шапка уже не видна

    $(window).scroll(function () { // скроллинг горизонтального меню
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

    $("a[href='#top-link']").click(function () { // ссылка возврата на верх страницы
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
// конец функции для ссылки возврата на верх страницы

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

    $('.deals').on('click', '.button', function (e) { // добавляем товар в корзину
        e.preventDefault();
        alert('zxczc');
        $(this).fadeOut().fadeIn().toggleClass('button btn-added').text('To Cart');
        var idOfBtn = $(this).attr('id');
        console.log(idOfBtn);
        var productId = idOfBtn.slice(idOfBtn.indexOf('_') + 1);
        console.log(productId);
        var send_data = array('post':'add_cart','productid':productId, 'num':1);
        cart_processor(send_data);

        $('#overlay').css('display', 'block'); // показываем подложку
        $('#modal_cart').css('visibility', 'visible'); // показываем окно

        $('#modal_cart_close, .close_btn, #overlay').click(function () { // лoвим клик
            $('#modal_cart').css('visibility', 'hidden'); // скрываем окно
            $('#overlay').css('display', 'none'); // скрываем подложку
        });
    }); // конец добавления товара в корзину

    function cart_allocator(response) { // функция, которая распределяет ответ сервера на страницу
        $('.page-cart_empty').hide();
        if ($('#cart .image-cart').next().length > 0) $('.page-cart').remove();
        $(response.pageCart).appendTo('#cart');
        if ($('#modal_cart #modal_cart_close').siblings('ul').length > 0) $('ul.cart-list').remove();
        $('#modal_cart').prepend(response.cart);
    }

    function cart_processor(array) {
        $.ajax({
            type: 'POST',
            url: 'input.php',
            cache: false,
            dataType: 'json',
            data: $.extend({}, array),
            success: function (data) {
                if (data !== '') {
                    console.log(data);
                    cart_allocator(data);
                }
            },
            error: function (error) {
                alert('Something wrong: ' + error.statusText);
                console.log(error);
            }
        });
    }
});


//$('#modal_cart ul.cart-list li.cart-list-item').each(function () {
//    var itemVal = $(this).find('.spin-input').val();
//    console.log(itemVal);
//    var itemId = $(this).find('a').data('id');
//    console.log(itemId);
//    $(this).on('click', '.spin-up', function (event) {
//        event.preventDefault();
//        $.ajax({
//            type: 'POST',
//            url: 'input.php',
//            cache: false,
//            dataType: 'json',
//            data: {
//                post: 'product_Up',
//                productid: itemId,
//                count: itemVal
//            },
//            success: function (up_data) {
//                console.log(up_data);
//            },
//            error: function (error) {
//                alert('Something wrong: ' + error.statusText);
//                console.log(error);
//            }
//        });
//    });
//    $(this).on('click', '.spin-down', function (event) {
//        event.preventDefault();
//        $.ajax({
//            type: 'POST',
//            url: 'input.php',
//            cache: false,
//            dataType: 'json',
//            data: {
//                post: 'product_Down',
//                productid: itemId,
//                count: itemVal
//            },
//            success: function (down_data) {
//                console.log(down_data);
//            },
//            error: function (error) {
//                alert('Something wrong: ' + error.statusText);
//                console.log(error);
//            }
//        });
//    });
//});
// end of getAnswer


//$('#cart').on('click', '.page-cart', function (e) { // переход в окно корзины
//    e.preventDefault(); // отменяем переход по ссылке
//    $('#overlay').css('display', 'block'); // показываем подложку
//    $('#modal_cart').css('visibility', 'visible'); // показываем окно
//});
//
//$('.deals').on('click', '.btn-added', function (e) { // переход в окно корзины
//    e.preventDefault(); // отменяем переход по ссылке
//    $('#overlay').css('display', 'block'); // показываем подложку
//    $('#modal_cart').css('visibility', 'visible'); // показываем окно
//});
//
//$('#modal_cart').on('click', '.delete_all_btn', function () { // удаляем все товары из корзины и из корзины, которая на странице
//    var $modalCartItem = $('#modal_cart ul.cart-list li.cart-list-item');
//    var arrItemsId = $modalCartItem.map(function (index, elem) {
//        return $(elem).find('a').data('id');
//    }).get();
//    $.ajax({
//        type: 'POST',
//        url: 'input.php',
//        cache: false,
//        dataType: 'json',
//        data: {
//            post: 'del_cart_all',
//            productid: arrItemsId
//        },
//        success: function (o) {
//            console.log(o);
//            $('.page-cart').replaceAll(o.pageCart);
//            $('.cart-list').replaceWith('<span>Корзина очищена</span>');
//        },
//        error: function (error) {
//            alert('Something wrong: ' + error.statusText);
//            console.log(error);
//        }
//    });
//});
//})
//; // end of ready function