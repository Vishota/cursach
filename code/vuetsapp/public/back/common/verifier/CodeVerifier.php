<?php
    require_once __DIR__.'/VerifierInterface.php';

    abstract class CodeVerifier implements VerifierInterface {
        const CODE_LENGTH = 8;
        const CODE_SYMBOLS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';

        static function generateCode() {
            $code = '';
            for($i = 0; $i < self::CODE_LENGTH; $i++) {
                $code .= self::CODE_SYMBOLS[rand(0, strlen(self::CODE_SYMBOLS) - 1)];
            }
            return $code;
        }

        abstract protected function issueCode(string $requestor) : bool;
        abstract protected function checkCode(string $requestor, string $code) : bool;

        function requestVerification($requestor) : bool {
            return $this->issueCode($requestor);
        }
        function checkVerification($requestor, $verificator) : bool {
            return $this->checkCode($requestor, $verificator);
        }
    }