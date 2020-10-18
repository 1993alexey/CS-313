<?php
require "services/dbConnect.php";

class AuthController extends Controller { 

    protected $controller;  
    private $db;

    public function process($params) {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        header('Content-Type: text/plain');
        $method = $params[0];
        $this->$db = get_db();
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($method === 'login')
                $this->login();
            else if ($method === 'logout')
                $this->logout();
            else 
                $this->notFound();
        }
    }

   private function login() {
        $username = file_get_contents('php://input');
        $statement = $this->$db->prepare("SELECT id, name from public.user WHERE name=?");
        $statement->bindParam(1, $username);
        $statement->execute();
        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$row) 
            $this->forbidden('User not found');

        header('Content-Type: application/json');
        $_SESSION["user"] = $row;
        echo json_encode($row);
   }

   private function logout() {
        session_destroy();
        $this->noContent();
   }
}
?>  