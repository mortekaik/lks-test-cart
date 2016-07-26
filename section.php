<?php  function __autoload($class_name)
    {
        include_once($class_name . '.class.php');
    }
    $cart = new Cart;
    $q = $cart->getCart_small();
	 ?>

<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>ЛКС - лабораторное и промышленное оборудование</title>
    <link type="text/css" href="css/footer.css" rel="stylesheet">
    <link type="text/css" href="css/jquery-ui.min.css" rel="stylesheet">
    <script src="scripts/jquery-1.12.4.min.js"></script>
    <script src="scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" src="scripts/1.js"></script>
    <script type="text/javascript" src="scripts/cart.js"></script>
    <!--[if lt IE 9]>
      <script src="script/html5.js"></script>	 
     <![endif]-->
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
                    <div class="left-menu" id="cart">
                        <?php  echo $q['pageCart']; ?>
                    </div>
                    <div class="slider"></div>
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
                    <div class="vendors"></div>
                    <div class="news"><?php echo $q['cart']; ?></div>
                    <div class="vendors" id="del_all">
                        <button class="modal_cart_btn delete_all_btn">Обнулить корзину</button>
                    </div>
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
    <div id="top-link"><a href='#top-link'>Вверх</a></div>
    
    <div id="modal_cart"> <!-- Модальное окно корзины -->
        <!-- Кнoпкa зaкрыть -->
        <?php echo $q['last']; ?>
        <!-- Сюда добавляется разметка из обработчика -->
    </div>
    <div id="overlay"></div> <!-- Пoдлoжкa -->

</body>

</html>
