/**
 * PROCaffINATE - Shopping Cart Module
 * Handles cart functionality with LocalStorage persistence
 */

// ============================================
// Cart State
// ============================================
let cart = JSON.parse(localStorage.getItem('procaffinate-cart')) || [];

// ============================================
// Initialize Cart
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCartToggle();
    initClearCart();
    initCheckout();
    initStartOrdering();
    renderCart();
    updateCartCount();
});

// ============================================
// Initialize Cart Toggle (Open/Close)
// ============================================
function initCartToggle() {
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => openCart());
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => closeCart());
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => closeCart());
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
            closeCart();
        }
    });
}

// ============================================
// Open Cart
// ============================================
function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================================
// Close Cart
// ============================================
function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Render Cart
// ============================================
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
        return;
    }

    cartItems.style.display = 'block';
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = cart.map(item => createCartItemHTML(item)).join('');

    // Initialize cart item interactions
    initCartItemInteractions();

    // Update totals
    updateCartTotals();
}

// ============================================
// Create Cart Item HTML
// ============================================
function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}" aria-label="Decrease quantity">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}" aria-label="Increase quantity">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
            <div class="cart-item-total">
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
}

// ============================================
// Initialize Cart Item Interactions
// ============================================
function initCartItemInteractions() {
    // Decrease quantity
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.dataset.id);
            decreaseQuantity(itemId);
        });
    });

    // Increase quantity
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.dataset.id);
            increaseQuantity(itemId);
        });
    });

    // Remove item
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// ============================================
// Add to Cart
// ============================================
function addToCart(itemId) {
    const item = menuItems ? menuItems.find(i => i.id === itemId) : null;
    if (!item) return;

    // Check if item already in cart
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            icon: item.icon,
            quantity: 1
        });
    }

    // Save and update
    saveCart();
    renderCart();
    updateCartCount();
    
    // Show notification
    showNotification(`${item.name} added to cart`, 'success');

    // Animate cart button
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.classList.add('pulse');
        setTimeout(() => cartBtn.classList.remove('pulse'), 500);
    }

    // Open cart briefly
    openCart();
    setTimeout(() => closeCart(), 1500);
}

// ============================================
// Increase Quantity
// ============================================
function increaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += 1;
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// ============================================
// Decrease Quantity
// ============================================
function decreaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(itemId);
            return;
        }
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// ============================================
// Remove from Cart
// ============================================
function removeFromCart(itemId) {
    const item = cart.find(i => i.id === itemId);
    const itemName = item ? item.name : 'Item';
    
    cart = cart.filter(i => i.id !== itemId);
    
    saveCart();
    renderCart();
    updateCartCount();
    
    showNotification(`${itemName} removed from cart`, 'info');
}

// ============================================
// Clear Cart
// ============================================
function initClearCart() {
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            
            cart = [];
            saveCart();
            renderCart();
            updateCartCount();
            
            showNotification('Cart cleared', 'info');
        });
    }
}

// ============================================
// Initialize Checkout Button
// ============================================
function initCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty', 'error');
                return;
            }
            
            // Show checkout confirmation
            showNotification('Thank you! Your order has been placed.', 'success');
            
            // Clear cart after order
            setTimeout(() => {
                cart = [];
                saveCart();
                renderCart();
                updateCartCount();
                closeCart();
            }, 1500);
        });
    }
}

// ============================================
// Initialize Start Ordering Button
// ============================================
function initStartOrdering() {
    const startBtn = document.getElementById('start-ordering');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            closeCart();
            setTimeout(() => {
                document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    }
}

// ============================================
// Update Cart Totals
// ============================================
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (taxEl) taxEl.textContent = formatCurrency(tax);
    if (totalEl) totalEl.textContent = formatCurrency(total);
}

// ============================================
// Update Cart Count (Badge)
// ============================================
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (countEl) {
        countEl.textContent = totalItems;
        countEl.classList.toggle('show', totalItems > 0);
    }
}

// ============================================
// Save Cart to LocalStorage
// ============================================
function saveCart() {
    localStorage.setItem('procaffinate-cart', JSON.stringify(cart));
}

// ============================================
// Format Currency
// ============================================
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}
