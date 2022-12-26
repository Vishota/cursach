<?php
    require_once __DIR__.'/../../back/modules/accounts/UsersModule.php';
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';

    $return = [];

    //var_dump($_POST);
    
    if(!UsersModule::getInstance()->checkToken()) exit;
    #int $owner_id, string $title, string $description, int $price, array $features, array $pictures
    $return['id'] = AnnouncementsModule::getInstance()
        ->addAnnouncement($_COOKIE['id'], $_POST['title'], $_POST['description'], $_POST['price'], $_POST['features'], $_POST['pics']);
    echo json_encode($return);
    echo 0;