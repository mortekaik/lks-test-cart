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
        $.ajax({ 
            type: 'POST',
            url: '../input.php',
            data: {
                post: 'add_cart',
                productid: productId,
                num: 1
            },
            success: function(data) {
                console.log(data);
                getAnswer(data);
            },
            error: function() {
                alert('Something wrong ...');
            }
        }); // конец ajax-запроса
    }); // конец добавления товара в корзину

    var answer = [];
    function getAnswer(response) {
        answer = response.split('\@\@\@');
        console.log(answer);
        // $(answer).each(function() {
        //     $(this).find()
        // })
    }
}); // end of ready function