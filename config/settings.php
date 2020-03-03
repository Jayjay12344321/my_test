<?php
date_default_timezone_set('UTC');
return [
    'settings' => [
        // Slim Settings
        'determineRouteBeforeAppMiddleware' => false,
        'displayErrorDetails' => true,

        // View settings
        'view' => [
            'template_path' => __DIR__ . '/../templates',
            'twig' => [
                'cache' => __DIR__ . '/../cache/twig',
                'debug' => true,
                'auto_reload' => true,
            ],
        ],

        // monolog settings
        'logger' => [
            'name' => 'app',
            'path' => __DIR__ . '/../log/app.log',
        ],
        // assent settings
        'languages' => [
            'path' => __DIR__ . '/../translation',
        ],
        /*'database' => [
            "database_type" => "mysql",
            "database_name" => "Cashier_Db",
            "server"        => "localhost",
            "username"      => "root",
            "password"      => "",
            "charset"       => "utf8"

        ],*/
        /*'database' => [
            "database_type" => "mysql",
            "database_name" => "mapping_credentials",
            "server"        => "52.19.114.198",
            "username"      => "root",
            "password"      => "test@123",
            "charset"       => "utf8"

        ],*/
        'database' => [
            "database_type" => "mysql",
            "database_name" => "gon",
            "server"        => "localhost",
            "username"      => "root",
            "password"      => "",
            "charset"       => "utf8"

        ],
        'scrape_currency' => [
            "url" => "http://www.xe.com/currencytables/?from=USD"
        ]
      
    ]
];
