<?php

class Crypto
{
    private static $encryptKey = 'leandevinckey321';
    private static $iv = '9955663322115544';
    private static $blocksize = 16;
    public static function decrypt($data)
    {
        $text =  self::unpad(mcrypt_decrypt(MCRYPT_RIJNDAEL_128, 
            self::$encryptKey, 
            hex2bin($data),
            MCRYPT_MODE_CBC, self::$iv), self::$blocksize);
        
        return self::cleanEncoding($text);


    }
    public static function encrypt($data)
    {
        //don't use default php padding which is '\0'
        $pad = self::$blocksize - (strlen($data) % self::$blocksize);
        $data = $data . str_repeat(chr($pad), $pad);
        return bin2hex(mcrypt_encrypt(MCRYPT_RIJNDAEL_128,
            self::$encryptKey,
            $data, MCRYPT_MODE_CBC, self::$iv));


    }
    private static function unpad($str, $blocksize)
    {
        $len = mb_strlen($str);
        $pad = ord( $str[$len - 1] );
        if ($pad && $pad < $blocksize) {
            $pm = preg_match('/' . chr($pad) . '{' . $pad . '}$/', $str);
            if( $pm ) {
                return mb_substr($str, 0, $len - $pad);
            }
        }
        return $str;
    }


    public static function cleanEncoding($text)
    {
        
               //reject overly long 2 byte sequences, as well as characters above U+10000 and replace with ?
                $text = preg_replace('/[\x00-\x08\x10\x0B\x0C\x0E-\x19\x7F]'.
                 '|[\x00-\x7F][\x80-\xBF]+'.
                 '|([\xC0\xC1]|[\xF0-\xFF])[\x80-\xBF]*'.
                 '|[\xC2-\xDF]((?![\x80-\xBF])|[\x80-\xBF]{2,})'.
                 '|[\xE0-\xEF](([\x80-\xBF](?![\x80-\xBF]))|(?![\x80-\xBF]{2})|[\x80-\xBF]{3,})/S',
                 '', $text );
                 
                //reject overly long 3 byte sequences and UTF-16 surrogates and replace with ?
                return preg_replace('/\xE0[\x80-\x9F][\x80-\xBF]'.
                 '|\xED[\xA0-\xBF][\x80-\xBF]/S','', $text );


    }
}