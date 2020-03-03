<?php  
 
namespace Slim\Handlers; 
 
use Psr\Http\Message\ServerRequestInterface as Request; 
use Psr\Http\Message\ResponseInterface as Response; 
use Psr\Log\LoggerInterface; 
 
 
class NotFoundErrorHandler  
{   
  protected $logger; 
   
  public function __construct(LoggerInterface $logger) 
  { 
    $this->logger = $logger; 
  } 
 
 
  public function __invoke(Request $request, Response $response){ 
 
    $message = "Page Not Found"; 
 
    $this->logger->critical($message); 
 
    $status = 404; 
 
    return $response->withJSON($message, $status); 
 
  } 
 
 
}