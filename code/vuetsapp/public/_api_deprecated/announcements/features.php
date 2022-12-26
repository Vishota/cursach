<?php
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';
    echo json_encode( ['features' => AnnouncementsModule::getInstance()->getFeatures($_POST['id'])] );
    