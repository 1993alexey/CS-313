<?php
class RouterController extends Controller { 

    protected $controller;  

    public function process($params) {
        $parsedUrl = $this->parseUrl($params[0]);
        array_shift($parsedUrl);  

        if (empty($parsedUrl[0]))
            $this->redirect('');

        $controllerClass = $this->dashesToCamel(array_shift($parsedUrl)) . 'Controller';

        if (file_exists('controllers/' . $controllerClass . '.php'))
            $this->controller = new $controllerClass;
        else
            $this->redirect('error');

        $this->controller->process($parsedUrl);
        // echo($controllerClass);
        // echo('<br />');
        // print_r($parsedUrl);    
    }

    private function parseUrl($url) {
        $parsedUrl = parse_url($url);
        $parsedUrl["path"] = ltrim($parsedUrl["path"], "/");
        $parsedUrl["path"] = trim($parsedUrl["path"]);
        $explodedUrl = explode("/", $parsedUrl["path"]);
        return $explodedUrl;
    }

    private function dashesToCamel($text) {
        $text = str_replace('-', ' ', $text);
        $text = ucwords($text);
        $text = str_replace(' ', '', $text);
        return $text;
    }

}
?>  