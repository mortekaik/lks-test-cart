<?php

class Router extends Database
{
    public function Router()
    {
        if (isset($_GET) && $_GET <> null) {
            $this->get = $_GET;
        }
        if (isset($_POST) && $_POST <> null) {
            $this->post = $_POST;
        }
        if (isset($_SESSION) && $_SESSION <> null) {
            $this->session = $_SESSION;
        }
        if (isset($_COOKIE) && $_COOKIE <> null) {
            $this->cookies = $_COOKIE;
        }
    }
}

?>