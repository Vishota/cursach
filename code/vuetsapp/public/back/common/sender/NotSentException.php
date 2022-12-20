<?php
class NotSentException extends Exception {
    function __construct(string $message) {
        parent::__construct('[NotSentException] ' . $message);
    }
}