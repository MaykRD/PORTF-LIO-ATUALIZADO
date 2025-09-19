document.addEventListener('DOMContentLoaded', () => {
            AOS.init({
                duration: 1000,
                once: true,
            });

            const menuToggle = document.getElementById('menu-toggle');
            const navList = document.getElementById('nav-list');
            const navLinks = navList.querySelectorAll('a');

            // Alterna o menu de navegação móvel
            menuToggle.addEventListener('click', () => {
                navList.classList.toggle('active');
            });

            // Fecha o menu móvel quando um link é clicado
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove('active');
                });
            });

            // Manipula o envio do formulário de contato usando Fetch API
            const contactForm = document.getElementById('contact-form');
            const formMessage = document.getElementById('form-message');

            contactForm.addEventListener('submit', async (event) => {
                event.preventDefault(); // Impede o envio padrão do formulário

                const form = event.target;
                const formData = new FormData(form);

                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        formMessage.textContent = 'Mensagem enviada com sucesso!';
                        formMessage.classList.remove('hidden', 'error');
                        formMessage.classList.add('success');
                        form.reset();
                    } else {
                        const data = await response.json();
                        if (data.errors) {
                            formMessage.textContent = data.errors.map(e => e.message).join(", ");
                        } else {
                            formMessage.textContent = 'Ocorreu um erro. Por favor, tente novamente.';
                        }
                        formMessage.classList.remove('hidden', 'success');
                        formMessage.classList.add('error');
                    }
                } catch (error) {
                    formMessage.textContent = 'Falha ao enviar a mensagem. Verifique sua conexão e tente novamente.';
                    formMessage.classList.remove('hidden', 'success');
                    formMessage.classList.add('error');
                } finally {
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                    }, 5000);
                }
            });

            // --- Lógica do Dark/Light Mode ---
            const themeToggle = document.getElementById('checkbox');
            const currentTheme = localStorage.getItem('theme');

            // Verifica se o tema já foi salvo
            if (currentTheme) {
                document.body.setAttribute('data-theme', currentTheme);
                if (currentTheme === 'dark') {
                    themeToggle.checked = true;
                }
            }

            themeToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.body.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                }
            });
        });