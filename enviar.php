<?php

// ----------------------------------------------------------------------
// 1. CONFIGURAÇÃO (AJUSTE APENAS ESTAS DUAS LINHAS)
// ----------------------------------------------------------------------
$email_destino = "SEU_EMAIL_AQUI@ifctcontabilidade.com.br"; // <-- Seu e-mail de recebimento
$dominio_site = "ifctcontabilidade.com.br"; // <-- Seu domínio para o cabeçalho 'From'
// ----------------------------------------------------------------------


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // ----------------------------------------------------------------------
    // 2. VERIFICAÇÃO DE SEGURANÇA ANTIBOT (HONEYPOT)
    // ----------------------------------------------------------------------
    // Se o campo hp_field (escondido) foi preenchido, é um bot.
    // Redireciona para sucesso.html para não levantar suspeitas no bot, 
    // mas não envia o e-mail.
    if (isset($_POST['hp_field']) && !empty($_POST['hp_field'])) {
        header("Location: sucesso.html");
        exit;
    }


    // ----------------------------------------------------------------------
    // 3. SANITIZAÇÃO RÍGIDA DOS DADOS (XSS e Injeção de Cabeçalho)
    // ----------------------------------------------------------------------

    // a) Sanitização de Nome e Telefone (Para cabeçalhos de e-mail)
    // Usamos FILTER_SANITIZE_STRING e removemos quebras de linha que 
    // possibilitam o Email Header Injection.
    $nome_bruto = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $telefone_bruto = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);

    $nome = str_replace(array("\n", "\r", "%0a", "%0d"), '', $nome_bruto);
    $telefone = str_replace(array("\n", "\r", "%0a", "%0d"), '', $telefone_bruto);

    // b) Sanitização da Dúvida (Contra XSS no corpo da mensagem)
    // FILTER_SANITIZE_FULL_SPECIAL_CHARS converte <, > e outros caracteres 
    // em entidades HTML, neutralizando qualquer tentativa de injeção de script.
    $duvida = filter_input(INPUT_POST, 'duvida', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    // ----------------------------------------------------------------------
    // 4. VALIDAÇÃO BÁSICA
    // ----------------------------------------------------------------------
    if (empty($nome) || empty($telefone) || empty($duvida)) {
        // Redireciona de volta se algum campo essencial estiver vazio (apesar da validação JS)
        header("Location: index.html?erro=campos_vazios");
        exit;
    }


    // ----------------------------------------------------------------------
    // 5. CONSTRUÇÃO E ENVIO DO E-MAIL
    // ----------------------------------------------------------------------
    $assunto = "Nova Proposta de Lucro Real - {$nome}";

    $corpo_mensagem = "Nova Mensagem do Site IFCT Contabilidade:\n\n";
    $corpo_mensagem .= "Nome: {$nome}\n";
    $corpo_mensagem .= "Telefone: {$telefone}\n\n";
    $corpo_mensagem .= "Dúvida/Mensagem:\n" . $duvida;

    // Cabeçalhos (Headers) do E-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";
    // O remetente é o domínio do site para evitar que o servidor da Hostinger marque como SPAM
    $headers .= "From: IFCT Contabilidade <noreply@{$dominio_site}>\r\n";
    // Resposta será enviada para o remetente (para facilitar o reply)
    $headers .= "Reply-To: {$nome} <noreply@{$dominio_site}>\r\n"; 

    // Envio
    $envio_sucesso = mail($email_destino, $assunto, $corpo_mensagem, $headers);


    // ----------------------------------------------------------------------
    // 6. REDIRECIONAMENTO FINAL
    // ----------------------------------------------------------------------

    // Independente do sucesso do mail(), redirecionamos para sucesso.html 
    // para não expor erros do servidor ao usuário.
    header("Location: sucesso.html");
    exit;

} else {
    // Acesso direto ao arquivo PHP sem POST: redireciona para a home
    header("Location: index.html");
    exit;
}

?>