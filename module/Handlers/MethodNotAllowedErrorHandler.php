<?php  
 
namespace Slim\Handlers; 
 
use Psr\Log\LoggerInterface; 
 
 
class MethodNotAllowedErrorHandler  
{   
  protected $logger; 
   
  public function __construct(LoggerInterface $logger) 
  { 
    $this->logger = $logger; 
  } 
 
 
  public function __invoke($request, $response, $methods){ 
 
    $message = 'Method must be one of: '. $methods[0]; 
     
    $this->logger->critical($message); 
        
        $status = 405; 
      
        return $response->withJSON($message, $status); 
 
  } 
 
 
 
 
} 