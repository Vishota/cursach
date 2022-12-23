<?php
    require_once __DIR__.'/../../back/modules/accounts/UsersModule.php';

    echo json_encode( [ 'username' => UsersModule::getInstance()->getUsername( $_POST['id'] ) ] );