<?php
namespace core\MVC;

use core;

abstract class Resource {
    protected $data;
    protected $db;
    protected $sql;
    protected $controller;

    public function __construct() {
        $globals = core\Globals::getInstance();
        $this->db = $globals->get('db');
    }

    public function run($action, $controller) {
        $this->controller = $controller;
        $this->$action();
    }

    protected function execSQL($params = null) {
        $ps = $this->db->prepare($this->sql);
        if (!is_null($params)) {
            // bindParam necesita una referencia, con "&" se evitan problemas de que a veces recibe un valor directamente y no lo acepta
            foreach ($params as $key => &$value) {
                $ps->bindParam($key, $value);
            }
        }

        $ps->execute();
        switch (substr($this->sql, 0, 6)) {
        case "SELECT":
            $i = 0;
            // limpiar data de queries anteriores
            $this->data = [];
            foreach ($ps->fetchAll(\PDO::FETCH_ASSOC) as $row) {
                foreach ($row as $key => $value) {
                    $this->data[$i][$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                }
                $i++;
            }
            if ($i == 0) {
                $this->data = [];
            }
            break;
        case "INSERT":
            $this->data = $this->db->lastInsertId();
            break;
        default:
            $this->data = [];
        }
    }

    protected function setData() {
        header('Content-Type: application/json; charset=utf-8');
        echo \json_encode($this->data);
    }

    protected function setError($httpStatus, $errorMessage) {
        http_response_code($httpStatus);
        header('Content-Type: application/json; charset=utf-8');
        echo \json_encode([
            "error" => $errorMessage
        ]);
    }
}
