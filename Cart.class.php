<?php

class Cart extends Router
{
    private $userid;
    private $cart = array('productid' => array(), 'num' => array());

    public function getCart_small()
    {
        $delimiter = '№№№1';

        if (count($this->cart['productid']) > 0) {
            $small .= implode(',', $this->cart['productid']) . $delimiter;
            $small .= '<ul class="main-menu">';
            foreach ($this->cart['productid'] as $key => $value) {
                $small .= '<li class="empty-cart"><a href="#">Товар (id: ' . $value . ')  - ' . $this->cart['num'][$key] . ' шт.</a></li>';
            }
            $small .= '</ul>';
            $small .= $delimiter;
            if (isset($this->post['post']) && $this->post['post'] == 'add_cart' && ctype_digit($this->post['productid']) && ctype_digit($this->post['num'])) {
                $small .= 'В корзину добавлен товар (id: ' . $this->post['productid'] . ')  - ' . $this->post['num'] . ' шт.';
            }
            $small .= $delimiter.'Корзина: '.array_sum($this->cart['num']).' шт.';
        }
        else
        {
            $small .= $delimiter.'<span>Корзина пуста</span>';
        }
        return $small;
    }

    public function Cart()
    {
        $this->Router();
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
        if (isset($this->post['post']) && $this->post['post'] == 'del_cart' && ctype_digit($this->post['productid'])) {
            $find_product = array_keys($this->cart['productid'], $this->post['productid']);
            if (count($find_product) > 0) {
                unset($this->cart['productid'][$find_product[0]]);
                unset($this->cart['num'][$find_product[0]]);
                $this->DB_update();
            }
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