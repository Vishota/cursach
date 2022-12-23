<?php
    $return = [];
    try {
        require_once __DIR__.'/../../../back/modules/accounts/UsersModule.php';
        require_once __DIR__.'/../../../back/main/CursachEmailVerifier.php';

        // $_POST['email'] = 'vishotax3@gmail.com';
        // $_POST['code'] = 'x6SRV6YL';

       // $_POST['username'] = 'vishota';
       // $_POST['password'] = 'password';
       // $_POST['email'] = '';
       // $_POST['code'] = '';

        $username = $_POST['username'];
        $password = $_POST['password'];
        $code = $_POST['code'];
        $email = $_POST['email'];
        
        if(! UsersModule::getInstance()->isUsernameAllowed($username)) exit;
        if(! UsersModule::getInstance()->isPasswordAllowed($password)) exit;

        if(! UsersModule::getInstance()->isEmailAvailable($email)) {
            $return['email'] = false;
            echo json_encode($return);
            exit;
        }
        if(! UsersModule::getInstance()->isUsernameAvailable($username)) {
            $return['username'] = false;
            echo json_encode($return);
            exit;
        }

        $verified = CursachEmailVerifier::getInstance()->checkVerification($email, $code);
        
        $return['code'] = $verified !== false;
        if(! $return['code']) {
            echo json_encode($return);
            exit;
        }
        
        $return['account'] = UsersModule::getInstance()->emailSignUp($username, $password, $email);

        if($return['account'] !== false) UsersModule::getInstance()->issueToken($return['account']);
        $return['status'] = true;
    }
    catch (Throwable $e) {
        $return['status'] = false;
        $return['thrown'] = $e->__toString();
    }
    echo json_encode($return);

    