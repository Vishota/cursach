<?php
    require_once __DIR__.'/DatabaseRequestResult.php';

    final class Database {
        private string $db_name, $db_user, $db_password;
        private PDO $dbh;
        function __construct(string $db_name, string $db_user, string $db_password) {
            $this->db_name = $db_name;
            $this->db_user = $db_user;
            $this->db_password = $db_password;
            $this->connect();
        }
        private function connect() {
            $this->dbh = new PDO("mysql:host=localhost;dbname=$this->db_name", $this->db_user, $this->db_password);
        }
        function request(string $query, array $params = [], int $fetch_statement = PDO::FETCH_ASSOC) {
            $sth = $this->dbh->prepare($query);
            $sth->execute($params);
            return new DatabaseRequestResult($this->dbh, $sth, $fetch_statement);
        }
    }