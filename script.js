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
});