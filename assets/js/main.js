document.addEventListener('DOMContentLoaded', function () {
    console.log('MXP Public Foundation website loaded successfully');

    // Initialize all functionality
    initializeNavigation();
    initializeForms();
    initializeAnimations();
    initializeVolunteerForm();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });

    // Mobile navbar collapse on link click
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks2 = document.querySelectorAll('.nav-link');

    navLinks2.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        });
    });
}

// Form handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Volunteer application form
    const volunteerForm = document.getElementById('volunteerApplicationForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerForm);
    }

    // Form validation styling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Simulate form submission
    showSuccessMessage('Thank you for your message! We will get back to you within 24 hours.');

    // Reset form
    e.target.reset();
    e.target.classList.remove('was-validated');

    console.log('Contact form submitted:', formObject);
}

// Volunteer form handler
function handleVolunteerForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Get selected interests
    const interests = [];
    const interestCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    interestCheckboxes.forEach(checkbox => {
        if (checkbox.id !== 'agreement') {
            interests.push(checkbox.value);
        }
    });
    formObject.interests = interests;

    // Simulate form submission
    showSuccessMessage('Thank you for your volunteer application! We will review your application and contact you within one week.');

    // Reset form and hide it
    e.target.reset();
    e.target.classList.remove('was-validated');
    hideVolunteerForm();

    console.log('Volunteer application submitted:', formObject);
}

// Show success message
function showSuccessMessage(message) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Add to body
    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Animation initialization
function initializeAnimations() {
    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and other elements
    const animatedElements = document.querySelectorAll('.card, .display-6, .lead');
    animatedElements.forEach(el => observer.observe(el));
}

// Volunteer form visibility
function initializeVolunteerForm() {
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.style.display = 'none';
    }
}

function showVolunteerForm() {
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.style.display = 'block';
        volunteerForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function hideVolunteerForm() {
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.style.display = 'none';
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button if needed
window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollButton = document.getElementById('scrollToTop');

    if (scrollButton) {
        if (scrollTop > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
}, 100));

// Loading state management
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
    } else {
        element.disabled = false;
        element.innerHTML = element.getAttribute('data-original-text') || 'Submit';
    }
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Export functions for global access
window.showVolunteerForm = showVolunteerForm;
window.hideVolunteerForm = hideVolunteerForm;
window.scrollToTop = scrollToTop;
