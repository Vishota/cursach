<?php
    class DatabaseRequestResult {
        private int $rowCount;
        private int $columnCount;
        private array $response;
        function __construct(PDO $dbh, PDOStatement $sth, int $fetchMode = PDO::FETCH_ASSOC) {
            $this->rowCount = $sth->rowCount();
            $this->columnCount = $sth->columnCount();
            $this->response = $sth->fetchAll($fetchMode);
        }

        public function rowCount() : int {
            return $this->rowCount;
        }
        public function columnCount() : int {
            return $this->columnCount;
        }
        public function response() : array {
            return $this->response;
        }
    }