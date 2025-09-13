// JavaScript for interactions and AOS initialization
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = navList.querySelectorAll('a');

    // Toggle mobile navigation menu
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Simulate successful submission
            formMessage.textContent = 'Mensagem enviada com sucesso!';
            formMessage.classList.remove('hidden', 'error');
            formMessage.classList.add('success');
            contactForm.reset();

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        } else {
            // Show error if form is incomplete
            formMessage.textContent = 'Por favor, preencha todos os campos.';
            formMessage.classList.remove('hidden', 'success');
            formMessage.classList.add('error');
        }
    });
});
