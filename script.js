document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a'); // Seleciona todos os links

    // Função para abrir o menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        // Opcional: Adicionar um estilo ao body para prevenir o scroll no mobile
        document.body.style.overflow = 'hidden'; 
    });

    // Função para fechar o menu (usada pelo X e ao clicar em um link)
    const closeMenu = () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura o scroll
    };

    // Fechar o menu ao clicar no X
    menuClose.addEventListener('click', closeMenu);

    // Fechar o menu ao clicar em um link (boa prática para navegação single-page)
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});