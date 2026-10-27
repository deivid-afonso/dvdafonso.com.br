<?php
declare(strict_types=1);

function smtp_send(string $to, string $subject, string $body, string $from, string $fromName = '', string $replyTo = ''): bool
{
    $config = require __DIR__ . '/smtp-config.php';
    $host = $config['host'];
    $port = $config['port'];
    $user = $config['user'];
    $pass = $config['pass'];

    $socket = stream_socket_client(
        "ssl://{$host}:{$port}",
        $errno,
        $errstr,
        10,
        STREAM_CLIENT_CONNECT,
        stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]])
    );
    if (!$socket) return false;

    $read = function () use ($socket): string {
        $response = '';
        while ($line = fgets($socket, 512)) {
            $response .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $response;
    };

    $send = function (string $cmd) use ($socket, $read): string {
        fwrite($socket, $cmd . "\r\n");
        return $read();
    };

    $expect = function (string $cmd, string $code) use ($send): bool {
        return str_starts_with($send($cmd), $code);
    };

    $greeting = $read();
    if (!str_starts_with($greeting, '220')) { fclose($socket); return false; }

    if (!$expect("EHLO dvdafonso.com.br", '250')) { fclose($socket); return false; }
    if (!$expect("AUTH LOGIN", '334')) { fclose($socket); return false; }
    if (!$expect(base64_encode($user), '334')) { fclose($socket); return false; }
    if (!$expect(base64_encode($pass), '235')) { fclose($socket); return false; }
    if (!$expect("MAIL FROM:<{$user}>", '250')) { fclose($socket); return false; }
    if (!$expect("RCPT TO:<{$to}>", '250')) { fclose($socket); return false; }
    if (!$expect("DATA", '354')) { fclose($socket); return false; }

    $displayFrom = $fromName !== '' ? "=?UTF-8?B?" . base64_encode($fromName) . "?= <{$from}>" : $from;
    $headers = "From: {$displayFrom}\r\n";
    $headers .= "To: {$to}\r\n";
    if ($replyTo !== '') $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: base64\r\n";
    $headers .= "Date: " . date('r') . "\r\n";
    $headers .= "\r\n";
    $headers .= chunk_split(base64_encode($body));

    if (!$expect($headers . "\r\n.", '250')) { fclose($socket); return false; }

    $send("QUIT");
    fclose($socket);
    return true;
}
