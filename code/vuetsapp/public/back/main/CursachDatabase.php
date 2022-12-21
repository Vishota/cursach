<?php
    require_once __DIR__ . '/../common/storage/SingleDatabase.php';
    
    final class CursachDatabase extends SingleDatabase {
        const DATABASE = 'cursach', USER = 'cursach_client', PASSWORD = 'php';
        function initConnectionData() {
            $this->setConnectionData(self::DATABASE, self::USER, self::PASSWORD);
        }
    }