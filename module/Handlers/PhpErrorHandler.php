<?php 

namespace Slim\Handlers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;


class PhpErrorHandler 
{	
	protected $logger;
	
	public function __construct(LoggerInterface $logger)
	{
		$this->logger = $logger;
	}


	public function __invoke(Request $request, Response $response, $error){

	
		$this->logger->critical($error->getMessage());
       	
       	if($error->getCode() == 0){
       		$status = 500;
       	} else {
       		$status = $exception->getCode() ?: 500;
       	}
        
		$message =$error->getMessage();
        $message = str_replace("\\", " ", $message);


        return $response->withJSON($message, $status);

	}


}