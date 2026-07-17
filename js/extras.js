/**
 * PROCaffINATE - Extra Features Module
 * Handles trending items, back to top, and enhanced notifications
 */

// ============================================
// Trending Items Data
// ============================================
const trendingItems = [
    {
        id: 1,
        name: 'Caramel Macchiato',
        category: 'Coffee',
        price: 6.49,
        icon: '☕',
        trend: '+23%',
        orders: '2.4k orders'
    },
    {
        id: 2,
        name: 'Matcha Latte',
        category: 'Tea',
        price: 5.99,
        icon: '🍵',
        trend: '+18%',
        orders: '1.8k orders'
    },
    {
        id: 3,
        name: 'Avocado Toast',
        category: 'Snacks',
        price: 8.99,
        icon: '🥑',
        trend: '+31%',
        orders: '1.5k orders'
    },
    {
        id: 4,
        name: 'Tiramisu',
        category: 'Desserts',
        price: 7.49,
        icon: '🍰',
        trend: '+15%',
        orders: '1.2k orders'
    },
    {
        id: 5,
        name: 'Iced Mocha',
        category: 'Cold Coffee',
        price: 6.99,
        icon: '🧊',
        trend: '+27%',
        orders: '1.1k orders'
    },
    {
        id: 6,
        name: 'Croissant',
        category: 'Pastries',
        price: 3.99,
        icon: '🥐',
        trend: '+12%',
        orders: '980 orders'
    }
];

// ============================================
// Initialize Extra Features
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initTrending();
    initEnhancedNotifications();
});

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Trending Items
// ============================================
function initTrending() {
    const trendingGrid = document.getElementById('trending-grid');
    if (!trendingGrid) return;

    renderTrendingItems(trendingGrid);
}

function renderTrendingItems(container) {
    container.innerHTML = trendingItems.map((item, index) => `
        <div class="trending-card reveal" style="animation-delay: ${index * 0.1}s">
            <div class="trending-rank">#${index + 1}</div>
            <div class="trending-icon">${item.icon}</div>
            <div class="trending-content">
                <span class="trending-category">${item.category}</span>
                <h4 class="trending-name">${item.name}</h4>
                <div class="trending-stats">
                    <span class="trending-price">$${item.price.toFixed(2)}</span>
                    <span class="trending-orders">${item.orders}</span>
                </div>
            </div>
            <div class="trending-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                <span>${item.trend}</span>
            </div>
            <button class="trending-add" onclick="addTrendingToCart(${item.id})" aria-label="Add to cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </button>
        </div>
    `).join('');
}

// ============================================
// Add Trending Item to Cart
// ============================================
function addTrendingToCart(itemId) {
    const item = trendingItems.find(i => i.id === itemId);
    if (!item) return;

    // Find corresponding menu item
    const menuItem = menuItems.find(m => m.name === item.name);
    
    if (menuItem && typeof addToCart === 'function') {
        addToCart(menuItem.id);
    } else {
        // Fallback - use cart module directly
        if (window.ProcaffINATE && window.ProcaffINATE.cart) {
            window.ProcaffINATE.cart.addItem({
                id: item.id,
                name: item.name,
                price: item.price,
                icon: item.icon,
                quantity: 1
            });
        }
    }
}

// ============================================
// Enhanced Notifications
// ============================================
function initEnhancedNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

// Global notification function
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type] || icons.info}</span>
        <span class="notification-text">${message}</span>
        <button class="notification-close" aria-label="Close notification">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    container.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Auto-remove
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
}

function removeNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => notification.remove(), 300);
}
