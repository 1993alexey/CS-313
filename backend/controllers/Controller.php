<?php
abstract class Controller {

    protected $data = array();
    protected $view = "";
    protected $head = array('title' => '', 'description' => '');

    abstract function process($params);

    public function renderView() {
        if ($this->view) {
            extract($this->data);
            require("views/" . $this->view . ".phtml");
        }
    }

    public function redirect($url) {
        header("Location: /$url");
        header("Connection: close");
        exit;
    }

    protected function notFound() {
        header("HTTP/1.1 404 Not Found");
        exit;
    }

    protected function badRequest($message = '') {
        header("HTTP/1.1 400 Bad Request");
        echo $message;
        exit;
    }

    protected function notAuthorized($message = '') {
        header("HTTP/1.1 401 Not Authorized");
        echo $message;
        exit;
    }

        protected function forbidden($message = '') {
        header("HTTP/1.1 403 Forbidden");
        echo $message;
        exit;
    }

    protected function noContent() {
        header("HTTP/1.1 204 No Content");
        exit;
    }
}

?>