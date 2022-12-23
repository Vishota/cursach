<?php
try {
    require_once __DIR__.'/../../../back/modules/accounts/UsersModule.php';
    require_once __DIR__.'/../../../back/main/CursachEmailVerifier.php';

    $return = [];

    $return['available'] = UsersModule::getInstance()->isEmailAvailable($_POST['email']);
}
catch (Throwable $e) {
    $return['status'] = false;
    $return['thrown'] = $e->__toString();
}
echo json_encode($return);