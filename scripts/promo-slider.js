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

    $('.thumbnails a').click(function() {      // При нажатии на миниатюру
        var images = $(this).find('img');
        // var imgSrc = images.attr('src');
        var imgProp = getAttributes(images);

        $(".big-image img").attr(imgProp); // Подменяем аттрибуты большого изображения на аттрибуты выбранного
        //.attr({ src: imgSrc });  
        $(this).siblings('a').removeClass('current'); // Удаляем класс .current со ссылки чтоб убрать рамку
        images.parent().addClass('current');         // Добавляем класс .current на выбранную миниатюру
        return false;
    });

    $('.next').click(function() {                // При нажатии на кнопку "вперед"
        var count = $('.thumbnails a').length;   // Общее количество изображений
        var n = parseInt($('.thumbnails a').index($('.current')) + 1); // Порядковый номер текущего изображения
        var activeImg = $('.thumbnails .current');     // Активное на данный момент изображение
        var nextSrc;

        if (count != n) {   // - Если изображение не последнее
        nextSrc = activeImg.next().find('img').attr('src');   // В переменную записывается адрес следующего изображения
        $('.thumbnails .current').removeClass('current');   // Удаляется класс .current с предыдущей миниатюры
        activeImg.next().addClass('current');  // На миниатюру следующего изображения вешается класс .current
        } else {      // - Если текущее изображение последнее в списке
        nextSrc = $('.thumbnails a').first().find('img').attr('src'); // В переменную записывается адрес первого изображения
        $('.thumbnails .current').removeClass('current'); // Удаляется класс .current с предыдущей миниатюры
        $('.thumbnails a').first().addClass('current');  // На первую миниатюру вешается класс .current
        }
        $('.big-image img').attr({ src: nextSrc });  // Подменяем адрес большого изображения на адрес следующего
        return false;
    });


    $('.prev').click(function() {   // При нажатии на кнопку "назад"
        var count = $('.thumbnails a').length; // Общее количество изображений
        var n = parseInt($('.thumbnails a').index($('.current')) + 1); // Порядковый номер текущего изображения
        var activeImg = $('.thumbnails .current');  // Активное на данный момент изображение
        var prevSrc;

        if (n != 1) {          // - Если текущее изображение не первое
        prevSrc = activeImg.prev().find('img').attr('src');  // В переменную записывается адрес предыдущего изображения           
        $('.thumbnails .current').removeClass('current');  // Удаляется класс .current активной до этого миниатюры
        activeImg.prev().addClass('current'); // На миниатюру изображения слева вешается класс .current
        } else {  // - Если текущее изображение первое
        prevSrc = $('.thumbnails a:last').find('img').attr('src'); // В переменную записывается адрес последнего изображения
        $('.thumbnails .current').removeClass('current'); // Удаляется класс .current с предыдущей миниатюры
        $('.thumbnails a:last').addClass('current');  // На последнюю миниатюру вешается класс .current
        }
        $('.big-image img').attr({ src: prevSrc });  // Подменяется адрес большого изображения на адрес следующего
        return false;
    });

    function modal(data) {
        if (data == 'open') {
            $('#overlay').css('display', 'block'); // показываем подложку
            $('.gallery-popup').css('visibility', 'visible'); // показываем окно
        }
        if (data == 'close') {
            $('.gallery-popup').css('visibility', 'hidden'); // скрываем окно
            $('#overlay').css('display', 'none'); // скрываем подложку
        }
    }
    $('.gallery-box').on('click', '.big-image img', function() {
        var $img = $(this); // получаем картинку, ан которую кликнули
        var $sourceImg = $img.attr('src'); // получаем путь к этой картинке из аттрибута src
        $('.gallery-wrap').append('<img src="' + $sourceImg + '" class="popup_img"/>');
        modal('open');
    });

    $('body').on('click', '.popup_close, #overlay', function() {    // Событие клика на затемненный фон и на кнопку X
        modal('close');
        setTimeout(function() { // Выставляем таймер
          $('.gallery-popup img').remove(); // Удаляем разметку всплывающего окна
        }, 400);
    });
});