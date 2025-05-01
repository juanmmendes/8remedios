// Efeito de rolagem suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito de cabeçalho fixo que muda a cor conforme o usuário rola
window.onscroll = function () {
    let header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
};

// Animação de fade-in para as seções quando o usuário rola
const sections = document.querySelectorAll('section');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        // Adiciona a animação se a seção estiver visível
        if (sectionTop < threshold && sectionBottom > 0) {
            section.classList.add('fade-in');
        } else {
            section.classList.remove('fade-in');
        }
    });
}


window.addEventListener('scroll', revealOnScroll);

// Efeito de hover nos botões (mudança de cor e aumento)
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s ease-in-out';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});
