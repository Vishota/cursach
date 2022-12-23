<?php
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';
    echo json_encode( ['price' => AnnouncementsModule::getInstance()->getPrice($_POST['id'])] );
    