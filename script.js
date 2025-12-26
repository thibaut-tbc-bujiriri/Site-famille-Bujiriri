// Typing Effect for Hero Title
const typingText = document.querySelector('.typing-text');
const text = "Bienvenue sur le site officiel de la Famille Bujiriri";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
            typingText.style.borderRight = 'none';
        }, 500);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll (will be updated by theme toggle code)
const navbar = document.getElementById('navbar');

// Fade-in Animation for Family Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all family cards
document.querySelectorAll('.family-card').forEach(card => {
    observer.observe(card);
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const nomInput = document.getElementById('nom');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nomError = document.getElementById('nom-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Real-time validation
nomInput.addEventListener('blur', () => {
    if (nomInput.value.trim() === '') {
        nomError.textContent = 'Le nom est requis';
        nomInput.style.borderColor = '#ef4444';
    } else {
        nomError.textContent = '';
        nomInput.style.borderColor = '#e2e8f0';
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'L\'email est requis';
        emailInput.style.borderColor = '#ef4444';
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Veuillez entrer un email valide';
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailError.textContent = '';
        emailInput.style.borderColor = '#e2e8f0';
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Le message est requis';
        messageInput.style.borderColor = '#ef4444';
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Le message doit contenir au moins 10 caractères';
        messageInput.style.borderColor = '#ef4444';
    } else {
        messageError.textContent = '';
        messageInput.style.borderColor = '#e2e8f0';
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset errors
    nomError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    let isValid = true;
    
    // Validate name
    if (nomInput.value.trim() === '') {
        nomError.textContent = 'Le nom est requis';
        nomInput.style.borderColor = '#ef4444';
        isValid = false;
    } else {
        nomInput.style.borderColor = '#10b981';
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'L\'email est requis';
        emailInput.style.borderColor = '#ef4444';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Veuillez entrer un email valide';
        emailInput.style.borderColor = '#ef4444';
        isValid = false;
    } else {
        emailInput.style.borderColor = '#10b981';
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Le message est requis';
        messageInput.style.borderColor = '#ef4444';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Le message doit contenir au moins 10 caractères';
        messageInput.style.borderColor = '#ef4444';
        isValid = false;
    } else {
        messageInput.style.borderColor = '#10b981';
    }
    
    if (isValid) {
        // Show success message
        alert('Message envoyé ! Merci de nous avoir contactés. Nous vous répondrons bientôt.');
        
        // Reset form
        contactForm.reset();
        nomInput.style.borderColor = '#e2e8f0';
        emailInput.style.borderColor = '#e2e8f0';
        messageInput.style.borderColor = '#e2e8f0';
    }
});

// Add scroll animation to sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Active navigation link highlight
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    } else {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    }
}

updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update navbar background on scroll for dark theme
window.addEventListener('scroll', () => {
    const currentTheme = html.getAttribute('data-theme');
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)';
        }
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)';
        }
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});


// Show All Children Functionality
const showAllChildrenBtn = document.getElementById('show-all-children');
const hiddenChildrenCards = document.querySelectorAll('.child-card-hidden');

if (showAllChildrenBtn && hiddenChildrenCards.length > 0) {
    showAllChildrenBtn.addEventListener('click', () => {
        hiddenChildrenCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 100); // Stagger animation
        });
        
        // Hide the button after showing all cards
        setTimeout(() => {
            showAllChildrenBtn.classList.add('hidden');
        }, hiddenChildrenCards.length * 100 + 300);
    });
}

