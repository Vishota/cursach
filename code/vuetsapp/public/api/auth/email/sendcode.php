<?php
    $return = [];
    try {
        require_once __DIR__.'/../../../back/modules/accounts/AccountsModule.php';
        require_once __DIR__.'/../../../back/main/CursachEmailVerifier.php';

        // $_POST['email'] = 'vishotax3@gmail.com';

        $return = [];
        $requested = CursachEmailVerifier::getInstance()->requestVerification($_POST['email']);
        
        $return['sent'] = $requested !== false;

        $return['status'] = true;
    }
    catch (Throwable $e) {
        $return['status'] = false;
    }
    echo json_encode($return);