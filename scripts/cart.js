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
        var idOfBtn = $(this).attr('id');
            console.log(idOfBtn);
        var productId = idOfBtn.slice(idOfBtn.indexOf('_')+1);
            console.log(productId);
        var answer = $.ajax({ 
            type: 'POST',
            url: 'answer.html',
            data: {
                post: 'add_cart',
                productid: productId,
                num: 1
            },
            error: function() {
                alert('Something wrong ...');
            }
        });
        var pageCart = answer.done(function(data) {
            return data;
        });
        console.log(pageCart);
    });
}); // end of ready function