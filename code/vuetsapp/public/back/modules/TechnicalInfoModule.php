<?php
    require_once __DIR__.'/../common/singleton/SingletonTrait.php';

    class TechnicalInfoModule {
        use SingletonTrait;

        function getNoreplyEmailInfo() {
            return [
                'email' => 'cursachverif@gmail.com',
                'host' => 'smtp.gmail.com',
                'password' => 'lyuxsieejktsplye',
                'port' => 465
            ];
        }
    }