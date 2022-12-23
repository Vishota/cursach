<?php
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';
    echo json_encode( ['description' => AnnouncementsModule::getInstance()->getDescription($_POST['id'])] );
    