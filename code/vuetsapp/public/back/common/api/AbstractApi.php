<?php
require_once __DIR__.'/AbstractApiCommand.php';
require_once __DIR__.'/../singleton/SingletonTrait.php';

abstract class AbstractApi {
    use SingletonTrait;
    abstract protected function prepare();
    public function run(AbstractApiCommand $command) : never {
        try {
            $this->prepare();
            echo $command->run();
        } catch (Throwable $e) {
            echo json_encode([ 'error' => $e->__toString() ]);
        }
        exit;
    }
}