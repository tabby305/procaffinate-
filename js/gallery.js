/**
 * PROCaffINATE - Gallery Module
 * Handles gallery display, filtering, and lightbox
 */

// ============================================
// Gallery Data
// ============================================
const galleryItems = [
    { id: 0, title: 'Our Cozy Interior', category: 'interior', icon: '🏠' },
    { id: 1, title: 'Perfect Espresso', category: 'coffee', icon: '☕' },
    { id: 2, title: 'Artisan Desserts', category: 'food', icon: '🍰' },
    { id: 3, title: 'Evening Ambiance', category: 'ambiance', icon: '🕯️' },
    { id: 4, title: 'Matcha Perfection', category: 'coffee', icon: '🍵' },
    { id: 5, title: 'Reading Nook', category: 'interior', icon: '🪑' },
    { id: 6, title: 'Fresh Pastries', category: 'food', icon: '🥐' },
    { id: 7, title: 'Garden View', category: 'ambiance', icon: '🌿' }
];

// ============================================
// Gallery State
// ============================================
let currentLightboxIndex = 0;
let filteredItems = [...galleryItems];

// ============================================
// Initialize Gallery
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initGalleryFilter();
    initLightbox();
});

// ============================================
// Initialize Gallery Filter
// ============================================
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            const filter = btn.dataset.filter;
            filterGallery(filter);
        });
    });
}

// ============================================
// Filter Gallery
// ============================================
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');

    // Update filtered items for lightbox navigation
    filteredItems = category === 'all' 
        ? [...galleryItems]
        : galleryItems.filter(item => item.category === category);

    items.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ============================================
// Initialize Lightbox
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const expandBtns = document.querySelectorAll('.gallery-expand');

    // Open lightbox on expand button click
    expandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const galleryItem = btn.closest('.gallery-item');
            const index = parseInt(galleryItem.dataset.index);
            openLightbox(index);
        });
    });

    // Open lightbox on image click
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            openLightbox(index);
        });
    });

    // Close lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', prevImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }

    // Close on overlay click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
            prevImage();
        }
        if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
            nextImage();
        }
    });
}

// ============================================
// Open Lightbox
// ============================================
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    currentLightboxIndex = index;
    
    updateLightboxContent();
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================================
// Close Lightbox
// ============================================
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Navigate Images
// ============================================
function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    updateLightboxContent();
}

// ============================================
// Update Lightbox Content
// ============================================
function updateLightboxContent() {
    const item = galleryItems[currentLightboxIndex];
    const lightboxIcon = document.getElementById('lightbox-icon');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxImage = document.getElementById('lightbox-image');

    if (lightboxIcon) lightboxIcon.textContent = item.icon;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCategory) lightboxCategory.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryItems.length}`;

    // Update background color based on category
    const gradients = {
        interior: 'linear-gradient(135deg, #D4A574, #C49A6C)',
        coffee: 'linear-gradient(135deg, #8B7355, #6B4423)',
        food: 'linear-gradient(135deg, #C9A87C, #B8976B)',
        ambiance: 'linear-gradient(135deg, #E8D5C4, #D4C4B0)'
    };

    if (lightboxImage) {
        lightboxImage.style.background = gradients[item.category] || gradients.coffee;
    }
}

// ============================================
// Touch/Swipe Support for Lightbox
// ============================================
let lightboxTouchStartX = 0;
let lightboxTouchEndX = 0;

function initLightboxTouch() {
    const lightboxContent = document.getElementById('lightbox-content');
    if (!lightboxContent) return;

    lightboxContent.addEventListener('touchstart', (e) => {
        lightboxTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxContent.addEventListener('touchend', (e) => {
        lightboxTouchEndX = e.changedTouches[0].screenX;
        handleLightboxSwipe();
    }, { passive: true });
}

function handleLightboxSwipe() {
    const diff = lightboxTouchStartX - lightboxTouchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextImage();
        } else {
            prevImage();
        }
    }
}

document.addEventListener('DOMContentLoaded', initLightboxTouch);
