<?php
abstract class AbstractApiCommand {
    abstract public function run() : string;
}