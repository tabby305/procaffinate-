/**
 * PROCaffINATE - Table Reservation Module
 * Handles form validation and reservation submission
 */

// ============================================
// Initialize Reservation
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initReservationForm();
    initMinDate();
    initPopupClose();
});

// ============================================
// Set Minimum Date to Today
// ============================================
function initMinDate() {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.setAttribute('min', `${year}-${month}-${day}`);
    }
}

// ============================================
// Initialize Reservation Form
// ============================================
function initReservationForm() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });

    // Form submission
    form.addEventListener('submit', handleReservationSubmit);
}

// ============================================
// Handle Form Submit
// ============================================
function handleReservationSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = document.getElementById('res-name');
    const emailInput = document.getElementById('res-email');
    const phoneInput = document.getElementById('res-phone');
    const guestsInput = document.getElementById('res-guests');
    const dateInput = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const requestInput = document.getElementById('res-request');

    // Validate all fields
    let isValid = true;

    if (!validateField(nameInput)) isValid = false;
    if (!validateField(emailInput)) isValid = false;
    if (!validateField(phoneInput)) isValid = false;
    if (!validateField(guestsInput)) isValid = false;
    if (!validateField(dateInput)) isValid = false;
    if (!validateField(timeInput)) isValid = false;

    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }

    // Get form data
    const reservationData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        guests: guestsInput.value,
        date: dateInput.value,
        time: timeInput.value,
        request: requestInput.value.trim()
    };

    // Show confirmation popup
    showConfirmationPopup(reservationData);

    // Reset form
    form.reset();
}

// ============================================
// Validate Individual Field
// ============================================
function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();

    switch (fieldId) {
        case 'res-name':
            return validateName(value);
        case 'res-email':
            return validateEmail(value);
        case 'res-phone':
            return validatePhone(value);
        case 'res-guests':
            return validateGuests(value);
        case 'res-date':
            return validateDate(value);
        case 'res-time':
            return validateTime(value);
        default:
            return true;
    }
}

// ============================================
// Validation Functions
// ============================================
function validateName(value) {
    const errorEl = document.getElementById('name-error');
    const input = document.getElementById('res-name');

    if (!value || value.length < 2) {
        showError(input, errorEl);
        return false;
    }

    hideError(input, errorEl);
    return true;
}

function validateEmail(value) {
    const errorEl = document.getElementById('email-error');
    const input = document.getElementById('res-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value || !emailRegex.test(value)) {
        showError(input, errorEl);
        return false;
    }

    hideError(input, errorEl);
    return true;
}

function validatePhone(value) {
    const errorEl = document.getElementById('phone-error');
    const input = document.getElementById('res-phone');
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

    if (!value || !phoneRegex.test(value)) {
        showError(input, errorEl);
        return false;
    }

    hideError(input, errorEl);
    return true;
}

function validateGuests(value) {
    const errorEl = document.getElementById('guests-error');
    const input = document.getElementById('res-guests');

    if (!value) {
        showError(input, errorEl);
        return false;
    }

    hideError(input, errorEl);
    return true;
}

function validateDate(value) {
    const errorEl = document.getElementById('date-error');
    const input = document.getElementById('res-date');

    if (!value) {
        showError(input, errorEl);
        return false;
    }

    // Check if date is not in the past
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        showError(input, errorEl);
        return false;
    }

    hideError(input, errorEl);
    return true;
}

function validateTime(value) {
    const errorEl = document.getElementById('time-error');
    const input = document.getElementById('res-time');

    if (!value) {
        showError(input, errorEl);
        return false;
    }

    hideError(input, errorEl);
    return true;
}

// ============================================
// Show/Hide Error
// ============================================
function showError(input, errorEl) {
    if (input) input.classList.add('error');
    if (errorEl) errorEl.classList.add('show');
}

function hideError(input, errorEl) {
    if (input) input.classList.remove('error');
    if (errorEl) errorEl.classList.remove('show');
}

function clearError(input) {
    const errorEl = input.parentElement.querySelector('.form-error');
    hideError(input, errorEl);
}

// ============================================
// Format Date for Display
// ============================================
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ============================================
// Format Time for Display
// ============================================
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// ============================================
// Show Confirmation Popup
// ============================================
function showConfirmationPopup(data) {
    const popup = document.getElementById('reservation-popup');
    const detailsEl = document.getElementById('popup-details');

    if (detailsEl) {
        detailsEl.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${data.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(data.date)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${formatTime(data.time)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Guests:</span>
                <span class="detail-value">${data.guests} ${parseInt(data.guests) === 1 ? 'Guest' : 'Guests'}</span>
            </div>
        `;
    }

    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================================
// Initialize Popup Close
// ============================================
function initPopupClose() {
    const popup = document.getElementById('reservation-popup');
    const closeBtn = document.getElementById('popup-close');
    const okBtn = document.getElementById('popup-ok');

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    if (okBtn) {
        okBtn.addEventListener('click', closePopup);
    }

    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
        });
    }
}

function closePopup() {
    const popup = document.getElementById('reservation-popup');
    popup.classList.remove('active');
    document.body.style.overflow = '';
}
