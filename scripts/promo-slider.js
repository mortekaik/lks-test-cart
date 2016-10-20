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

    var $elemThumbOrder = $('.thumbnails-wrapper ul > li');
    console.log($elemThumbOrder);
    var countElems = $elemThumbOrder.length;   // Общее количество изображений
    console.log(countElems);
    var marginRightProp = parseInt($elemThumbOrder.css('marginRight'));
    console.log(marginRightProp);
    var elemOuterWidth = $elemThumbOrder.outerWidth() + marginRightProp;
    console.log(elemOuterWidth);
    if (countElems > 4) {
        $('.thumb-prev, .thumb-next').css({'visibility': 'visible'});
    } else if (countElems <= 4 && countElems > 1) {
        $('.thumbs-list').css({'width': elemOuterWidth * countElems, 'margin': '0 auto'});
    } else {
        $('.gallery-box figure > a, .popup_body figure > a').css({'display': 'none'});
        $('.thumbs-list').css({'width': elemOuterWidth * countElems, 'margin': '0 auto'});
    }
    $('.thumbnails-wrapper').on('click', '.thumbs-item a', function() {   // При нажатии на миниатюру
        var images = $(this).find('img');
        var imgProp = getAttributes(images);
        console.log(imgProp);

        $(".big-image img, .popup-img_big img").attr(imgProp); // Подменяем аттрибуты большого изображения на аттрибуты выбранного
        $('.big-image figcaption, .popup_header figcaption').text(imgProp.title);
        $(this).parent().siblings('li').removeClass('current'); // Удаляем класс .current со ссылки чтоб убрать рамку
        images.parents('li').addClass('current');         // Добавляем класс .current на выбранную миниатюру
        return false;
    });

    $('.gallery-box .view').on('click', '.prev, .next', function() {
        return false;
    });
    $('.popup .popup_body .popup-img_big').on('click', '.next', function() {                // При нажатии на кнопку "вперед"
        var count = $('.thumbnails-wrapper ul > li').length;   // Общее количество изображений
        var n = parseInt($('.thumbnails-wrapper ul > li').index($('.current')) + 1); // Порядковый номер текущего изображения
        var activeImg = $('.thumbnails-wrapper .current');     // Активное на данный момент изображение
        var nextSrc, nextImgProp;

        if (count != n) {   // - Если изображение не последнее
        nextSrc = activeImg.next().find('img');
        nextImgProp = getAttributes(nextSrc);   // В переменную записываются атрибуты следующего изображения
        $('.thumbnails-wrapper .current').removeClass('current');   // Удаляется класс .current с предыдущей миниатюры
        activeImg.next().addClass('current');  // На миниатюру следующего изображения вешается класс .current
        } else {      // - Если текущее изображение последнее в списке
        nextSrc = $('.thumbnails-wrapper ul > li').first().find('img'); // В переменную записываются атрибуты первого изображения
        nextImgProp = getAttributes(nextSrc);
        $('.thumbnails-wrapper .current').removeClass('current'); // Удаляется класс .current с предыдущей миниатюры
        $('.thumbnails-wrapper ul > li').first().addClass('current');  // На первую миниатюру вешается класс .current
        }
        $('.big-image img, .popup-img_big img').attr(nextImgProp);  // Подменяем адрес большого изображения на адрес следующего
        $('.big-image figcaption, .popup_header figcaption').text(nextImgProp.title);
        return false;
    });


    $('.popup .popup_body .popup-img_big').on('click', '.prev', function() {   // При нажатии на кнопку "назад"
        var count = $('.thumbnails-wrapper ul > li').length; // Общее количество изображений
        var n = parseInt($('.thumbnails-wrapper ul > li').index($('.current')) + 1); // Порядковый номер текущего изображения
        var activeImg = $('.thumbnails-wrapper .current');  // Активное на данный момент изображение
        var prevSrc, prevImgProp;

        if (n != 1) {          // - Если текущее изображение не первое
        prevSrc = activeImg.prev().find('img');  // В переменную записываются атрибуты предыдущего изображения
        prevImgProp = getAttributes(prevSrc);
        console.log(prevImgProp);
        $('.thumbnails-wrapper .current').removeClass('current');  // Удаляется класс .current активной до этого миниатюры
        activeImg.prev().addClass('current'); // На миниатюру изображения слева вешается класс .current
        } else {  // - Если текущее изображение первое
        prevSrc = $('.thumbnails-wrapper ul > li:last').find('img'); // В переменную записываются атрибуты последнего изображения
        prevImgProp = getAttributes(prevSrc);
        console.log(prevImgProp);
        $('.thumbnails-wrapper .current').removeClass('current'); // Удаляется класс .current с предыдущей миниатюры
        $('.thumbnails-wrapper ul > li:last').addClass('current');  // На последнюю миниатюру вешается класс .current
        }
        $('.big-image img, .popup-img_big img').attr(prevImgProp);  // Подменяется адрес большого изображения на адрес следующего
        $('.big-image figcaption, .popup_header figcaption').text(prevImgProp.title);
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
        var popupContent = $('<div class="popup_header"><figcaption>' + $bigImgProp.title + '</figcaption></div><div class="popup_body"><figure class="popup-img_big"><img class="popup_img" src="' + $bigImgProp.src + '" alt="' + $bigImgProp.alt + '" title="' + $bigImgProp.title + '"/></figure></div><div class="popup_footer"></div>')
        $('.gallery-popup-content').append(popupContent);
        var cloneGalleryThumbs = $('.gallery-box .thumbnails').find('.thumb-prev, .thumb-next, .thumbnails-wrapper').clone(true);
        console.log(cloneGalleryThumbs);
        $('.gallery-popup-content .popup_footer').append(cloneGalleryThumbs);
        var popupBodyArrowBtns = $('<a href="#" class="prev"></a><a href="#" class="next"></a>');
        if (countElems > 1) {
            $('.gallery-popup-content .popup_body figure').append(popupBodyArrowBtns);
        }

        $('.gallery-popup .popup_footer .thumbnails-wrapper').Carousel({
            visible: 4,
            rotateBy: 1,
            speed: 600,
            btnPrev: '.gallery-popup .popup_footer .thumb-prev',
            btnNext: '.gallery-popup .popup_footer .thumb-next',
            auto: false,
            position: "h",
            dirAutoSlide: false                     
        });

        var coordButton;
        var $popupFigure = $('.popup-img_big');
        var $widthFigure = $popupFigure.outerWidth();
        console.log($widthFigure);
        var $widthImg = $('.popup-img_big img').outerWidth();
        console.log($widthImg);
        var $widthButton = $('.popup-img_big .prev').outerWidth();
        console.log($widthButton);
        
        coordButton = ($widthFigure - $widthImg) / 2 - $widthButton;
        console.log(coordButton);

        $('.popup-img_big .prev').css({'left': coordButton});
        $('.popup-img_big .next').css({'right': coordButton});
        
        modal('open');
    });

    $('body').on('click', '.popup_close, #overlay', function() {    // Событие клика на затемненный фон и на кнопку X
        modal('close');
        var $popupContent = $('.gallery-popup-content');
        var $popupBlocks = $popupContent.find('.popup_header, .popup_body, .popup_footer');
        setTimeout(function() { // Выставляем таймер
          $popupBlocks.remove(); // Удаляем разметку всплывающего окна
        }, 400);
    });
});