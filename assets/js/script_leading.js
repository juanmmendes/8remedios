// Efeito: aparecer elementos com fade ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const fadeInElements = document.querySelectorAll('.fade-in-start');
    fadeInElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 300 * index);
    });
});

// Efeito: revelar seções conforme a rolagem
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.85) {
            el.classList.add('active');
        } else {
            el.classList.remove('active'); // para repetir o efeito
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Hover animado em botões
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s ease';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Scroll suave (caso tenha âncoras)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
