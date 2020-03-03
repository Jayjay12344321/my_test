<?php

namespace Module\Helpers;

Class Curl{

	public function getCurrencyScrapedResult($url){

		$curl = curl_init();
		
		curl_setopt_array($curl, array(
		  CURLOPT_URL => $url,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "cache-control: no-cache",
		    "postman-token: db764eaf-c889-0eef-b17f-ddb627a9bd6f"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  echo "cURL Error #:" . $err;
		} else {
			
		$response = preg_replace('/<!--(.*)-->/Uis', '', $response); 
		preg_match('#<table[^>]*>(.+?)</table>#is', $response, $matches);
		
		
		foreach ($matches as &$match) {
		    $match = $match;
		    
		}
		$tbody = explode('<tbody>', $match);
		$val = $tbody[1];
		$result = [$val][0];
		$code = [];
		$tr = explode('<tr>', $result);
		foreach ($tr as $key => $value) {
			$td = explode('<td', $value);
			if(isset($td[2])){
				$link = '<a>'.$td[1].'</a>';
				$units = '<td class=ICTRate'.$td[3].'</td>';
				$currency_name = '<td>'.$td[2].'</td>';
				$removetag = strip_tags('<b'.$link);	
				$removeclass = strip_tags($units);	
				$removename = strip_tags('<b'.$currency_name);	
				$code['code'] = rtrim($removetag, "</td>");
				$code['name'] = rtrim($removename, "</td>");
				$code['units'] = rtrim($removeclass, "</td>");
				$code['usd'] = rtrim($removeclass, "</td>");
 				$results[] = $code;
			}


		}

	}

	return json_decode(json_encode($results), true);

	}



	public function get($url){

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => $url,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "cache-control: no-cache",
		    "content-type: application/json"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  echo "cURL Error #:" . $err;exit;
		}


	    return json_decode($response,true);

	}


	public function post($url,$data){

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => $url,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 90,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => json_encode($data),
		  CURLOPT_HTTPHEADER => array(
		    "cache-control: no-cache",
		    "content-type: application/json"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  echo "cURL Error #:" . $err;exit;
		}


	    return json_decode($response,true);

	}	
}