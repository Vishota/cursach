<?php
    final class DatabaseRequestResult {
        private int $column_count;
        private int $row_count;
        private int $last_insert_id;
        private array $response;

        function __construct(PDO $dbh, PDOStatement $sth, int $fetch_mode) {
            $this->column_count = $sth->columnCount();
            $this->last_insert_id = $dbh->lastInsertId();
            $this->row_count = $sth->rowCount();
            $this->response = $sth->fetchAll($fetch_mode);
        }

        function rowCount() { return $this->row_count; }
        function columnCount()  { return $this->column_count; }
        function lastInsertId() { return $this->last_insert_id; }
        function response()     { return $this->response; }
    }