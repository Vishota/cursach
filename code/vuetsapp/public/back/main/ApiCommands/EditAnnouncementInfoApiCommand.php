<?php
require_once __DIR__.'/../../common/api/AbstractApiCommand.php';
class EditAnnouncementInfoApiCommand extends AbstractApiCommand {
    public function run() : string {
        return json_encode(['success'=>AnnouncementsModule::getInstance()
            ->editAnnouncement((int)$_POST['id'], $_POST['title'], $_POST['description'], (int)$_POST['price'], $_POST['features'], $_POST['pics'])]);
    }
}