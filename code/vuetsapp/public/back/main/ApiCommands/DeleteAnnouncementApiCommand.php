<?php
require_once __DIR__.'/../../common/api/AbstractApiCommand.php';
class DeleteAnnouncementApiCommand extends AbstractApiCommand {
    public function run() : string {
        $return = [];
        $return['result'] = AnnouncementsModule::getInstance()
            ->deleteAnnouncement($_POST['id']);
        return json_encode($return);
    }
}