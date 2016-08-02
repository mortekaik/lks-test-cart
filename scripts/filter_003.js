var filterResult = $("#filter_result");

    function closeFilterResult() {
        filterResult.hide();
    }

    function toggleFilter(id) {
        $('#filter_' + id).slideToggle();
        $('#filter_title_' + id).toggleClass('open close');
    }

    function calcTop(filter) {
        return filter.offset().top - $('#fil_top').offset().top - 10;
    }

    function setFilter(filter) {
        var filters = $('#form_filter :checked,#form_filter input[type="hidden"], .changed :text'),
            data = 'category=2965&brand=';

        if (filters.length) {
            filterResult.css({"top": calcTop(filter) + "px", "left": "185px"});
            filterResult.html(getFilterResultHtml("Идет подсчет...<br><img src='https://www.003.ru/image/ajax/loading.gif' style='position:relative; top:3px;'>"));
            filterResult.show();

            $.each(filters, function (i, item) {
                data += "&" + $(item).prop('name') + "=" + $(item).val();
            });

            $.post('https://www.003.ru/ajax/listing/productFilterAjax',
                data,
                function (response) {
                    var text;
                    if (response.count == 0) {
                        text = "Не найдено товаров<br>по заданным условиям.";
                    } else {
                        text = "Товаров: " + response.count + "<br><a style='padding-left: 13px;' href='#' onclick = 'submitFilter(); return false;'>Показать</a>"
                    }
                    filterResult.html(getFilterResultHtml(text));
                }, 'json');
        }
        else {
            closeFilterResult();
        }
        return false;
    }

    function getFilterResultHtml(text) {
        return "<div align='right' style='width:9px; height:13px; left:131px; padding:2px; cursor:pointer;' onClick='closeFilterResult()'>" +
            "<img src='https://www.003.ru/image/icon/cross.gif'></div><b><p style='text-align:center; padding-top:4px'>" + text + "</p></b>";
    }

    function submitFilter() {
        var form = document.getElementById('form_filter');
        var priceFilter = $('#filter_prices');
        if (!priceFilter.hasClass('changed')) {
            priceFilter.find(':text').prop('disabled', 'disabled');
        }
        form.submit();
    }

    function resetFilter() {
        var clearHref = window.location.href.split('?');
        window.location.href = clearHref[0];
    }

    function showAllValues(id) {
        $('#filter_' + id + ' li.invisible').toggleClass('inv');
        $('#show_all_' + id).text(function (i, text) {
            return $.trim(text) == "Показать все" ? "Свернуть" : "Показать все";
        });
    }