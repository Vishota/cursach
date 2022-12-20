<?php
    require_once __DIR__.'/DatabaseRequestResult.php';

    final class Database {
        private PDO $dbh;
        private string $database, $user, $password, $host;
        function __construct(string $database, string $user, string $password, string $host = 'localhost') {
            $this->database = $database;
            $this->user = $user;
            $this->password = $password;
            $this->host = $host;
            $this->connect();
        }
        function connect() {
            $this->dbh = new PDO('mysql:dbname=' . $this->database . ';host=' . $this->host, $this->user, $this->password);
        }
        function request(string $request, array $params = []) {
            $sth = $this->dbh->prepare($request);
            $sth->execute($params);
            return new DatabaseRequestResult($this->dbh, $sth);
        }
    }