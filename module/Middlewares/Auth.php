<?php
namespace Module\Middlewares;

use Namshi\JOSE\SimpleJWS;
use Crypto;
use Codes;

class Auth{

		public function __construct(){

			
		}
		/**
		* Login middleware invokable class
		*
		* @param  \Psr\Http\Message\ServerRequestInterface $request  PSR7 request
		* @param  \Psr\Http\Message\ResponseInterface      $response PSR7 response
		* @param  callable                                 $next     Next middleware
		*
		* @return \Psr\Http\Message\ResponseInterface
		*/
		public function __invoke($request, $response, $next)
		{
			$userStatus = false;

			$token = false;	

			/* GET TOKEN */
			if ($request->hasHeader('AUTHORIZE')) {
				$token = $request->getHeader('AUTHORIZE')[0];
			}
			
			/* Process Authorization */

			if($token) {

					try {

						$jws = SimpleJWS::load($token);

						if ($jws->verify(file_get_contents(__DIR__."/../../key/public.key"), 'RS256')) {
								
								$payload = $jws->getPayload();
								
								$request  = $request->withAttribute('token',$payload);
								$request  = $request->withAttribute('userid',$payload['data']['user_id']);
								$request  = $request->withAttribute('user',$payload['data']);

								$response = $next($request, $response);

								return $response;
						
						}

					} catch (Exception $e) {

					}

			}


			$message = Codes::get(1012);
			
			return $response->withJSON([$message, 'token' => $token], 401);

			//return $response->write(json_encode(['message'=>'Unauthorized Actions','token'=>$token]))->withStatus(401);
		}

	}
