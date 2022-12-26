<?php
require_once __DIR__.'/../_requireApi.php';
CursachApi::getInstance()->run(new EditAnnouncementInfoApiCommand());