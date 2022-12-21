<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require_once __DIR__.'/../../../aside/mailer/src/Exception.php';
    require_once __DIR__.'/../../../aside/mailer/src/PHPMailer.php';
    require_once __DIR__.'/../../../aside/mailer/src/SMTP.php';

    require_once __DIR__ . '/../../singleton/SingletonTrait.php';
    require_once __DIR__ . '/../SenderInterface.php';
    require_once __DIR__ . '/../NotSentException.php';

    abstract class EmailSMTPSender implements SenderInterface {
        protected string $senderEmail, $senderHost, $password;
        protected int $SMTPPort;

        protected PHPMailer $mailer;

        use SingletonTrait;

        protected function __init() {
            $this->mailer = new PHPMailer();
        }
        protected function initMailer() {
            $this->mailer->isSMTP();
            $this->mailer->Host = $this->senderHost;
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = $this->senderEmail;
            $this->mailer->Password = $this->password;
            $this->mailer->SMTPSecure = 'ssl';
            $this->mailer->Port = 465;
            $this->mailer->setFrom($this->senderEmail);
        }
        /**
         * requires:
         *  recipient
         *  subject
         *  message
         *  html (bool)
         */
        public function send(array $info) {
            $this->mailer->addAddress($info['recipient']);
            $this->mailer->isHTML((isset($info['html']) ? $info['html'] : true));
            $this->mailer->Subject = $info['subject'];
            $this->mailer->Body = $info['message'];
            $result = $this->mailer->send();
            if($result == false) throw new NotSentException(gettype($this));
            return $result;
        }
    }
