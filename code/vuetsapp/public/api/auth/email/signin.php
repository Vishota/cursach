<?php
require_once __DIR__.'/../../../back/modules/UsersModule.php';

$id = UsersModule::getInstance()->emailSignIn($_POST['email'], $_POST['password']);
echo json_encode( [ 'account' => $id ] );
if($id !== false) UsersModule::getInstance()->issueToken($id);