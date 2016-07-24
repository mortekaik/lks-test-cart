<?php

class Cart extends Router
{
    private $userid;
    public $cart = array('productid' => array(), 'num' => array());

    public function getCart_small()
    {
        if (count($this->cart['productid']) > 0) {
            $array_small['id'] = explode(',', 'product_' . implode(',product_', $this->cart['productid']));
            $array_small['cart'] = '<ul class="cart-list">';
            foreach ($this->cart['productid'] as $key => $value) {
                $array_small['cart'] .= '<li class="cart-list-item"><a href="#" data-id="' . $value . '">Товар (id: ' . $value . ')  - ' .
                    $this->cart['num'][$key] . ' шт.</a><span class="spinner-wrap"><a class="spin-button spin-down" href="#"><span class="spin-icon spin-icon-minus">
                    -</span></a><input class="spin-input" name="spin-input" value="' . $this->cart['num'][$key] .
                    '" type="text"><a class="spin-button spin-up" href="#"><span class="spin-icon spin-icon-plus">+</span></a></span></li>';
            }
            $array_small['cart'] .= '</ul>';
            $last_key = max(array_keys($this->cart['productid']));
            $array_small['last'] = '<span id="modal_cart_close">X</span><a href="#" data-id="' . $this->cart['productid'][$last_key] . '">Товар (id: <span id="spin-id">' .
                $this->cart['productid'][$last_key] . '</span>)  - ' . $this->cart['num'][$last_key] . ' шт.</a><span class="spinner-wrap"><a class="spin-button spin-down" href="#">
                <span class="spin-icon spin-icon-minus">-</span></a> ' . $this->cart['num'][$last_key] .
                ' <a class="spin-button spin-up" href="#"><span class="spin-icon spin-icon-plus">+</span></a></span><button class="modal_cart_btn close_btn">Продолжить покупки</button>';

            if (isset($this->post['post']) && $this->post['post'] == 'add_cart' && ctype_digit($this->post['productid']) && ctype_digit($this->post['num'])) {
                $array_small['div'] = 'В корзину добавлен товар (id: ' . $this->post['productid'] . ')  - ' . $this->post['num'] . ' шт.';
            }
            $array_small['pageCart'] = '<span class="page-cart">Корзина: ' . array_sum($this->cart['num']) . ' шт.</span>';
        } else {
            $array_small['pageCart'] = '<span class="page-cart_empty">Корзина пуста</span>';
        }
        return $array_small;
    }

    public function check_product($a)
    {
        if (isset($this->cart['productid']) && in_array($a, $this->cart['productid'])) {
            echo 'btn-added';
        } else {
            echo 'button';
        }
    }

    public function getCart_small_json()
    {
        return json_encode($this->getCart_small(), JSON_UNESCAPED_UNICODE);
    }

    public function Cart()
    {
        $this->Router();
        // $this->post['post'] = 'del_cart_all';
        if (isset($this->cookies['user']) && ctype_digit($this->cookies['user'])) {
            $this->userid = $this->cookies['user'];
            setcookie("user", $this->userid, time() + 2700000);
            $this->DB_sel();
        } else {
            $this->DB_add();
            setcookie("user", $this->userid, time() + 2700000);
        }

        if (isset($this->post['post']) && $this->post['post'] == 'add_cart' && ctype_digit($this->post['productid']) && ctype_digit($this->post['num'])) {
            $find_product = array_keys($this->cart['productid'], $this->post['productid']);
            if (count($find_product) > 0) {
                $this->cart['num'][$find_product[0]] = $this->cart['num'][$find_product[0]] + $this->post['num'];
                $this->DB_update();
            } else {
                $this->cart['productid'][] = $this->post['productid'];
                $this->cart['num'][] = $this->post['num'];
                $this->DB_update();
            }
        }

        if (isset($this->post['post']) && $this->post['post'] == 'product_up' && ctype_digit($this->post['productid'])) {
            $find_product = array_keys($this->cart['productid'], $this->post['productid']);
            if (count($find_product) > 0) {
                ++$this->cart['num'][$find_product[0]];
                $this->DB_update();
            }
        }

        if (isset($this->post['post']) && $this->post['post'] == 'product_down' && ctype_digit($this->post['productid'])) {
            $find_product = array_keys($this->cart['productid'], $this->post['productid']);
            if (count($find_product) > 0) {
                if($this->cart['num'][$find_product[0]] > 1)
                {
                    --$this->cart['num'][$find_product[0]];
                }
                $this->DB_update();
            }
        }

        if (isset($this->post['post']) && $this->post['post'] == 'del_cart' && ctype_digit($this->post['productid'])) {
            $find_product = array_keys($this->cart['productid'], $this->post['productid']);
            if (count($find_product) > 0) {
                unset($this->cart['productid'][$find_product[0]]);
                unset($this->cart['num'][$find_product[0]]);
                $this->DB_update();
            }
        }
        if (isset($this->post['post']) && $this->post['post'] == 'del_cart_all') {
            unset($this->cart['productid']);
            unset($this->cart['num']);
            $result = $this->db_select('UPDATE cart SET cart=? WHERE ID=?', array('', $this->userid));
        }
    }

    private function DB_sel()
    {
        $result = $this->db_select('SELECT cart, ID FROM cart WHERE ID=?', array($this->userid));
        if ($result[0]['cart'] <> null) {
            $this->cart = unserialize($result[0]['cart']);
        }
        if ($result[0]['ID'] == null) {
            $this->db_exec('INSERT INTO cart (ID) VALUES (?)', array($this->userid));
        }
    }

    private function DB_add()
    {
        $result = $this->db_exec('INSERT INTO cart () VALUES ()', array());
        $this->userid = $result;
    }

    private function DB_update()
    {
        $result = $this->db_select('UPDATE cart SET cart=? WHERE ID=?', array(serialize($this->cart), $this->userid));
    }
}

?>
