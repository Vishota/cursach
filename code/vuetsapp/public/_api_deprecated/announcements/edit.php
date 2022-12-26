<?php
    require_once __DIR__.'/../../back/modules/accounts/UsersModule.php';
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';

    $return = [];
     
    if(!UsersModule::getInstance()->checkToken()) exit;
    $return['okay'] = AnnouncementsModule::getInstance()
        ->editAnnouncement($_POST['id'], $_POST['title'], $_POST['description'], (int)$_POST['price'], $_POST['features'], $_POST['pics']);
    echo json_encode($return);
    