/**
 * PROCaffINATE - Contact Module
 * Handles contact form validation and submission
 */

// ============================================
// Initialize Contact
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

// ============================================
// Contact Form Validation
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const validators = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Please enter a valid first name (min 2 characters)'
        },
        lastname: {
            validate: (value) => value.trim().length >= 2,
            message: 'Please enter a valid last name (min 2 characters)'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        phone: {
            validate: (value) => !value || /^[\d\s\-\+\(\)]+$/.test(value),
            message: 'Please enter a valid phone number'
        },
        subject: {
            validate: (value) => value.trim().length > 0,
            message: 'Please select a subject'
        },
        message: {
            validate: (value) => value.trim().length >= 10,
            message: 'Please enter a message (min 10 characters)'
        }
    };

    // Real-time validation
    Object.keys(validators).forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input) return;

        input.addEventListener('blur', () => {
            validateField(input, validators[field]);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input, validators[field]);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        Object.keys(validators).forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!input) return;

            if (!validateField(input, validators[field])) {
                isValid = false;
            }
        });

        if (isValid) {
            submitContactForm(form);
        }
    });
}

// ============================================
// Validate Single Field
// ============================================
function validateField(input, validator) {
    const errorEl = document.getElementById(`${input.name}-error`);
    const isValid = validator.validate(input.value);

    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
        if (errorEl) {
            errorEl.textContent = validator.message;
            errorEl.style.display = 'block';
        }
    }

    return isValid;
}

// ============================================
// Submit Contact Form
// ============================================
async function submitContactForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"></path>
        </svg>
    `;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success
    submitBtn.innerHTML = `
        <span>Message Sent!</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    `;
    submitBtn.classList.add('success');

    showNotification('Your message has been sent successfully! We\'ll get back to you soon.', 'success');

    // Reset form
    form.reset();
    form.querySelectorAll('input, textarea, select').forEach(el => {
        el.classList.remove('valid', 'error');
    });

    // Reset button after delay
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('success');
    }, 3000);
}

// ============================================
// Notification (fallback)
// ============================================
function showNotification(message, type = 'info') {
    if (window.ProcaffINATE && window.ProcaffINATE.showNotification) {
        window.ProcaffINATE.showNotification(message, type);
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span class="notification-text">${message}</span>
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
