<?php
    require_once "../classes/Database.php";

    $database = new Database('cursach', 'cursach_client', 'php');
    $res = $database->request("SELECT * FROM accounts");
    var_dump($res->rowCount());
    var_dump($res->columnCount());
    var_dump($res->response());