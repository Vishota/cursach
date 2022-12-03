<?php
    interface UsersStorageInterface {
        function signUp(string $login, string $password) : ?int;
        function signIn(string $login, string $password) : string;
        function checkPassword(string $login, string $password) : bool;
        function findByLogin(string $login) : ?int;
    }