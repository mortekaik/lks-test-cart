<?php  function __autoload($class_name)
    {
        include_once($class_name . '.class.php');
    }
    $cart = new Cart;
    $q = $cart->getCart_small();
	 ?>

<!doctype html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <title>ЛКС - лабораторное и промышленное оборудование</title>
    <link type="text/css" href="css/jquery-ui.min.css" rel="stylesheet">
    <link type="text/css" href="css/footer.css" rel="stylesheet">
    <link type="text/css" href="css/upload.css" rel="stylesheet">
    <script src="scripts/jquery-1.12.4.min.js"></script>
    <script src="scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" src="scripts/1.js"></script>
    <script type="text/javascript" src="scripts/cart.js"></script>
    <script type="text/javascript" src="scripts/filter.js"></script>
    <script type="text/javascript" src="scripts/carousel.js"></script>
    <script type="text/javascript" src="scripts/promo-slider.js"></script>
    <!--[if lt IE 9]>
        <script src="scripts/html5shiv.min.js"></script>
        <script src="scripts/html5shiv-printshiv.min.js"></script>
    <![endif]-->

    <script>(function(e,t,n){var r=e.querySelectorAll("html")[0];r.className=r.className.replace(/(^|\s)no-js(\s|$)/,"$1js$2")})(document,window,0);
    </script>
</head>

