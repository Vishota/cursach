<?php
    require_once __DIR__.'/../../back/modules/AnnouncementsModule.php';
    //echo json_encode( AnnouncementsModule::getInstance()->search('') );
    echo json_encode( AnnouncementsModule::getInstance()->search($_POST['query']) );
    