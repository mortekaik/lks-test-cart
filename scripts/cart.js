$(document).ready(function () {

    function modal(data) {
        if (data == 'open') {
            $('#overlay').css('display', 'block'); // показываем подложку
            $('#modal_cart').css('visibility', 'visible'); // показываем окно
        }
        if (data == 'close') {
            $('#modal_cart').css('visibility', 'hidden'); // скрываем окно
            $('#overlay').css('display', 'none'); // скрываем подложку
        }
    }

    function cart_processor(data) {
        $.ajax({
            type: 'POST',
            url: 'input.php',
            cache: false,
            dataType: 'json',
            data: $obj = $.extend({}, data),
            success: function (data) {
                if (data !== '') {
                    cart_allocator(data);
                }
            },
            error: function (error) {
                alert('Something wrong: ' + error.statusText);
                console.log(error);
            }
        });
    }

    function cart_allocator(response) { // функция, которая распределяет ответ сервера на страницу
        $('.news').empty().prepend(response.cart);
        $('#cart').empty().prepend(response.pageCart);
        $('#modal_cart').empty().prepend(response.last);
    }

    $('.deals').on('click', '.button', function () { // добавляем товар в корзину
        $(this).toggleClass('button btn-added');
        var idOfBtn = $(this).attr('id');
        var productId = idOfBtn.slice(idOfBtn.indexOf('_') + 1);
        cart_processor({'post': 'add_cart', 'productid': productId, 'num': 1});
        modal('open');
    })

    $('#modal_cart').on('click', '.spin-down', function (e) { // - 1 к количеству товара в модальном окне
        e.preventDefault();
        var productId = $('#spin-id').text();
        cart_processor({'post': 'product_down', 'productid': productId});
    });

    $('#modal_cart').on('click', '.spin-up', function (e) { // + 1 к количеству товара в модальном окне
        e.preventDefault();
        var productId = $('#spin-id').text();
        cart_processor({'post': 'product_up', 'productid': productId});
    });

    $('.news').on('click', '.spin-down', function (e) { // - 1 к количеству товара
        e.preventDefault();
        var prodId = $(this).parent().parent().find('#page-cart-spin').text();
        cart_processor({'post': 'product_down', 'productid': prodId});
    });

    $('.news').on('click', '.spin-up', function (e) { // + 1 к количеству товара
        e.preventDefault();
        var prodId = $(this).parent().parent().find('#page-cart-spin').text();
        cart_processor({'post': 'product_up', 'productid': prodId});
    });
    $('.news').on('click', 'li.cart-list-item a', function(e) {
        e.preventDefault();
        modal('open');
    });

    $('body').on('click', '.delete_all_btn', function () { // удаляем все товары из корзины и из корзины, которая на странице
        var $btnAdded = $('.deals > .product').find('span.btn-added');
        $btnAdded.toggleClass('btn-added button');
        modal('close');
        cart_processor({'post': 'del_cart_all'});
    });

    $('body').on('click', '#modal_cart_close, .close_btn, #overlay', function() {
        modal('close');
    });
}); // end of ready function