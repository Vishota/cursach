<?php
    require_once __DIR__.'/Database.php';
    require_once __DIR__.'/../singleton/SingletonTrait.php';

    abstract class SingleDatabase extends Database {
        use SingletonTrait;
        // $database, $user, $password, $host must be overriden
        protected function __init() {
            $this->initConnectionData();
            $this->connect();
        }
        abstract function initConnectionData();
        // child class must define __init() method where setConnectionData() is used
    }