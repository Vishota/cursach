<?php
    require_once __DIR__.'/Database.php';

    abstract class Storage {
        protected Database $database;
        protected string $table;
        function __construct(Database $database, string $table) {
            $this->database = $database;
            $this->table = $table;
        }
    }