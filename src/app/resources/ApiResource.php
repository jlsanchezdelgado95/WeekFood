<?php

use core\MVC\Resource as Resource;

class ApiResource extends Resource {
    public function errorAction() {
        $this->setError(400, 'Petición incorrecta');
    }
}