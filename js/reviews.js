/**
 * PROCaffINATE - Customer Reviews Module
 * Automatic testimonial slider
 */

// ============================================
// Reviews State
// ============================================
let currentReview = 0;
let totalReviews = 5;
let autoPlayDelay = 6000;
let autoPlayInterval = null;

// ============================================
// Initialize Reviews Slider
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initReviewsSlider();
    initReviewsControls();
    startAutoPlay();
});

// ============================================
// Initialize Slider
// ============================================
function initReviewsSlider() {
    updateReviewsPosition();
}

// ============================================
// Initialize Controls
// ============================================
function initReviewsControls() {
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    const dots = document.querySelectorAll('.reviews-dot');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevReview();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextReview();
            startAutoPlay();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            const index = parseInt(dot.dataset.index);
            goToReview(index);
            startAutoPlay();
        });
    });

    // Pause on hover
    const slider = document.querySelector('.reviews-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
    }
}

// ============================================
// Navigation Functions
// ============================================
function nextReview() {
    currentReview = (currentReview + 1) % totalReviews;
    updateReviewsPosition();
    updateDots();
}

function prevReview() {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    updateReviewsPosition();
    updateDots();
}

function goToReview(index) {
    currentReview = index;
    updateReviewsPosition();
    updateDots();
}

// ============================================
// Update Position
// ============================================
function updateReviewsPosition() {
    const track = document.getElementById('reviews-track');
    if (!track) return;

    const cards = track.children;
    if (cards.length === 0) return;

    // Calculate offset based on current review
    const offset = -currentReview * 100;
    track.style.transform = `translateX(${offset}%)`;
}

// ============================================
// Update Dots
// ============================================
function updateDots() {
    const dots = document.querySelectorAll('.reviews-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentReview);
    });
}

// ============================================
// Auto Play
// ============================================
function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextReview, autoPlayDelay);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// ============================================
// Touch/Swipe Support
// ============================================
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

function initTouchSwipe() {
    const track = document.getElementById('reviews-track');
    if (!track) return;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        stopAutoPlay();
        
        if (diff > 0) {
            nextReview();
        } else {
            prevReview();
        }
        
        startAutoPlay();
    }
}

// Initialize touch swipe
document.addEventListener('DOMContentLoaded', initTouchSwipe);

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    const slider = document.querySelector('.reviews-slider');
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevReview();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextReview();
            startAutoPlay();
        }
    }
});
