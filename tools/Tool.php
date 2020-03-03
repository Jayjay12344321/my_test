<?php

use Namshi\JOSE\SimpleJWS;

Class Tool{

	public static function generateToken(){
			return md5(uniqid(rand(), true));
	}

	public function generateJWS ($user, $tokenId, $param = null){
     $issuedAt   = time();
     $notBefore  = $issuedAt + 10;             //Adding 10 seconds
     $expire     = $notBefore + 600;            // Adding 60 seconds
     $serverName = 'hotels'; // Retrieve the server name from config file
    
     /*
     * Create the token as an array
     */
     /*$data = [
      'iat'  => $issuedAt,         // Issued at: time when the token was generated
      'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
      'iss'  => $serverName,       // Issuer
      'nbf'  => $notBefore,        // Not before
      'exp'  => $expire,           // Expire
      'data' => $user,
      'type'  => $user['type'],
     ];*/

     $data = [
      'iat'  => $issuedAt,         // Issued at: time when the token was generated
      'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
      'iss'  => $serverName,       // Issuer
      'nbf'  => $notBefore,        // Not before
      'exp'  => $expire,           // Expire
      'data' => $user
     ];
    
      $jws = new SimpleJWS(array('alg' => 'RS256'));
      $jws->setPayload($data);

      if(!$jws){
        echo ["code" => "0001", "message" => "JWS Error : ".json_encode($data)];
      }
      
      $jws->sign(file_get_contents(__DIR__."/../key/private.key"), 'tests');
      
      $token = $jws->getTokenString();

      return $token;
  }

  public function select($database, $column, $from, $where, $body,$columns, $params = [], $group = "")
  {
      if($group){
        $data = $database->pdo->prepare("SELECT COUNT(*) FROM ( SELECT ".$column." ".$from." ".$group.") as groups");

      }else{
        $data = $database->pdo->prepare("SELECT COUNT(*) ".$from);
      }
      
      $data->execute($params);
            $total_records = $data->fetchAll(\PDO::FETCH_COLUMN);
           
      if(!isset($total_records[0])){
            //echo "SELECT COUNT(*) ".$from;exit;
            return ['error' => ['total records']];
      }else{
        $total_records = $total_records[0];
      }
            $start = $body['start'];
            $length = $body['length'];


      if($group){
        $data = $database->pdo->prepare("SELECT COUNT(*) FROM ( SELECT ".$column." ".$from." ".$where." ".$group.") as groups");

      }else{
        $data = $database->pdo->prepare("SELECT COUNT(*) ".$from." ".$where);
      }

      $data->execute($params);
      $total_filtered= $data->fetchAll(\PDO::FETCH_COLUMN);


      if(!isset($total_filtered[0])){
          return ['data' => []];
      }else{
        $total_filtered = $total_filtered[0];
      }
      

       $from .= " ". $where." " . $group .  " ORDER BY ".$columns[$body['order'][0]['column']]." ".strtoupper($body['order'][0]['dir'])." LIMIT".' '.$start.','.$length;
      $data = $database->pdo->prepare("SELECT " . $column ." ". $from);

      $data->execute($params);

      
      if($database->error()[2]){
        
        $result['message'] = $database->error()[2];

        return $result;

      }
      if($data){
        
            $json_data = array(
                  "draw"            => intval( $body['draw'] ), 
                  "recordsTotal"    => intval( $total_records ),
                  "recordsFiltered" => intval( $total_filtered ),
                  "data"            =>  $data->fetchAll(\PDO::FETCH_ASSOC) 
            );
      
        return $json_data;
            
      }
      else{
              return false;
      }
  }



}