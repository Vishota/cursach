<?php
    require_once __DIR__.'/../modules/technical_info/TechnicalInfoModule.php';
    require_once __DIR__.'/../common/sender/email/EmailSMTPSender.php';

    class CursachEmailSender extends EmailSMTPSender {
        /**
         * $senderEmail, $senderHost, $password;
         * protected int $SMTPPort;
         */
        function __init() {
            $info = TechnicalInfoModule::getInstance()->getNoreplyEmailInfo();
            $this->senderEmail = $info['email'];
            $this->senderHost = $info['host'];
            $this->password = $info['password'];
            $this->SMTPPort = $info['port'];

            parent::__init();
            $this->initMailer();
        }
    }

    (CursachEmailSender::getInstance()->send(
        [
            'recipient' => 'vishotax3@gmail.com',
            'subject' => 'subject',
            'message' => '
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #222; color: #fff; padding: 50px 0; font-size: 50px;">
                <tr>
                    <td align="center" style="background-color: #333; color: #09f; padding: 15px">123</td>
                </tr>
                <tr>
                    <td align="center" style="padding: 10px; font-size: 20px">Copy this code to the registration form</td>
                </tr>
            </table>
            ',
            'html'=>true
        ]
    ));