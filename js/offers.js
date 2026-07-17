/**
 * PROCaffINATE - Special Offers Module
 * Handles countdown timers, promo codes, and newsletter
 */

// ============================================
// Initialize Offers
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCountdowns();
    initCopyButtons();
    initNewsletter();
});

// ============================================
// Countdown Timers
// ============================================
function initCountdowns() {
    const timers = document.querySelectorAll('.offer-timer');

    timers.forEach(timer => {
        const endTime = new Date(timer.dataset.end).getTime();

        function updateTimer() {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance <= 0) {
                timer.innerHTML = '<span class="timer-expired">Offer Expired</span>';
                return;
            }

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const hoursEl = timer.querySelector('#hours');
            const minutesEl = timer.querySelector('#minutes');
            const secondsEl = timer.querySelector('#seconds');

            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    });
}

// ============================================
// Copy Promo Codes
// ============================================
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.dataset.code;
            copyToClipboard(code);

            // Visual feedback
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            btn.classList.add('copied');

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copied');
            }, 2000);
        });
    });
}

// ============================================
// Clipboard Utility
// ============================================
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        showNotification('Promo code copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy code', 'error');
    }
}

// ============================================
// Newsletter Form
// ============================================
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;

        if (email) {
            showNotification('Thanks for subscribing! Check your email for exclusive offers.', 'success');
            form.reset();
        }
    });
}

// ============================================
// Notification (fallback if app.js notification not available)
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
