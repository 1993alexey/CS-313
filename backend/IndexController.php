<?php 
    // mb_internal_encoding("UTF-8");

    function autoloadFunction($class)
    {   
        // Ends with a string "Controller"?
        if (preg_match('/Controller$/', $class)) 
            require("controllers/" . $class . ".php");
        else
            require("models/" . $class . ".php");
    }       

    spl_autoload_register("autoloadFunction");

    $router = new RouterController();
    $router->process(array($_SERVER['REQUEST_URI']));
?>