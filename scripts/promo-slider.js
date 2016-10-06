$(document).ready(function(e) { 
    (function($) {
        var hwSlideSpeed = 700;
        var hwTimeOut = 3000;
        var hwNeedLinks = true;

        $('.slide').css(
            {"position" : "absolute",
             "top":'0', "left": '0'}).hide().eq(0).show();
        var slideNum = 0;
        var slideTime;
        slideCount = $("#slider .slide").size();
        var animSlide = function(arrow){
            clearTimeout(slideTime);
            $('.slide').eq(slideNum).fadeOut(hwSlideSpeed);
            if(arrow == "next"){
                if(slideNum == (slideCount-1)){slideNum=0;}
                else{slideNum++}
                }
            else if(arrow == "prew")
            {
                if(slideNum == 0){slideNum=slideCount-1;}
                else{slideNum-=1}
            }
            else{
                slideNum = arrow;
                }
            $('.slide').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
            $(".control-slide.active").removeClass("active");
            $('.control-slide').eq(slideNum).addClass('active');
        };
            
        if(hwNeedLinks){
        var $linkArrow = $('<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>')
            .prependTo('#slider');      
            $('#nextbutton').click(function(){
                animSlide("next");
                return false;
                })
            $('#prewbutton').click(function(){
                animSlide("prew");
                return false;
                })
        }
        var $adderSpan = '';
        $('.slide').each(function(index) {
                $adderSpan += '<span class = "control-slide">' + index + '</span>';
            });
        $('<div class ="sli-links">' + $adderSpan +'</div>').appendTo('#slider');
        $(".control-slide:first").addClass("active");
        $('.control-slide').click(function(){
        var goToNum = parseFloat($(this).text());
        animSlide(goToNum);
        });
        var pause = false;
        var rotator = function(){
                if(!pause){slideTime = setTimeout(function(){animSlide('next')}, hwTimeOut);}
            }
        $('.promo-slider').hover(    
            function(){clearTimeout(slideTime); pause = true;},
            function(){pause = false; rotator();
            });
        rotator();
    })(jQuery);

    /*-------------- Галерея изображений товара -------*/ 
    
    function getAttributes ( $node ) {
        var attrs = {};
        $.each( $node[0].attributes, function ( index, attribute ) {
            attrs[attribute.name] = attribute.value;
        });
        return attrs;
    }

    $('.thumbnails').on('click', '.thumbs-item a', function() {   // При нажатии на миниатюру
        var images = $(this).find('img');
        var imgProp = getAttributes(images);
        console.log(imgProp);

        $(".big-image img").attr(imgProp); // Подменяем аттрибуты большого изображения на аттрибуты выбранного
        $('.big-image figcaption').text(imgProp.title);
        $(this).parent().siblings('li').removeClass('current'); // Удаляем класс .current со ссылки чтоб убрать рамку
        images.parents('li').addClass('current');         // Добавляем класс .current на выбранную миниатюру
        return false;
    });

    $('.gallery-box .view').on('click', '.next', function() {                // При нажатии на кнопку "вперед"
        var count = $('.thumbnails ul > li').length;   // Общее количество изображений
        var n = parseInt($('.thumbnails ul > li').index($('.current')) + 1); // Порядковый номер текущего изображения
        var activeImg = $('.thumbnails .current');     // Активное на данный момент изображение
        var nextSrc, nextImgProp;

        if (count != n) {   // - Если изображение не последнее
        nextSrc = activeImg.next().find('img');
        nextImgProp = getAttributes(nextSrc);   // В переменную записываются атрибуты следующего изображения
        $('.thumbnails .current').removeClass('current');   // Удаляется класс .current с предыдущей миниатюры
        activeImg.next().addClass('current');  // На миниатюру следующего изображения вешается класс .current
        } else {      // - Если текущее изображение последнее в списке
        nextSrc = $('.thumbnails ul > li').first().find('img'); // В переменную записываются атрибуты первого изображения
        nextImgProp = getAttributes(nextSrc);
        $('.thumbnails .current').removeClass('current'); // Удаляется класс .current с предыдущей миниатюры
        $('.thumbnails ul > li').first().addClass('current');  // На первую миниатюру вешается класс .current
        }
        $('.big-image img').attr(nextImgProp);  // Подменяем адрес большого изображения на адрес следующего
        $('.big-image figcaption').text(nextImgProp.title);
        return false;
    });


    $('.gallery-box .view').on('click', '.prev', function() {   // При нажатии на кнопку "назад"
        var count = $('.thumbnails ul > li').length; // Общее количество изображений
        var n = parseInt($('.thumbnails ul > li').index($('.current')) + 1); // Порядковый номер текущего изображения
        var activeImg = $('.thumbnails .current');  // Активное на данный момент изображение
        var prevSrc, prevImgProp;

        if (n != 1) {          // - Если текущее изображение не первое
        prevSrc = activeImg.prev().find('img');  // В переменную записываются атрибуты предыдущего изображения
        prevImgProp = getAttributes(prevSrc);
        console.log(prevImgProp);
        $('.thumbnails .current').removeClass('current');  // Удаляется класс .current активной до этого миниатюры
        activeImg.prev().addClass('current'); // На миниатюру изображения слева вешается класс .current
        } else {  // - Если текущее изображение первое
        prevSrc = $('.thumbnails ul > li:last').find('img'); // В переменную записываются атрибуты последнего изображения
        prevImgProp = getAttributes(prevSrc);
        console.log(prevImgProp);
        $('.thumbnails .current').removeClass('current'); // Удаляется класс .current с предыдущей миниатюры
        $('.thumbnails ul > li:last').addClass('current');  // На последнюю миниатюру вешается класс .current
        }
        $('.big-image img').attr(prevImgProp);  // Подменяется адрес большого изображения на адрес следующего
        $('.big-image figcaption').text(prevImgProp.title);
        return false;
    });

    function modal(data) {
        if (data == 'open') {
            $('#overlay').css('display', 'block'); // показываем подложку
            $('.gallery-popup').css('visibility', 'visible'); // показываем окно
            $('body').toggleClass('lock');
        }
        if (data == 'close') {
            $('.gallery-popup').css('visibility', 'hidden'); // скрываем окно
            $('#overlay').css('display', 'none'); // скрываем подложку
            $('body').toggleClass('lock');
        }
    }
    $('.gallery-box').on('click', '.big-image', function() {
        var $img = $(this).find('img'); // получаем картинку, на которую кликнули
        var $bigImgProp = getAttributes($img); // получаем атрибуты этой картинки
        console.log($bigImgProp);
        $('.gallery-popup-content .popup_body').append('<figure class="popup-img_big"><img class="popup_img" src="' + $bigImgProp.src + '" alt="' + $bigImgProp.alt + '" title="' + $bigImgProp.title + '"/></figure>');
        var cloneGalleryThumbs = $('.gallery-box .thumbnails').find('.thumb-prev, .thumb-next, .thumbs-list').clone(true);
        console.log(cloneGalleryThumbs);
        $('.gallery-popup-content .popup_footer').append(cloneGalleryThumbs);
        modal('open');
    });

    $('body').on('click', '.popup_close, #overlay', function() {    // Событие клика на затемненный фон и на кнопку X
        modal('close');
        setTimeout(function() { // Выставляем таймер
          $('.gallery-popup .popup_body, .gallery-popup .thumbnails').remove(); // Удаляем разметку всплывающего окна
        }, 400);
    });
});