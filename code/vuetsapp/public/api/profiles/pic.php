<?php
    require_once __DIR__.'/../../back/modules/UsersModule.php';

    echo json_encode( UsersModule::getInstance()->getPicture($_POST['id']) );