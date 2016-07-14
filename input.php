<?php

function __autoload($class_name)
{
    include_once($class_name . '.class.php');
}

$cart = new Cart;
echo $cart->getCart_small();

?>