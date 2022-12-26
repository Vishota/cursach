<?php
require_once __DIR__.'/../../common/api/AbstractApiCommand.php';
class AddAnnouncementApiCommand extends AbstractApiCommand {
    public function run() : string {
        $return = [];
        $return['id'] = AnnouncementsModule::getInstance()
            ->addAnnouncement($_POST['title'], $_POST['description'], $_POST['price'], $_POST['features'], $_POST['pics']);
        return json_encode($return);
    }
}