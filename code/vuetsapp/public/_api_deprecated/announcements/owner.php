<?php
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';
    echo json_encode( ['owner' => AnnouncementsModule::getInstance()->getOwner($_POST['id'])] );
    