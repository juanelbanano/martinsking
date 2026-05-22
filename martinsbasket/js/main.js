/**
 * King Basketball Club Martins
 * Main JavaScript File
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initHeaderScroll();
    initScheduleTabs();
    initBackToTop();
    initFormSubmission();
    initSmoothScroll();
    initAnimations();
});

/**
 * Mobile Navigation
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Open menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', throttle(updateHeader, 100));
    updateHeader(); // Initial check
}

/**
 * Schedule Tabs
 */
function initScheduleTabs() {
    const tabs = document.querySelectorAll('.schedule__tab');
    const panels = document.querySelectorAll('.schedule__panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetId) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    const showThreshold = 500;

    function toggleButton() {
        if (window.scrollY > showThreshold) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', throttle(toggleButton, 100));

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Form Submission - Sends to WhatsApp
 */
function initFormSubmission() {
    const form = document.getElementById('inscription-form');
    const modal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');

    // WhatsApp numbers
    const whatsappNumbers = ['573212249331', '573157103233'];

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            if (!validateForm(form)) {
                return;
            }

            // Get form data
            const studentName = document.getElementById('student-name').value;
            const studentAge = document.getElementById('student-age').value;
            const program = document.getElementById('program').value;
            const parentName = document.getElementById('parent-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value || 'Sin comentarios';

            // Get program name
            const programNames = {
                'mini': 'Mini Basketball (4-7 anos)',
                'juvenil': 'Formacion Juvenil (8-12 anos)',
                'alto': 'Alto Rendimiento (13-17 anos)',
                'adultos': 'Adultos (18+ anos)'
            };
            const programName = programNames[program] || program;

            // Create WhatsApp message
            const whatsappMessage = `*NUEVA INSCRIPCION - King Basketball Club Martins*

*Datos del Estudiante:*
- Nombre: ${studentName}
- Edad: ${studentAge} anos
- Programa: ${programName}

*Datos del Padre/Tutor:*
- Nombre: ${parentName}
- Email: ${email}
- Telefono: ${phone}

*Comentarios:*
${message}

---
Enviado desde el sitio web`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Open WhatsApp for first number
            const whatsappUrl1 = `https://wa.me/${whatsappNumbers[0]}?text=${encodedMessage}`;
            window.open(whatsappUrl1, '_blank');

            // Open WhatsApp for second number after a short delay
            setTimeout(() => {
                const whatsappUrl2 = `https://wa.me/${whatsappNumbers[1]}?text=${encodedMessage}`;
                window.open(whatsappUrl2, '_blank');
            }, 1000);

            // Show success modal
            modal.classList.add('active');

            // Reset form
            form.reset();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

/**
 * Form Validation
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
        // Remove previous error states
        input.classList.remove('error');

        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            shakeElement(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                shakeElement(input);
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                shakeElement(input);
            }
        }
    });

    return isValid;
}

/**
 * Shake animation for invalid inputs
 */
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add shake keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .error {
        border-color: #dc2626 !important;
        background-color: rgba(220, 38, 38, 0.05) !important;
    }
`;
document.head.appendChild(style);

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section__header, .about__content, .program-card, .coach-card, ' +
        '.schedule__wrapper, .gallery__item, .testimonial-card, ' +
        '.inscription__content, .contact__card'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '-80px 0px 0px 0px'
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Gallery Lightbox (Optional Enhancement)
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox__content">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="lightbox__close" aria-label="Cerrar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Animate in
                requestAnimationFrame(() => {
                    lightbox.classList.add('active');
                });
                
                // Close handlers
                const closeBtn = lightbox.querySelector('.lightbox__close');
                closeBtn.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) closeLightbox();
                });
                
                function closeLightbox() {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                }
            }
        });
    });
}

// Add lightbox styles
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.9);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 3000;
        padding: 2rem;
    }
    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    .lightbox__content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
    }
    .lightbox__content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 0.5rem;
    }
    .lightbox__close {
        position: absolute;
        top: -3rem;
        right: 0;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        transition: transform 0.2s ease;
    }
    .lightbox__close:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(lightboxStyles);

// Initialize gallery lightbox after DOM is ready
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

/**
 * Counter Animation for Stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);
