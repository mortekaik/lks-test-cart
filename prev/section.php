<?php  function __autoload($class_name)
    {
        include_once($class_name . '.class.php');
    }

    $cart = new Cart;
?>

<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>ЛКС - лабораторное и промышленное оборудование</title>
    <link href="footer.css" rel="stylesheet" type="text/css">
    <script src="scripts/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="scripts/cart.js"></script>
    <!--[if lt IE 9]>
      <script src="script/html5.js"></script>	 
     <![endif]-->
</head>

<body>
    <div id="wrap">
        <div class="header">
            <div class="block block-header">
                <img src="lks-logo.jpg" class="logo" width="80px" />
                <div class="top-menu" id="top_nav"></div>
            </div>
        </div>
        <div id="main">
            <div id="content">
                <div class="block block-content clearfix">
                    <div class="left-menu" id="cart">
                        <img class="image-cart" src="/icon-cart.png" width="32" height="23" alt="Cart">
                        <?php print_r($cart->getCart_small()); ?>
                    </div>
                    <div class="slider"></div>
                    <div class="deals">
                        <div class="product"><span class="price">1000.-</span><span class="button" id="product_1"></span>
                        </div>
                        <div class="product"><span class="price">2000.-</span><span class="button" id="product_2"></span>
                        </div>
                        <div class="product"><span class="price">3000.-</span><span class="button" id="product_3"></span>
                        </div>
                        <div class="product"><span class="price">4000.-</span><span class="button" id="product_4"></span>
                        </div>
                        <div class="product"><span class="price">5000.-</span><span class="button" id="product_5"></span>
                        </div>
                    </div>
                    <div class="vendors"></div>
                    <div class="news"></div>
                    <div class="vendors"></div>
                    <div class="vendors"></div>
                </div>
            </div>
            <div id="side">
            </div>
        </div>
    </div>
    <div id="footer">
        <div class="footer">
            <div class="block block-footer">
            </div>
        </div>
    </div>
    <div id="top-link"><a href='#top-link'>Back to Top</a></div>
    
    <div id="modal_cart"> <!-- Модальное окно корзины -->
        <span id="modal_cart_close">X</span> <!-- Кнoпкa зaкрыть -->
        <!-- Сюда добавляется разметка из обработчика -->
        <button class="modal_cart_close_btn">Close</button>
    </div>
    <div id="overlay"></div> <!-- Пoдлoжкa -->

</body>

</html>
