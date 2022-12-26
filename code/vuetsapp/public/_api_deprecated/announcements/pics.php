<?php
    require_once __DIR__.'/../../back/modules/announcements/AnnouncementsModule.php';
    echo json_encode( ['pics' => AnnouncementsModule::getInstance()->getPics($_POST['id'])] );
    