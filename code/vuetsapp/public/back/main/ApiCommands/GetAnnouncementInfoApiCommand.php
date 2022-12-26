<?php
require_once __DIR__.'/../../common/api/AbstractApiCommand.php';
class GetAnnouncementInfoApiCommand extends AbstractApiCommand {
    public function run() : string {
        return json_encode(AnnouncementsModule::getInstance()
            ->getInfo($_POST['id'], json_decode($_POST['info'])));
    }
}