<?php
class Assignment03Controller extends Controller { 

    protected $controller;  

    public function process($params) {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        header('Content-Type: application/json');
        $method = $params[0];
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ($method === 'getItems')
                $this->getItems();
            else if ($method === 'getCart')
                $this->getCart();
            else 
                $this->notFound();
        } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($method === 'saveCart')
                $this->saveCart();
            else if ($method === 'checkout')
                $this->checkout();
            else 
                $this->notFound();
        }
    }

    private function getItems() {
        echo file_get_contents("./data/assignment3-items.json");
    }

    private function saveCart() {
        $body = file_get_contents('php://input');
        $_SESSION["cart"] = $body;
    }

    private function getCart() {
        echo $_SESSION["cart"];
    }

    private function notFound() {
        header("HTTP/1.1 404 Not Found");
    }

    private function checkout() {
        $json = file_get_contents('php://input');
        $body = json_decode($json, true);
        $address1 = filter_var($body['addressLine1'], FILTER_SANITIZE_STRING);
        $address2 = filter_var($body['addressLine1'], FILTER_SANITIZE_STRING);
        $city = filter_var($body['city'], FILTER_SANITIZE_STRING);
        $state = filter_var($body['state'], FILTER_SANITIZE_STRING);
        $zipCode = $body['zipCode'];
        $country = filter_var($body['country'], FILTER_SANITIZE_STRING);

        if (empty($address1) || empty($city) || empty($state) || empty($zipCode) || empty($country)) {
            header("HTTP/1.1 400 Bad Request");
            return;
        }

        echo $_SESSION["cart"];
        $_SESSION["cart"] = json_encode([]);
    }
    
}
?>  