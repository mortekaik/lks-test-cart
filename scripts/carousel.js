$(document).ready(function() {
// //Обработка клика на стрелку вправо
// $(document).on('click', ".carousel-button-right", function() {
//     var carusel = $(this).parents('.carousel');
//     right_carusel(carusel);
//     return false;
// });
// //Обработка клика на стрелку влево
// $(document).on('click', ".carousel-button-left", function() {
//     var carusel = $(this).parents('.carousel');
//     left_carusel(carusel);
//     return false;
// });

// function left_carusel(carusel) {
//     var block_width = $(carusel).find('.carousel-block').outerWidth();
//     $(carusel).find(".carousel-items .carousel-block")
//            .slice(-4).clone().prependTo($(carusel).find(".carousel-items"));
//     $(carusel).find(".carousel-items").css({ "left": "-" + block_width*4 + "px" });
//     $(carusel).find(".carousel-items").animate({ left: "0px" }, 1000); 
//     $(carusel).find(".carousel-items .carousel-block")
//            .slice(-4).remove();
// }

// function right_carusel(carusel) {
//     var block_width = $(carusel).find('.carousel-block').outerWidth();
//     $(carusel).find(".carousel-items").animate({ left: "-" + block_width*4 + "px" }, 1000, function() {
//         $(carusel).find(".carousel-items .carousel-block").slice(0, 4).clone(true).appendTo($(carusel).find(".carousel-items"));
//         $(carusel).find(".carousel-items .carousel-block").slice(0, 4).remove();
//         $(carusel).find(".carousel-items").css({ "left": "0px" });
//     });
// }

// $(function() {
//     // Включить автоматическую прокрутку карусели
//     // auto_right('.carousel:first');
// })

// // Автоматическая прокрутка
// function auto_right(carusel) {
//     setInterval(function() {
//         if (!$(carusel).is('.hover'))
//             right_carusel(carusel);
//     }, 3000)
// }
// // Навели курсор на карусель
// $(document).on('mouseenter', '.carousel', function() { $(this).addClass('hover') })
//     //Убрали курсор с карусели
// $(document).on('mouseleave', '.carousel', function() { $(this).removeClass('hover') })


    (function($) {
        $.fn.Carousel = function(options) {
            // default settings
            var settings = {
                visible: 3, //количество отображаемых позиций 3
                rotateBy: 1, //прокручивать по 1
                speed: 1000, //скорость 1 секунда
                btnNext: null, // кнопка вперед не назначена
                btnPrev: null, // кнопка назад не назначена
                auto: true, // авто прокрутка включена
                margin: 10, // отступ между позициями
                position: "h", // расположение по горизонтали
                dirAutoSlide: false //направление движения в перед для автопрокрутки
            };

            return this.each(function() {
                if (options) {
                    $.extend(settings, options); //устанавливаем пользовательские настройки
                }

                var $this = $(this); //родительский элемент (Блок в котором находится карусель)                      
                var $carousel = $this.children(':first'); // получаем дочерний элемент (UL) т.е. саму карусель
                var itemWidth = $carousel.children().outerWidth() + settings.margin; // вычисляем ширину элемента
                var itemHeight = $carousel.children().outerHeight() + settings.margin; // вычисляем высоту элемента                   
                var itemsTotal = $carousel.children().length; // получаем общее количество элементов в каруселе
                var running = false; //останавливаем процесс
                var intID = null; //отчищаем интервал
                //size - размер для вычисления длины, зависит от ориентации карусели
                var size = itemWidth;

                if (settings.position == "v") { //Если карусель вертикальная то
                    size = itemHeight;
                }
                if (settings.position == "v") {
                    $this.css({
                        'position': 'relative', //необходимо для нормального отображения в ИЕ6(7) 
                        'overflow': 'hidden', // прячем все, что не влезает в контейнер
                        'height': settings.visible * size + 'px', // ДЛИНУ контейнера ставим равной ширине всех видимых элементов
                        'width': itemWidth - settings.margin //Ширина контейнера равна ширине элемента
                    });
                } else {
                    $this.css({
                        'position': 'relative', // необходимо для нормального отображения в ИЕ6(7)
                        'overflow': 'hidden', // прячем все, что не влезает в контейнер
                        // 'width': settings.visible * size + 'px', // ширину контейнера ставим равной ширине всех видимых элементов
                        //'height': itemHeight - settings.margin
                    });
                }
                //вычисляем расстояние отступа от каждого элемента
                if (settings.position == "v")
                    $carousel.children('li').css({
                        'margin-top': settings.margin / 2 + 'px',
                        'margin-bottom': settings.margin / 2 + 'px',
                        'float': 'left',
                        'width': '60px',
                        'height': '40px',
                        'padding': '5px',
                        'background': '#E2E2E2',
                        'font': '20px Calibry italic',
                        'color': 'green',
                        'border': 'gray 1px solid'
                    });
                // else
                //     $carousel.children('li').css({
                //         'margin-left': settings.margin/2 + 'px',
                //         'margin-right': settings.margin/2 + 'px',
                //     });
                // в зависимости от ориентации, увеличиваем длину или ширину карусели
                if (settings.position == "v")
                    $carousel.css({
                        'position': 'relative', // разрешаем сдвиг по оси
                        'height': 10000 + 'px', // увеличиваем ленту карусели
                        'left': 0,
                        'top': 0
                    });
                else
                    $carousel.css({
                        'position': 'relative', // разрешаем сдвиг по оси
                        'width': 10000 + 'px', // увеличиваем ленту карусели
                        // 'top': 0,
                        // 'left': 0
                    });
                //прокрутка карусели в наравлении dir [true-вперед; false-назад]
                function slide(dir) {
                    var direction = !dir ? -1 : 1; // устанавливаем заданное направление
                    var Indent = 0; // смещение (для ul)
                    if (!running) {
                        // если анимация завершена (или еще не запущена)
                        running = true; // ставим флажок, что анимация в процессе
                        if (intID) { // если запущен интервал
                            window.clearInterval(intID); // очищаем интервал                                         
                        }
                        if (!dir) { // если мы мотаем к следующему элементу (так по умолчанию)
                            /*
                             * вставляем после последнего элемента карусели
                             * клоны стольких элементов, сколько задано
                             * в параметре rotateBy (по умолчанию задан один элемент)
                             */
                            $carousel.children(':last').after($carousel.children().slice(0, settings.rotateBy).clone(true));
                        } else { // если мотаем к предыдущему элементу
                            /*
                             * вставляем перед первым элементом карусели
                             * клоны стольких элементов, сколько задано
                             * в параметре rotateBy (по умолчанию задан один элемент)
                             */
                            $carousel.children(':first').before($carousel.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
                            /*
                             * сдвигаем карусель (<ul>)  на ширину/высоту  элемента,
                             * умноженную на количество элементов, заданных
                             * в параметре rotateBy (по умолчанию задан один элемент)
                             */
                            if (settings.position == "v")
                                $carousel.css('top', -size * settings.rotateBy + 'px');
                            else $carousel.css('left', -size * settings.rotateBy + 'px');
                        }

                        /*
                         * расчитываем  смещение
                         * текущее значение  + ширина/высота  одного элемента * количество проматываемых элементов * на направление перемещения (1 или -1)
                         */
                        if (settings.position == "v")
                            Indent = parseInt($carousel.css('top')) + (size * settings.rotateBy * direction);
                        else
                            Indent = parseInt($carousel.css('left')) + (size * settings.rotateBy * direction);

                        if (settings.position == "v")
                            var animate_data = { 'top': Indent };
                        else
                            var animate_data = { 'left': Indent };
                        // запускаем анимацию
                        $carousel.animate(animate_data, {
                            queue: false,
                            duration: settings.speed,
                            complete: function() {
                                // когда анимация закончена
                                if (!dir) { // если мы мотаем к следующему элементу (так по умолчанию)
                                    // удаляем столько первых элементов, сколько задано в rotateBy
                                    $carousel.children().slice(0, settings.rotateBy).remove();
                                    // устанавливаем сдвиг в ноль
                                    if (settings.position == "v")
                                        $carousel.css('top', 0);
                                    else $carousel.css('left', 0);
                                } else { // если мотаем к предыдущему элементу
                                    // удаляем столько последних элементов, сколько задано в rotateBy
                                    $carousel.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
                                }
                                if (settings.auto) { // если карусель должна проматываться автоматически
                                    // запускаем вызов функции через интервал времени (auto)
                                    //if (!$(".carousel").is('.hover')) {
                                    intID = window.setInterval(function() { 
                                        slide(settings.dirAutoSlide); 
                                    }, 2000, settings.auto);
                                //}
                                }
                                running = false; // отмечаем, что анимация завершена
                            }
                        });
                    }
                    return false; // возвращаем false для того, чтобы не было перехода по ссылке
                }
                // назначаем обработчик на событие click для кнопки "вперед"
                $(settings.btnNext).click(function() {
                    return slide(false);
                });
                // назначаем обработчик на событие click для кнопки "Назад"
                $(settings.btnPrev).click(function() {
                    return slide(true);
                });

                if (settings.auto) { // если карусель должна проматываться автоматически
                    // запускаем вызов функции через временной интервал
                    intID = window.setInterval(function() { 
                        slide(settings.dirAutoSlide);
                    }, settings.auto);
                }
            });
        };
    })(jQuery);
    
     // Навели курсор на карусель
    $(document).on('mouseenter', '.carousel', function() { 
        $(this).addClass('hover');
    });
    //Убрали курсор с карусели
    $(document).on('mouseleave', '.carousel', function() { 
        $(this).removeClass('hover');
    });
    
    // запускаем карусель
    $('.carousel-wrapper').Carousel({
        visible: 4,
        rotateBy: 4,
        speed: 2000,
        btnNext: '.carousel .carousel-button-right',
        btnPrev: '.carousel .carousel-button-left',
        auto: true,
        position: "h",                        
        dirAutoSlide: false                     
    });

    // запускаем promo-slider
    // $('.slider-wrapper').Carousel({
    //     // visible: 1,
    //     rotateBy: 1,
    //     speed: 2000,
    //     btnNext: '.slider-box .carousel-button-right',
    //     btnPrev: '.slider-box .carousel-button-left',
    //     auto: false,
    //     position: "h",                        
    //     dirAutoSlide: false                     
    // });
});
