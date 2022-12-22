<?php
try {
    require_once __DIR__.'/../../../back/modules/accounts/AccountsModule.php';
    require_once __DIR__.'/../../../back/main/CursachEmailVerifier.php';

    $return = [];

    $return['available'] = AccountsModule::getInstance()->isEmailAvailable($_POST['email']);
}
catch (Throwable $e) {
    $return['status'] = false;
    $return['thrown'] = $e->__toString();
}
echo json_encode($return);