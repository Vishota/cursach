<?php
require_once __DIR__.'/../back/main/CursachApi.php';
spl_autoload_register(function ($class) {
    include_once __DIR__."/../back/main/ApiCommands/$class.php";
});