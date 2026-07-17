/**
 * PROCaffINATE - Best Sellers Carousel Module
 * Handles carousel functionality and animations
 */

// ============================================
// Carousel State
// ============================================
let currentSlide = 0;
let slidesPerView = 3;
let totalSlides = 6;
let autoPlayInterval = null;
let autoPlayDelay = 5000;

// ============================================
// Initialize Carousel
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initCarouselButtons();
    initCarouselDots();
    initBestSellerButtons();
    handleResponsive();
    startAutoPlay();
});

// ============================================
// Initialize Carousel
// ============================================
function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    updateSlidesPerView();
    updateCarouselPosition();
}

// ============================================
// Initialize Carousel Navigation Buttons
// ============================================
function initCarouselButtons() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    // Pause on hover
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
}

// ============================================
// Initialize Carousel Dots
// ============================================
function initCarouselDots() {
    const dots = document.querySelectorAll('.carousel-dot');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
            startAutoPlay();
        });
    });
}

// ============================================
// Initialize Best Seller Add to Cart Buttons
// ============================================
function initBestSellerButtons() {
    const addButtons = document.querySelectorAll('.best-seller-add');

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.dataset.id);
            addToCart(itemId);

            // Button animation
            btn.classList.add('added');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Added!</span>';
            
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = originalText;
            }, 1500);
        });
    });
}

// ============================================
// Navigation Functions
// ============================================
function nextSlide() {
    const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
    
    if (currentSlide < maxSlide) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    
    updateCarouselPosition();
    updateDots();
}

function prevSlide() {
    const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
    
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = maxSlide;
    }
    
    updateCarouselPosition();
    updateDots();
}

function goToSlide(index) {
    const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
    
    if (index >= 0 && index <= maxSlide) {
        currentSlide = index;
        updateCarouselPosition();
        updateDots();
    }
}

// ============================================
// Update Carousel Position
// ============================================
function updateCarouselPosition() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    const gap = 24; // Gap between cards in pixels
    const cardWidth = track.children[0]?.offsetWidth || 0;
    const offset = currentSlide * (cardWidth + gap) * slidesPerView;

    track.style.transform = `translateX(-${offset}px)`;
}

// ============================================
// Update Dots
// ============================================
function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;

    // Adjust number of visible dots
    adjustDots(maxSlide + 1);

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// ============================================
// Adjust Number of Dots
// ============================================
function adjustDots(count) {
    const dotsContainer = document.getElementById('carousel-dots');
    if (!dotsContainer) return;

    const currentDots = dotsContainer.children.length;

    if (currentDots !== count) {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.dataset.index = i;
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(i);
                startAutoPlay();
            });
            
            dotsContainer.appendChild(dot);
        }
    }
}

// ============================================
// Auto Play
// ============================================
function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// ============================================
// Handle Responsive
// ============================================
function handleResponsive() {
    const updateOnResize = () => {
        updateSlidesPerView();
        updateCarouselPosition();
        updateDots();
    };

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateOnResize, 250);
    });

    // Initial setup
    updateOnResize();
}

// ============================================
// Update Slides Per View Based on Screen Size
// ============================================
function updateSlidesPerView() {
    const width = window.innerWidth;

    if (width <= 575) {
        slidesPerView = 1;
    } else if (width <= 991) {
        slidesPerView = 2;
    } else {
        slidesPerView = 3;
    }

    // Update dots based on slides per view
    const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
    if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
}

// ============================================
// Touch/Swipe Support
// ============================================
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

function initTouchSwipe() {
    const track = document.getElementById('carousel-track');
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
            nextSlide();
        } else {
            prevSlide();
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
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    // Check if carousel is in viewport
    const rect = carousel.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    }
});
