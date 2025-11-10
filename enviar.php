<?php

$destinatario = "comercial.ifct@gmail.com"; 
$dominio_site = "ifctcontabilidade.com.br";
$assunto = "Nova Solicitação de Contato - Site Lucro Real";
$pagina_sucesso = "sucesso.html";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);
    $duvida = filter_input(INPUT_POST, 'duvida', FILTER_SANITIZE_STRING);

    // Checagem se todos os campos foram preenchidos
    if (empty($nome) || empty($telefone) || empty($duvida)) {
        header("Location: lucroreal.html?erro=campos_vazios");
        exit;
    }

    // ----------------------------------------------------
    // 3. MONTAGEM DO CORPO E CABEÇALHOS DO EMAIL
    // ----------------------------------------------------

    $corpo_email = "Você recebeu uma nova mensagem do formulário de contato do site.\n\n";
    $corpo_email .= "Detalhes do Contato:\n";
    $corpo_email .= "--------------------------------------------------------\n";
    $corpo_email .= "Nome: " . $nome . "\n";
    $corpo_email .= "Telefone (WhatsApp): " . $telefone . "\n";
    $corpo_email .= "Mensagem/Dúvida:\n" . $duvida . "\n";
    $corpo_email .= "--------------------------------------------------------\n";

    // Cabeçalhos (Headers)
    $headers = "From: " . $nome . " <noreply@".$dominio_site.">\r\n";
    $headers .= "Reply-To: noreply@".$dominio_site."\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // ----------------------------------------------------
    // 4. ENVIO E REDIRECIONAMENTO
    // ----------------------------------------------------

    if (mail($destinatario, $assunto, $corpo_email, $headers)) {
        // Sucesso: Redireciona para a página de agradecimento
        header("Location: " . $pagina_sucesso);
        exit;
    } else {
        // Falha: Redireciona de volta para a página inicial com mensagem de erro
        // É bom ter um alerta JavaScript ou mensagem na página inicial para informar o erro.
        header("Location: lucroreal.html?erro=falha_envio"); 
        exit;
    }

} else {
    // Se o arquivo for acessado diretamente sem POST
    header("Location: lucroreal.html");
    exit;
}?>