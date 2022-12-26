<?php
    require_once __DIR__.'/../modules/TechnicalInfoModule.php';
    require_once __DIR__.'/../common/sender/email/EmailSMTPSender.php';

    final class CursachEmailSender extends EmailSMTPSender {
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

    