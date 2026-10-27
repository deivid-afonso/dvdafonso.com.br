<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Método não permitido.']);
    exit;
}

if (!empty($_POST['website'] ?? '')) {
    http_response_code(400);
    echo json_encode(['message' => 'Solicitação inválida.']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || mb_strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    http_response_code(422);
    echo json_encode(['message' => 'Preencha nome, e-mail válido e uma mensagem de 10 a 5000 caracteres.']);
    exit;
}

$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);
$subject = 'Novo contato pelo site - ' . $safeName;
$body = "Nome: {$safeName}\nE-mail: {$safeEmail}\n\nMensagem:\n{$message}";
$headers = [
    'From: site@dvdafonso.com.br',
    'Reply-To: ' . $safeEmail,
    'Content-Type: text/plain; charset=UTF-8'
];

$sentToOwner = mail('contato@dvdafonso.com.br', $subject, $body, implode("\r\n", $headers));
if (!$sentToOwner) {
    http_response_code(500);
    echo json_encode(['message' => 'O servidor não conseguiu enviar a mensagem.']);
    exit;
}

$replySubject = 'Recebi sua mensagem — Deivid Afonso';
$reply = "Olá, {$safeName}!\n\nObrigado por escrever pelo meu site. Recebi sua mensagem e vou analisá-la com atenção. Retornarei assim que possível pelo e-mail informado.\n\nEnquanto isso, você também pode me encontrar no LinkedIn:\nhttps://www.linkedin.com/in/deivid-da-silva-afonso-dev/\n\nAbraços,\nDeivid Afonso\nEngenheiro Backend Sênior";
$replyHeaders = [
    'From: Deivid Afonso <contato@dvdafonso.com.br>',
    'Content-Type: text/plain; charset=UTF-8'
];
mail($safeEmail, $replySubject, $reply, implode("\r\n", $replyHeaders));

echo json_encode(['message' => 'Mensagem enviada com sucesso.']);
