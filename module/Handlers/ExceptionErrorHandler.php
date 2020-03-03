<?php 

namespace Slim\Handlers;

use Psr\Log\LoggerInterface;


class ExceptionErrorHandler
{	
	protected $logger;
	
	public function __construct(LoggerInterface $logger)
	{
		$this->logger = $logger;
	}


	public function __invoke( $request, $response, $exception){

		$message = $exception->getMessage();
		$message = str_replace("\\", " ", $message);
		$status = $exception->getCode() ?: 500;

		$app_log_error = strpos($message, 'app.log');
		$is_denied = strrpos($message, 'denied');

		if($app_log_error && $is_denied){

			return $response->withJSON($message, $status);
			
		} else {

			$this->logger->critical($message);
			return $response->withJSON($message, $status);


		}

	}


}

