document.addEventListener('DOMContentLoaded', () => {
    // --- 1. FUNCIONALIDADE DO MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    const closeMenu = () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    menuToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    menuClose.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- 2. FUNCIONALIDADE DO CARROSSEL DE DEPOIMENTOS (SCROLLER) ---
    const scroller = document.querySelector('.depoimentos-scroller');

    if (scroller) {
        let animationFrameId;
        let lastTimestamp = 0;
        const speed = 0.03;

        let currentX = 0; 

        const scrollerContent = Array.from(scroller.children);
        // Clona os itens para criar o efeito de loop infinito
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            scroller.appendChild(duplicatedItem);
        });

        let isPaused = false;
        scroller.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        scroller.addEventListener('mouseleave', () => {
            isPaused = false;
            if (!animationFrameId) {
                lastTimestamp = 0;
                animationFrameId = requestAnimationFrame(animateScroll);
            }
        });

        function animateScroll(timestamp) {
            if (!lastTimestamp) {
                lastTimestamp = timestamp;
            }

            const elapsed = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            
            if (isPaused) {
                animationFrameId = requestAnimationFrame(animateScroll);
                return;
            }

            // Ponto onde o scroll reseta (metade do total de conteúdo)
            const resetPoint = scroller.scrollWidth / 2; 
            let newX = currentX - (speed * elapsed);
            if (newX <= -resetPoint) {
                newX += resetPoint; 
            }

            currentX = newX;
            scroller.style.transform = `translateX(${currentX}px)`;
            animationFrameId = requestAnimationFrame(animateScroll);
        }
        
        scroller.style.transition = 'none'; 
        scroller.style.transform = 'translateX(0px)';
        animationFrameId = requestAnimationFrame(animateScroll);
    }

    // --- 3. FUNCIONALIDADE DO FAQ (ACORDEÃO) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Fecha todos os itens abertos
            faqItems.forEach(i => {
                i.classList.remove('active');
            });

            // Se não estava ativo, abre o item clicado
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });


    // --- 4. VALIDAÇÃO E HABILITAÇÃO DO BOTÃO DO FORMULÁRIO DE CONTATO ---
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');

    if (form && submitButton) {
        // Seleciona todos os campos de entrada que têm o atributo 'required'
        const requiredInputs = form.querySelectorAll('[required]');

        // Função que verifica se todos os campos estão preenchidos
        const checkFormValidity = () => {
            let isFormValid = true;
            
            requiredInputs.forEach(input => {
                // Checa se o campo está vazio (o trim() remove espaços em branco)
                if (!input.value.trim()) {
                    isFormValid = false;
                }
            });
            
            // Habilita ou desabilita o botão
            submitButton.disabled = !isFormValid;
        };

        // Adiciona um listener para checar a validade a cada interação
        requiredInputs.forEach(input => {
            input.addEventListener('input', checkFormValidity);
        });

        // Garante que o estado inicial do botão esteja correto ao carregar a página
        checkFormValidity();
        
        // **IMPORTANTE:** Não há 'submit' listener com e.preventDefault(). 
        // O formulário será enviado de forma Padrão HTML para o 'enviar.php'
    }
});