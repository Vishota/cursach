<?php
require_once __DIR__.'/../common/api/AbstractApi.php';
require_once __DIR__.'/../common/api/AbstractApiCommand.php';

final class CursachApi extends AbstractApi {
    protected function prepare() {
        error_reporting(E_ERROR | E_PARSE);
        spl_autoload_register(function ($class) {
            include_once __DIR__."/../modules/$class.php";
        });
    }
}