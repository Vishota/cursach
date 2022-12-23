<?php
require_once __DIR__.'/../../common/singleton/SingletonTrait.php';
require_once __DIR__.'/../../main/CursachDatabase.php';

class AccountsModule {
    use SingletonTrait;

    function emailSignUp(string $username, string $password, string $email) { // : int|bool (available in php 8.0)
        
        CursachDatabase::getInstance()->beginTransaction();
        $accountInsert = CursachDatabase::getInstance()->request('INSERT INTO accounts (email, password_hash) VALUES (:email, :password_hash)',
            [ 'email' => $email, 'password_hash' => password_hash($password, null) ]);
        if($accountInsert->rowCount() === 0) {
            CursachDatabase::getInstance()->rollBack();
            return false;
        }
        $id = $accountInsert->lastInsertId();
        $profileInsert = CursachDatabase::getInstance()->request('INSERT INTO profiles (account_id, username) VALUES (:account_id, :username)',
            [ 'account_id' => $id, 'username' => $username ]);
        if($profileInsert->rowCount() === 0) {
            CursachDatabase::getInstance()->rollBack();
            return false;
        }
        
        CursachDatabase::getInstance()->commit();
        return $id;
    }

    function isEmailAvailable(string $email) {
        return (CursachDatabase::getInstance()->request('SELECT id FROM accounts WHERE email = ?', [$email])->rowCount() === 0);
    }
    function isUsernameAvailable(string $username) {
        return (CursachDatabase::getInstance()->request('SELECT account_id FROM profiles WHERE username = ?', [$username])->rowCount() === 0);
    }
    function isUsernameAllowed(string $username) {
        return preg_match('/[a-zA-Z0-9_]{4,16}/', $username) !== 0;
    }
    function isPasswordAllowed(string $username) {
        return preg_match('/[a-zA-Z0-9!@#$%^&*()_+=\-.]{8,32}/', $username) !== 0;
    }
}