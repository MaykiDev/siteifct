document.addEventListener('DOMContentLoaded', () => {
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

    const scroller = document.querySelector('.depoimentos-scroller');

    if (scroller) {
        let animationFrameId;
        let lastTimestamp = 0;
        const speed = 0.03;

        let currentX = 0; 

        const scrollerContent = Array.from(scroller.children);
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

    // --- FUNCIONALIDADE FAQ (ACORDEÃO) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Verifica se o item clicado já está ativo
            const wasActive = item.classList.contains('active');

            // Fecha todos os itens
            faqItems.forEach(i => {
                i.classList.remove('active');
            });

            // Se o item não estava ativo, abre-o
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // --- VALIDAÇÃO E HABILITAÇÃO DO BOTÃO DO FORMULÁRIO DE CONTATO ---
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');

    if (form && submitButton) {
        const requiredInputs = form.querySelectorAll('[required]');

        const checkFormValidity = () => {
            let isFormValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isFormValid = false;
                }
            });

            submitButton.disabled = !isFormValid;
        };

        requiredInputs.forEach(input => {

            input.addEventListener('input', checkFormValidity);
        });

        checkFormValidity();

        // --- COLETANDO DADOS NO ENVIO (FRONT-END) ---
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            if (submitButton.disabled) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // 1. Coletar os dados
            const formData = {
                nome: document.getElementById('nome').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                duvida: document.getElementById('duvida').value.trim()
            };

            console.log("Dados prontos para envio:", formData);
            

            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            form.reset();
            checkFormValidity();
        });
    }
});