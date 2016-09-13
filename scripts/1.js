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
    });

    /*-------- форма загрузки файлов на сервер ----------*/

    var $uploadUrl = $('#uploadForm').attr('action');

    $('#uploadForm').on('click', function(e) {
        e.preventDefault();
        // e.stopPropagation();
        uploadFiles();
    });

    function uploadFiles() {
        var $input = $(".dropzone-small__upload");
        var fileAttr = $input.prop('files')[0];
        // var data = $input.get(0);
        // var formData = new FormData($input.get(0));
        var formData = new FormData();

        formData.append('insFile', $input.prop('files')[0]);
        
        console.log(fileAttr);

        $.ajax({
            url: $uploadUrl,
            type: 'POST',
            cache: false,
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if(data) {
                    $input.replaceWith(data);
                    // console.log(data);
                }
            }
        });
    }

    /*-------- End of формы отправки ---------*/

}); // End of Ready function