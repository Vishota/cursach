<?php

use UsersStorage as GlobalUsersStorage;

    require_once __DIR__.'/../../common/Storage/Database.php';
    require_once __DIR__.'/../../common/Storage/Storage.php';
    require_once __DIR__.'/UsersStorageInterface.php';
    
    final class UsersStorage extends Storage implements UsersStorageInterface {
        function signUp(string $login, string $password) : ?int {
            if($this->findByLogin($login) !== null) return null;
            $request_result = $this->database->request("INSERT INTO $this->table (login, password_hash) VALUES (?, ?)", [$login, password_hash($password, null)]);
            if($request_result->rowCount() !== 1) return null;
            return $request_result->response()[0]['id'];
        }
        function signIn(string $login, string $password): string {
            
        }
        function checkPassword(string $login, string $password) : bool {
            $request_result = $this->database->request("SELECT id, password_hash FROM $this->table WHERE login=id");
            if($request_result->rowCount() === 0) return false;
            if(password_verify($password, $request_result->response()[0]['password_hash'])) return true;
            return false;
        }
        function findByLogin(string $login) : ?int {
            $response = $this->database->request('SELECT id FROM users WHERE login=?', [$login]);
            if($response->rowCount() != 0) {
                return $response->response()[0]['id'];
            }
            return null;
        }
    }
