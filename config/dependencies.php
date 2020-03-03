<?php
// DIC configuration

use Medoo\Medoo;

require __DIR__ . '/../module/Handlers/PhpErrorHandler.php';
require __DIR__ . '/../module/Handlers/ExceptionErrorHandler.php'; 
require __DIR__ . '/../module/Handlers/MethodNotAllowedErrorHandler.php'; 
require __DIR__ . '/../module/Handlers/NotFoundErrorHandler.php'; 

$container = $app->getContainer();



// -----------------------------------------------------------------------------
// Service providers
// -----------------------------------------------------------------------------

// Twig
$container['view'] = function ($c) {
    $settings = $c->get('settings');
    $view = new \Slim\Views\Twig($settings['view']['template_path'], $settings['view']['twig']);

    // Add extensions
    $view->addExtension(new Slim\Views\TwigExtension($c->get('router'), $c->get('request')->getUri()));
    $view->addExtension(new Twig_Extension_Debug());

    return $view;
};

// Twig for Email
$container['email'] = function ($c) {
     $loader    = new \Twig_Loader_Filesystem('templates/email');
     return new \Twig_Environment($loader);
};

// Flash messages
$container['flash'] = function ($c) {
    return new \Slim\Flash\Messages;
};


$container['validator'] = function ($c) {
    return new \GUMP;
};

// -----------------------------------------------------------------------------
// Service factories
// -----------------------------------------------------------------------------

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings');
    $logger = new \Monolog\Logger($settings['logger']['name']);
    $logger->pushProcessor(new \Monolog\Processor\UidProcessor());
    $logger->pushHandler(new \Monolog\Handler\StreamHandler($settings['logger']['path'], \Monolog\Logger::DEBUG));
    return $logger;
};


$container["errorHandler"] = function ($c) {
    return new \Slim\Handlers\ExceptionErrorHandler($c["logger"]);

};

$container["phpErrorHandler"] = function ($c) {
    return new \Slim\Handlers\PhpErrorHandler($c["logger"]);
};


$container["notAllowedHandler"] = function ($c) { 
    return new \Slim\Handlers\MethodNotAllowedErrorHandler($c["logger"]); 
}; 
 
 
$container["notFoundHandler"] = function ($c) { 
    return new \Slim\Handlers\NotFoundErrorHandler($c["logger"]); 
}; 




// -----------------------------------------------------------------------------
// Database Setting
// -----------------------------------------------------------------------------
$container['database'] = function ($c) {
    $settings = $c->get('settings');
    if(!isset($_GLOBAL['database'])){
        $_GLOBAL['database'] = new medoo($settings['database']);  
    }  
    return $_GLOBAL['database'];
};


$container['currency_url'] =  function ($c) {
    $settings = $c->get('settings');
    return $settings['scrape_currency']['url'];
};

$container['pdf'] = function ($c) {
    return new \mPDF('utf-8','A4','','','5','5','5','5');
};


Container::set($container);

