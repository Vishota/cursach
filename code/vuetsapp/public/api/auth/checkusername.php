<?php
try {
    require_once __DIR__.'/../../back/modules/accounts/UsersModule.php';

    $return = [];

    $return['available'] = UsersModule::getInstance()->isUsernameAvailable($_POST['username']);
    $return['status'] = true;
}
catch (Throwable $e) {
    $return['status'] = false;
    $return['thrown'] = $e->__toString();
}
echo json_encode($return);