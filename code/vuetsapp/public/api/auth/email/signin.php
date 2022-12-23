<?php
require_once __DIR__.'/../../../back/modules/accounts/AccountsModule.php';

$id = AccountsModule::getInstance()->emailSignIn($_POST['email'], $_POST['password']);
echo json_encode( [ 'account' => $id ] );
if($id !== false) AccountsModule::getInstance()->issueToken($id);