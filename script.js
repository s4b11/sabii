document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------
    // 1. Mobile Navigation Toggle
    // ----------------------------------------
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // ----------------------------------------
    // 2. Header Scroll Effect
    // ----------------------------------------
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------------------
    // 3. Active Nav Link on Scroll
    // ----------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjusted offset
            const sectionId = current.getAttribute('id');
            
            const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
        
        // Special case for home
        const homeLink = document.querySelector('.nav__link[href*="home"]');
        if (scrollY < sections[0].offsetTop) {
            document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active'));
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Run on load

    // ----------------------------------------
    // 4. Dark/Light Mode Toggle
    // ----------------------------------------
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    } else {
        // Default to dark mode
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
        localStorage.setItem('theme', 'dark-mode');
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
        // Re-init canvas particles for new colors
        if (typeof initParticles === 'function') {
            initParticles();
        }
    });

    // ----------------------------------------
    // 5. Back to Top Button
    // ----------------------------------------
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ----------------------------------------
    // 6. Custom Cursor
    // ----------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .project-card, .theme-toggle-label, .nav__toggle').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });
    }

    // ----------------------------------------
    // 7. Hero Section Typing Effect
    // ----------------------------------------
    const typingTextEl = document.getElementById('hero-typing-text');
    if (typingTextEl) {
        const phrases = [
            "A Full-Stack Developer.",
            "A Creative Problem Solver.",
            "A Python Enthusiast.",
            "A Lifelong Learner.",
            "A Software Engineer.",
            "A Backend Architect.",
            "A Collaborative Teammate.",
            "A Believer in Clean Code.",
            "A Detail-Oriented Professional.",
            "A Builder of Scalable Systems.",
            "A Tech Speaker and Mentor.",
            "An Open-Source Contributor.",
            "A User-Centric Builder.",
            "A Database Designer.",
            "A Proactive Communicator.",
            "A Performance Optimizer.",
            "A Curious Mind.",
            "A Self-Starter.",
            "A Test-Driven Developer.",
            "A Builder of Things."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            let text = '';

            if (isDeleting) {
                text = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                text = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            typingTextEl.textContent = text;

            let typeSpeed = 100;
            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new phrase
            }

            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }
    
    // ----------------------------------------
    // 8. Intersection Observer (Scroll Animations)
    // ----------------------------------------
    const animatedElements = document.querySelectorAll('.anim-hidden, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                // No need to unobserve, let it reset on page load
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% is visible
    });

    animatedElements.forEach(el => observer.observe(el));
    
    // ----------------------------------------
    // 9. Project Filtering
    // ----------------------------------------
    const filterButtons = document.querySelectorAll('.project__filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
    
    // ----------------------------------------
    // 10. Project Modal
    // ----------------------------------------
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const learnMoreButtons = document.querySelectorAll('.project-card__learn-more');

    // Placeholder project data (in a real app, this might come from an API)
    const projectData = {
        project1: {
            title: "Zenith E-commerce Platform",
            image: "https://via.placeholder.com/800x400/008080/FFFFFF?text=Zenith+Store",
            description: "Zenith is a fully-featured, scalable e-commerce platform built from the ground up. It includes a complete shopping cart, user authentication with JWT, product search and filtering, and a secure payment gateway integration with Stripe.",
            role: "Lead Full-Stack Developer",
            challenges: "The primary challenge was designing a flexible database schema with MongoDB to handle complex product variations and user orders. Implementing the Stripe payment intent workflow securely on the backend was also a significant learning curve.",
            github: "#",
            live: "#"
        },
        project2: {
            title: "AI Analytics Dashboard",
            image: "https://via.placeholder.com/800x400/4B0082/FFFFFF?text=AI+Dashboard",
            description: "This project involved creating a front-end for a data science team's machine learning models. The dashboard, built in React, fetches data from a Python (Flask) API and displays complex insights using D3.js for interactive visualizations.",
            role: "Frontend Developer & UI/UX Designer",
            challenges: "Optimizing the D3.js charts for performance with large datasets was a major hurdle. Ensuring the data visualizations were both accurate and easily understandable for non-technical stakeholders required several design iterations.",
            github: "#",
            live: null // No live link
        },
        project3: {
            title: "FitLife Mobile Tracker",
            image: "https://via.placeholder.com/800x400/FF6347/FFFFFF?text=FitLife+App",
            description: "FitLife is a cross-platform (iOS and Android) mobile application for tracking daily workouts, calories, and water intake. It uses React Native for the UI and Firebase (Firestore & Auth) for the backend and real-time data synchronization.",
            role: "Solo Developer",
            challenges: "Managing state across multiple screens and components in React Native was complex. Setting up the Firebase real-time database listeners to update the UI instantly without performance degradation was a key challenge.",
            github: "#",
            live: null
        },
        project4: {
            title: "Real-time Chat App",
            image: "https://via.placeholder.com/800x400/1E90FF/FFFFFF?text=Connect+Chat",
            description: "A classic web-based chat application demonstrating the power of WebSockets. Built with a Node.js and Express backend, it uses Socket.io to manage real-time, bi-directional communication between clients. Features include user 'is typing' indicators and online user lists.",
            role: "Backend Developer",
            challenges: "Handling socket disconnections and reconnections gracefully to maintain a persistent user list. Scaling the application to handle multiple chat rooms was a conceptual challenge that I solved by using Socket.io 'rooms'.",
            github: "#",
            live: "#"
        },
        project5: {
            title: "Markdown-to-HTML Parser",
            image: "https://via.placeholder.com/800x400/36454F/FFFFFF?text=MD+Parser",
            description: "A zero-dependency Node.js module, written in TypeScript, that parses standard Markdown syntax (like headers, bold, italics, links, and lists) into clean HTML. The project is fully tested with Jest and published on the NPM registry.",
            role: "Solo Developer",
            challenges: "The core challenge was using regular expressions effectively to parse the Markdown syntax in the correct order without unintended collisions (e.g., correctly parsing a bold link). Writing a comprehensive test suite with Jest was crucial.",
            github: "#",
            live: "https://www.npmjs.com/" // Link to NPM
        },
        project6: {
            title: "Artisan Branding Site",
            image: "https://via.placeholder.com/800x400/D2B48C/000000?text=Artisan+Brand",
            description: "A static, multi-page website for a high-end design agency. The focus was on creating a pixel-perfect, visually stunning experience with advanced CSS animations, micro-interactions, and a fully responsive layout based on Figma designs.",
            role: "Frontend Developer",
            challenges: "Translating the complex and animation-heavy Figma designs into performant HTML and CSS. Achieving smooth, non-janky animations using CSS transforms and will-change properties was a key focus.",
            github: "#",
            live: "#"
        }
    };

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('data-modal-id');
            const data = projectData[modalId];
            
            if (data && modal) {
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-image').src = data.image;
                document.getElementById('modal-image').alt = data.title;
                document.getElementById('modal-description').textContent = data.description;
                document.getElementById('modal-role').textContent = data.role;
                document.getElementById('modal-challenges').textContent = data.challenges;
                
                const githubLink = document.getElementById('modal-github');
                const liveLink = document.getElementById('modal-live');

                githubLink.href = data.github;
                
                if (data.live) {
                    liveLink.href = data.live;
                    liveLink.style.display = 'inline-block';
                } else {
                    liveLink.style.display = 'none';
                }
                
                modal.classList.add('active');
            }
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
        }
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ----------------------------------------
    // 11. Contact Form Validation
    // ----------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function showError(input, message) {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            const errorEl = formGroup.querySelector('.form-error');
            if (errorEl) errorEl.textContent = message;
        }

        function hideError(input) {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
        }

        function validateForm() {
            let isValid = true;

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name.');
                isValid = false;
            } else {
                hideError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email.');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                 showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                hideError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter a message.');
                isValid = false;
            } else {
                hideError(messageInput);
            }
            
            return isValid;
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                // In a real app, you'd send this to a backend.
                console.log('Form is valid! Submitting...');
                alert('Thank you for your message! (Form submitted to console)');
                contactForm.reset();
            }
        });
    }
    
    // ----------------------------------------
    // 12. Hero Canvas Particle Animation
    // ----------------------------------------
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let mouse = { x: null, y: null, radius: 100 };
        
        // Get computed styles for colors
        let particleColor, lineColor;
        
        function getParticleColors() {
            const styles = getComputedStyle(document.body);
            particleColor = styles.getPropertyValue('--particle-color').replace(/'/g, '').trim();
            lineColor = styles.getPropertyValue('--particle-line-color').replace(/'/g, '').trim();
        }

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            getParticleColors(); // Get colors from CSS vars
            
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            if (numberOfParticles > 150) numberOfParticles = 150; // Cap particles

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
            }
        }

        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    let distance = Math.sqrt(
                        (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)
                        + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)
                    );
                    
                    if (distance < 120) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
                
                // Mouse interaction
                if (mouse.x && mouse.y) {
                    let mouseDistance = Math.sqrt(
                        (particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)
                        + (particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y)
                    );
                    if (mouseDistance < mouse.radius) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }
        
        initParticles();
        animateParticles();
        
        window.addEventListener('resize', () => {
            initParticles();
        });
    } // end if(canvas)

}); // End DOMContentLoaded