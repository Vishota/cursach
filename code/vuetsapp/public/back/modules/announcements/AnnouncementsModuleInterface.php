<?php
interface AnnouncementsModuleInterface {
    function getAnnouncement(int $id);
    function search(string $query);
} 