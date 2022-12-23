<?php
    $return = [];
    try {
        require_once __DIR__.'/../../../back/modules/accounts/UsersModule.php';
        require_once __DIR__.'/../../../back/main/CursachEmailVerifier.php';

        // $_POST['email'] = 'vishotax3@gmail.com';
        // $_POST['code'] = 'x6SRV6YL';
        
        $return['status'] = ['okay'];
        $verified = CursachEmailVerifier::getInstance()->checkVerification($_POST['email'], $_POST['code']);
        
        $return['code'] = $verified !== false;
        
        $return['status'] = true;
    }
    catch (Throwable $e) {
        $return['status'] = false;
        $return['thrown'] = $e->__toString();
    }
    echo json_encode($return);