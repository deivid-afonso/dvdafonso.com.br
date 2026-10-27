<?php
declare(strict_types=1);

session_set_cookie_params(['samesite' => 'Strict', 'httponly' => true, 'secure' => true]);
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
