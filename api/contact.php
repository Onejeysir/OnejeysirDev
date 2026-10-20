<?php
// Option B : endpoint PHP (hébergement mutualisé avec PHP, ex. o2switch, Hostinger).
// Dépose ce fichier sur ton hébergeur, puis dans src/data/site.js :
//   contactConfig.formEndpoint = "https://VOTRE-DOMAINE/api/contact.php"
// Réponse 200 uniquement si mail() réussit : le site ne confirme jamais un envoi raté.

header('Content-Type: application/json; charset=utf-8');
$allowed = 'https://VOTRE-DOMAINE'; // origine autorisée
header("Access-Control-Allow-Origin: $allowed");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$TO = 'jeysonudalric150@gmail.com'; // ⚠️ adresse de réception
$data = json_decode(file_get_contents('php://input'), true) ?: [];
$clean = fn($k, $max) => trim(mb_substr(strip_tags((string)($data[$k] ?? '')), 0, $max));
$name = $clean('name', 120);
$email = filter_var($clean('email', 200), FILTER_VALIDATE_EMAIL);
$type = $clean('type', 60);
$budget = $clean('budget', 60);
$message = $clean('message', 3000);

if (mb_strlen($name) < 2 || !$email || $type === '' || mb_strlen($message) < 20) {
  http_response_code(422); echo json_encode(['ok' => false, 'error' => 'invalid']); exit;
}
$name = str_replace(["\r", "\n"], ' ', $name); // anti-injection d'en-têtes
$subject = "=?UTF-8?B?" . base64_encode("[Portfolio] $type · $name") . "?=";
$body = "Nom : $name\nE-mail : $email\nType : $type\nBudget : $budget\n\n$message\n";
$headers = "From: Portfolio ONEJEYSIR <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">\r\n"
         . "Reply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";

if (mail($TO, $subject, $body, $headers)) { echo json_encode(['ok' => true]); }
else { http_response_code(500); echo json_encode(['ok' => false, 'error' => 'mail']); }
