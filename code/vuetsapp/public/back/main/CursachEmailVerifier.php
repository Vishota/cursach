<?php
    require_once __DIR__ . '/../common/verifier/CodeVerifier.php';
    require_once __DIR__ . '/../common/singleton/SingletonTrait.php';

    require_once __DIR__ . '/CursachEmailSender.php';
    require_once __DIR__ . '/CursachDatabase.php';

    final class CursachEmailVerifier extends CodeVerifier {
        use SingletonTrait;

        protected function issueCode(string $email) : bool {
            $code = CodeVerifier::generateCode();

            $sent = CursachEmailSender::getInstance()->send([
                'recipient' => $email,
                'subject' => 'Cursach Sign Up verification',
                'message' => '<table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#222;color:#fff;padding:50px 0;font-size:50px">
                <tbody><tr>
                    <td align="center" style="background-color:#333;color:#09f;padding:15px">' . $code . '</td>
                </tr>
                <tr>
                    <td align="center" style="padding:10px;font-size:20px">Copy this code to the registration form</td>
                </tr>
                <tr>
                    <td align="center" style="padding:10px;font-size:10px;color: #999;">All previously sent codes are invalid now</td>
                </tr>
            </tbody></table>'
            ]);
            
            if($sent === false) {
                return false;
            }

            CursachDatabase::getInstance()->request("INSERT INTO `accounts_verify_codes` (`identifier`, `code`, `type`) VALUES (:email, :code, 'email')
            ON DUPLICATE KEY UPDATE `code` = :code", ['email' => $email, 'code' => $code])->rowCount() === 0;

            return true;
        }

        protected function checkCode(string $email, string $code) : bool {
            return CursachDatabase::getInstance()->request('SELECT code FROM accounts_verify_codes WHERE identifier = :email', [ 'email' => $email ])->response()[0]['code'] === $code;
        }
    }
