<?php
require_once __DIR__.'/../common/singleton/SingletonTrait.php';
require_once __DIR__.'/../main/CursachDatabase.php';

class UsersModule {
    const TOKEN_LENGTH = 30, TOKEN_SYMBOLS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';

    use SingletonTrait;

    function emailSignUp(string $username, string $password, string $email) { // : int|bool (available in php 8.0)
        CursachDatabase::getInstance()->beginTransaction();
        $accountInsert = CursachDatabase::getInstance()->request('INSERT INTO accounts (email, password_hash) VALUES (:email, :password_hash)',
            [ 'email' => $email, 'password_hash' => password_hash($password, null) ]);
        if($accountInsert->rowCount() === 0) {
            echo 321;
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
    function emailSignIn(string $email, string $password) {
        $hashRequestResult = CursachDatabase::getInstance()
            ->request('SELECT id, password_hash FROM accounts WHERE email = ?', [$email]);
        if($hashRequestResult->rowCount() == 0) return false;
        $hash = $hashRequestResult
            ->response()[0]['password_hash'];
        return (password_verify($password, $hash) ? $hashRequestResult->response()[0]['id'] : false);
    }
    
    function issueToken(int $id) {
        $code = '';
        for($i = 0; $i < self::TOKEN_LENGTH; $i++) {
            $code .= self::TOKEN_SYMBOLS[rand(0, strlen(self::TOKEN_SYMBOLS) - 1)];
        }
        setcookie('id', $id, ['expires' => time() + strtotime('+1 year'), 'path' => '/']);
        setcookie('token', $code, ['expires' => time() + strtotime('+1 year'), 'path' => '/']);
        CursachDatabase::getInstance()
            ->request('INSERT INTO tokens (account_id, token) VALUES (?,?)', [$id, $code]);
    }
    function checkToken() {
        if(!(isset($_COOKIE['id']) && $_COOKIE['token'])) return false;
        $id = $_COOKIE['id'];
        $token = $_COOKIE['token'];
        return CursachDatabase::getInstance()
            ->request('SELECT * FROM tokens WHERE account_id = ? && token = ?', [$id, $token])
            ->rowCount() !== 0;
    }

    function isEmailAvailable(string $email) {
        return CursachDatabase::getInstance()
            ->request('SELECT id FROM accounts WHERE email = ?', [$email])
            ->rowCount() === 0;
    }
    function isUsernameAvailable(string $username) {
        return CursachDatabase::getInstance()
            ->request('SELECT account_id FROM profiles WHERE username = ?', [$username])
            ->rowCount() === 0;
    }
    function isUsernameAllowed(string $username) {
        return preg_match('/[a-zA-Z0-9_]{4,16}/', $username) !== 0;
    }
    function isPasswordAllowed(string $username) {
        return preg_match('/[a-zA-Z0-9!@#$%^&*()_+=\-.]{8,32}/', $username) !== 0;
    }

    function getAccountInfo(int $id, array $columns) : array {
        $allowed = ['id', 'priveleges', 'status'];
        $columns = array_intersect($columns, $allowed);
        $columnsString = '';
        foreach ($columns as $column) {
            $columnsString .= $column.',';
        }
        $columnsString = substr($columnsString, 0, -1);
        return CursachDatabase::getInstance()
            ->request("SELECT $columnsString FROM accounts WHERE id=?", [$id])
            ->response()[0];
    }

    function getUsername(int $id) {
        return CursachDatabase::getInstance()
            ->request('SELECT username FROM profiles WHERE account_id = ?', [$id], PDO::FETCH_NUM)
            ->response()[0];
    }
    function getPicture(int $id) {
        return CursachDatabase::getInstance()
            ->request('SELECT picture FROM profiles WHERE account_id = ?', [$id], PDO::FETCH_NUM)
            ->response()[0];
    }
    function getMyId() {
        if($this->checkToken() == false) return false;
        return $_COOKIE['id'];
    }
    /**
     * out:
     *  string status / false if guest
     */
    function getMyStatus() {
        $id = $this->getMyId();
        if($id === false) return false;
        return $this->getAccountInfo($id, ['status'])['status'];
    }
    function getMyPriveleges() {
        $id = $this->getMyId();
        if($id === false) return false;
        return $this->getAccountInfo($id, ['priveleges'])['priveleges'];
    }
    /**
     * out:
     *  true if user has moderator or higher priveleges
     */
    function amIModerator() {
        $priveleges = $this->getMyPriveleges();
        return $this->getMyStatus === 'ACTIVE' && ($priveleges === 'MODERATOR' || $priveleges === 'ADMIN');
    }
}