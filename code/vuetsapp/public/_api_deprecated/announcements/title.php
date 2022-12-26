<?php
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';
    echo json_encode( ['title' => AnnouncementsModule::getInstance()->getTitle($_POST['id'])] );
    