<body>
    <div id="wrap">
        <div class="header">
            <div class="block block-header">
                <img src="img/lks-logo.jpg" class="logo" width="80px" />
                <div class="top-menu" id="top_nav"></div>
            </div>
        </div>
        <div id="main">
            <div id="content">
                <div class="block block-content clearfix">
                    <div class="left-menu">
                        <div id="cart">
                        <?php  echo $q['pageCart']; ?>
                        </div>
                        <div id="searchFilter">
                            <form id="searchForm" action="search.php" method="post">
                                <label for="search-type">Search</label>
                                <input type="text" id="search-type" name="search" placeholder="Input something"><br>
                                <div id="log-search"></div>
                            </form>
                            <form id="main-search-form" action="search.php" class="header-search-form-section" method="post" novalidate="novalidate">
                            <div class="header-search-form input-autocomplete">
                                <input placeholder="Поиск" class="header-search-input  sel-field-search valid" autocomplete="off" type="text" id="frm-search-text">
                                <span class="font-icon icon-zoom header-search-icon">
                                    <input type="submit" class="header-search-btn" value="">
                                </span>
                            </div>
                            <div class="popup default active" style="display: block; top: 0px; width: 200px; left: 98px;">
                                <ul class="search-list"></ul>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="promo-slider">
                        <div class="slider-box">
                            <ul id="slider">
                                <li class="slide"><a href="#"><img src="img/slider/10574.jpg" width="650" height="250"></a></li>
                                <li class="slide"><a href="#"><img src="img/slider/6586.jpg" width="650" height="250"></a></li>
                                <li class="slide"><a href="#"><img src="img/slider/113.jpg" width="650" height="250"></a></li>
                                <li class="slide"><a href="#"><img src="img/slider/113_1.jpg" width="650" height="250"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="gallery-box">
                        <div class="view">
                            <figure class="big-image">
                                <img src="img/medium/img11.jpg" alt="image11" title="Picture #011">
                                <figcaption>Picture #011</figcaption>
                                <a href="#" class="prev"></a>
                                <a href="#" class="next"></a>
                            </figure>
                        </div>
                        <div class="thumbnails">
                            <div class="thumb-prev"><a href="#"></a></div>
                            <div class="thumb-next"><a href="#"></a></div>
                            <div class="thumbnails-wrapper">
                                <ul class="thumbs-list clearfix">
                                    <li class="thumbs-item current">
                                        <a href="#"><img src="img/medium/img11.jpg" alt="image11" title="Picture #011"></a>
                                    </li>
                                    <li class="thumbs-item">
                                        <a href="#"><img src="img/medium/img12.jpg" alt="image12" title="Picture #012"></a>
                                    </li>
                                    <li class="thumbs-item">
                                        <a href="#"><img src="img/medium/img13.jpg" alt="image13" title="Picture #013"></a>
                                    </li>
                                    <li class="thumbs-item">
                                        <a href="#"><img src="img/medium/img14.jpg" alt="image14" title="Picture #014"></a>
                                    </li>
                                    <li class="thumbs-item">
                                        <a href="#"><img src="img/medium/img15.jpg" alt="image15" title="Picture #015"></a>
                                    </li>
                                    <!-- <li class="thumbs-item">
                                        <a href="#"><img src="img/medium/img16.jpg" alt="image16" title="Picture #016"></a>
                                    </li> -->
                                    <!-- <li class="thumbs-item">
                                        <a href="#"><img src="img/medium/img17.jpg" alt="image17" title="Picture #017"></a>
                                    </li> -->
                                    <!-- <li class="thumbs-item">
                                        <a href="#"><img src="img/medium/img18.jpg" alt="image18" title="Picture #018"></a>
                                    </li> -->
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="filter-aside">
                        <form class="filterForm" id="filter-box" enctype="multipart/form-data" action="input.php" method="post">
                            <article class="filter-block fltr-price">
                                <h3 class="fltr-heading fltr-heading_price">Цена</h3>
                                <div class="fltr-body_price">
                                    <label for="price-from">От:</label>
                                    <input type="text" name="from" id="price-from" value="1">
                                    <label for="price-to">до:</label>
                                    <input type="text" name="to" id="price-to" value="2">
                                    <input type="hidden" id="price-hidden" value="100" name="price-range">
                                    <!-- <input type="submit" class="button price_btn" name="price-submit" value="Submit"> -->
                                    <div class="price-slider"></div>
                                </div>
                            </article>
                            <article class="filter-block fltr-producer">
                                <h3 class="fltr-heading fltr-heading_producer">Производитель
                                    <div class="info-tooltip">
                                        <span class="info-tooltip_icon">?</span>
                                        <span class="info-tooltip_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, atque. Aliquid debitis ea corrupti asperiores.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, atque. Aliquid debitis ea corrupti asperiores.</p>
                                        </span>
                                    </div>
                                </h3>
                                <ul class="list-producer">
                                    <li class="list-item_producer"><span>
                                    <input title="A&D" id="producer_1" type="checkbox" name="producer" value="1">
                                    <label for="producer_1">A&D</label>
                                    </span></li>
                                    <li class="list-item_producer"><span>
                                    <input title="ACOM" id="producer_2" type="checkbox" name="producer" value="2">
                                    <label for="producer_2">ACOM</label>
                                    </span></li>
                                    <li class="list-item_producer"><span>
                                    <input title="Vesta" id="producer_3" type="checkbox" name="producer" value="3">
                                    <label for="producer_3">Vesta</label>
                                    </span></li>
                                    <li class="list-item_producer hidden inv"><span>
                                    <input title="Sartorius" id="producer_4" type="checkbox" name="producer" value="4">
                                    <label for="producer_4">Sartorius</label>
                                    </span></li>
                                    <li class="list-item_producer hidden inv"><span>
                                    <input title="Gosmetr" id="producer_5" type="checkbox" name="producer" value="5">
                                    <label for="producer_5">Gosmetr</label>
                                    </span></li>
                                    <li><a href="#" class="show-all_producer">Показать все</a></li>
                                </ul>
                            </article>
                            <article class="filter-block fltr-scalestype">
                                <h3 class="fltr-heading fltr-heading_scalestype">Тип весов
                                    <div class="info-tooltip">
                                        <span class="info-tooltip_icon">?</span>
                                        <span class="info-tooltip_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam repellendus inventore minima, consequatur aperiam velit!</p>
                                        </span>
                                    </div>
                                </h3>
                                <ul class="list-scalestype">
                                    <li class="list-item_scalestype"><span>
                                    <input title="Ultramicroscales" id="scalestype_1" type="checkbox" name="scalestype" value="1">
                                    <label for="scalestype_1">Ультрамикровесы</label>
                                    </span></li>
                                    <li class="list-item_scalestype"><span>
                                    <input title="Microscales" id="scalestype_2" type="checkbox" name="scalestype" value="2">
                                    <label for="scalestype_2">Микровесы</label>
                                    </span></li>
                                    <li class="list-item_scalestype"><span>
                                    <input title="Analitics-scales" id="scalestype_3" type="checkbox" name="scalestype" value="3">
                                    <label for="scalestype_3">Аналитические</label>
                                    </span></li>
                                    <li class="list-item_scalestype hidden inv"><span>
                                    <input title="Laboratory-scales" id="scalestype_4" type="checkbox" name="scalestype" value="4">
                                    <label for="scalestype_4">Лабораторные весы</label>
                                    </span></li>
                                    <li class="list-item_scalestype hidden inv"><span>
                                    <input title="Portion scales" id="scalestype_5" type="checkbox" name="scalestype" value="5">
                                    <label for="scalestype_5">Порционные весы</label>
                                    </span></li>
                                    <li class="list-item_scalestype hidden inv"><span>
                                    <input title="Counting scales" id="scalestype_6" type="checkbox" name="scalestype" value="6">
                                    <label for="scalestype_6">Счетные весы</label>
                                    </span></li>
                                    <li class="list-item_scalestype hidden inv"><span>
                                    <input title="Platform scales" id="scalestype_7" type="checkbox" name="scalestype" value="7">
                                    <label for="scalestype_7">Платформенные весы</label>
                                    </span></li>
                                    <li><a href="#" class="show-all_scalestype">Показать все</a></li>
                                </ul>
                            </article>
                        </form>
                        <div class="news"> <?php echo $q['cart']; ?> </div>
                        <div class="desc-edit">
                            <form class="editForm" id="edit-box" enctype="multipart/form-data" action="input.php" method="post">
                                <p>
                                <textarea id="description" name="decription" placeholder="Input description" rows="5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe soluta provident dolor. Nemo temporibus, nihil velit earum fugit, sit qui distinctio dolor illo, provident tempora sapiente repudiandae impedit possimus. Quas!</textarea>
                                </p>
                                <p>
                                <input name="button" type="submit" value="Сохранить" id="send-desc"> 
                                </p>
                                <p>
                                <span id="resp">Original Description</span>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div class="deals">
                        <div class="product">
                            <span class="price">1000.-</span>
                            <span class="<? $cart->check_product('1'); ?>" id="product_1"></span>
                        </div>
                        <div class="product">
                            <span class="price">2000.-</span>
                            <span class="<? $cart->check_product('2'); ?>" id="product_2"></span>
                        </div>
                        <div class="product">
                            <span class="price">3000.-</span>
                            <span class="<? $cart->check_product('3'); ?>" id="product_3"></span>
                        </div>
                        <div class="product">
                            <span class="price">4000.-</span>
                            <span class="<? $cart->check_product('4'); ?>" id="product_4"></span>
                        </div>
                        <div class="product">
                            <span class="price">5000.-</span>
                            <span class="<? $cart->check_product('5'); ?>" id="product_5"></span>
                        </div>
                    </div>
                    <div class="slider-wrap">
                        <div class="carousel-header">
                            <h3>Brands</h3>
                        </div>
                        <div class="carousel shadow">
                            <div class="carousel-button-left"><a href="#"></a></div>
                            <div class="carousel-button-right"><a href="#"></a></div>
                            <div class="carousel-wrapper"> 
                               <ul class="carousel-items clearfix">
                                    <li class="carousel-block">
                                        <a class="q-item-info" href="#">0
                                            <img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
                                            <div class="q-item-text"><span>Весы A&D</span></div>
                                        </a>
                                    </li>
                                    <li class="carousel-block">
                                        <a class="q-item-info" href="#">1
                                            <img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
                                            <div class="q-item-text"><span>Весы A&D</span></div>
                                        </a>
                                    </li>
                                    <li class="carousel-block">
                                        <a class="q-item-info" href="#">2
                                            <img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
                                            <div class="q-item-text"><span>Весы A&D</span></div>
                                        </a>
                                    </li>
                                    <li class="carousel-block">
                                        <a class="q-item-info" href="#">3
                                            <img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
                                            <div class="q-item-text"><span>Весы A&D</span></div>
                                        </a>
                                    </li>
                                    <li class="carousel-block">
                                        <a class="q-item-info" href="#">4
                                            <img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
                                            <div class="q-item-text"><span>Весы A&D</span></div>
                                        </a>
                                    </li>
                                    <li class="carousel-block">
                                        <a class="q-item-info" href="#">5
                                            <img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
                                            <div class="q-item-text"><span>Весы A&D</span></div>
                                        </a>
                                    </li>
                               </ul>
                            </div>
                       </div>
                    </div>
                    <div class="vendors" id="del_all">
                        <button class="modal_cart_btn delete_all_btn">Обнулить корзину</button>
                    </div>
                    <div class="upload-wrap">
                        <form class="uploadform" action="upload.php" method="post" enctype="multipart/form-data">
                            <div class="uploadform_zone">
                                <svg class="uploadform_icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
                                    <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"/>
                                </svg>
                                <input type="file" class="uploadform_file" name="files[]" id="uploadFile" data-multiple-caption="{count} files selected" multiple>
                                <label for="uploadFile"><strong>Выберите файл</strong>
                                    <span class="uploadform_dragndrop"> или перетащите файл сюда</span>
                                </label>
                                <button class="uploadform_button" type="submit">Загрузить</button>
                            </div>
                            <div class="uploadform_uploading">Загружаем&hellip;</div>
                            <div class="uploadform_success">Все готово!</div>
                            <div class="uploadform_error">Ошибочка!<span></span></div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="side"></div>
        </div>
        <div id="footer">
            <div class="footer">
            <div class="block block-footer">
            </div>
        </div>
        </div>
        <div id="top-link"><a href='#top-link'>Вверх</a></div>
        <!-- Всплывающее окно галереи с увеличенной картинкой -->
        <div class="popup gallery-popup">
            <div class="gallery-popup-content"></div>
            <button type="button" class="popup_close">X</button>
        </div>
         <!-- Модальное окно корзины -->
        <div id="modal_cart">
        <!-- Кнoпкa зaкрыть -->
            <?php echo $q['last']; ?>
        <!-- Сюда добавляется разметка из обработчика -->
        </div>
        <div id="overlay"></div> <!-- Пoдлoжкa -->
    </div>
</body>

</html>
