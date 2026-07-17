/**
 * PROCaffINATE - Menu Module
 * Handles menu display, filtering, and interactions
 */

// ============================================
// Menu Data
// ============================================
const menuItems = [
    // Coffee
    {
        id: 1,
        name: 'Classic Espresso',
        category: 'coffee',
        price: 4.99,
        rating: 4.9,
        description: 'Rich and bold single-origin espresso with a perfect crema',
        icon: '☕',
        calories: 5,
        protein: '0.3g',
        sugar: '0g',
        serving: '2 oz',
        ingredients: 'Premium Arabica beans, single origin'
    },
    {
        id: 2,
        name: 'Caramel Macchiato',
        category: 'coffee',
        price: 6.49,
        rating: 4.8,
        description: 'Espresso with steamed milk and vanilla-caramel drizzle',
        icon: '☕',
        calories: 250,
        protein: '10g',
        sugar: '34g',
        serving: '16 oz',
        ingredients: 'Espresso, steamed milk, vanilla syrup, caramel sauce'
    },
    {
        id: 3,
        name: 'Cappuccino',
        category: 'coffee',
        price: 5.49,
        rating: 4.7,
        description: 'Classic Italian coffee with equal parts espresso and steamed milk foam',
        icon: '☕',
        calories: 120,
        protein: '6g',
        sugar: '10g',
        serving: '12 oz',
        ingredients: 'Espresso, steamed milk, milk foam'
    },
    {
        id: 4,
        name: 'Vanilla Latte',
        category: 'coffee',
        price: 6.29,
        rating: 4.8,
        description: 'Smooth espresso with steamed milk and house-made vanilla syrup',
        icon: '☕',
        calories: 280,
        protein: '12g',
        sugar: '38g',
        serving: '16 oz',
        ingredients: 'Espresso, steamed milk, vanilla syrup'
    },
    {
        id: 5,
        name: 'Mocha Delight',
        category: 'coffee',
        price: 6.99,
        rating: 4.9,
        description: 'Espresso blended with rich chocolate and steamed milk',
        icon: '☕',
        calories: 350,
        protein: '14g',
        sugar: '42g',
        serving: '16 oz',
        ingredients: 'Espresso, chocolate sauce, steamed milk, whipped cream'
    },
    {
        id: 6,
        name: 'Hazelnut Americano',
        category: 'coffee',
        price: 5.79,
        rating: 4.6,
        description: 'Bold americano with a hint of hazelnut flavor',
        icon: '☕',
        calories: 15,
        protein: '0.5g',
        sugar: '0g',
        serving: '16 oz',
        ingredients: 'Espresso, hot water, hazelnut syrup'
    },

    // Tea
    {
        id: 7,
        name: 'Earl Grey Supreme',
        category: 'tea',
        price: 4.49,
        rating: 4.7,
        description: 'Premium bergamot-infused black tea with lavender notes',
        icon: '🍵',
        calories: 5,
        protein: '0g',
        sugar: '0g',
        serving: '12 oz',
        ingredients: 'Earl Grey tea leaves, bergamot oil, lavender'
    },
    {
        id: 8,
        name: 'Matcha Latte',
        category: 'tea',
        price: 6.49,
        rating: 4.8,
        description: 'Ceremonial grade matcha whisked with steamed oat milk',
        icon: '🍵',
        calories: 200,
        protein: '8g',
        sugar: '18g',
        serving: '12 oz',
        ingredients: 'Ceremonial matcha, oat milk, honey'
    },
    {
        id: 9,
        name: 'Chamomile Dreams',
        category: 'tea',
        price: 4.29,
        rating: 4.5,
        description: 'Soothing chamomile flowers with honey and lemon',
        icon: '🍵',
        calories: 45,
        protein: '0g',
        sugar: '12g',
        serving: '12 oz',
        ingredients: 'Chamomile flowers, honey, lemon'
    },
    {
        id: 10,
        name: 'Peppermint Refresh',
        category: 'tea',
        price: 4.49,
        rating: 4.6,
        description: 'Cool peppermint leaves for a refreshing experience',
        icon: '🍵',
        calories: 5,
        protein: '0g',
        sugar: '0g',
        serving: '12 oz',
        ingredients: 'Fresh peppermint leaves'
    },

    // Cold Coffee
    {
        id: 11,
        name: 'Iced Caramel Latte',
        category: 'cold-coffee',
        price: 6.99,
        rating: 4.8,
        description: 'Chilled espresso with caramel and cold milk over ice',
        icon: '🧊',
        calories: 280,
        protein: '10g',
        sugar: '36g',
        serving: '16 oz',
        ingredients: 'Espresso, cold milk, caramel syrup, ice'
    },
    {
        id: 12,
        name: 'Vietnamese Iced Coffee',
        category: 'cold-coffee',
        price: 7.49,
        rating: 4.9,
        description: 'Strong dark roast coffee with sweetened condensed milk',
        icon: '🧊',
        calories: 320,
        protein: '8g',
        sugar: '45g',
        serving: '12 oz',
        ingredients: 'Dark roast coffee, sweetened condensed milk, ice'
    },
    {
        id: 13,
        name: 'Cold Brew Classic',
        category: 'cold-coffee',
        price: 5.99,
        rating: 4.7,
        description: 'Smooth 20-hour cold brew with natural sweetness',
        icon: '🧊',
        calories: 10,
        protein: '0.5g',
        sugar: '0g',
        serving: '16 oz',
        ingredients: 'Cold brew coffee concentrate, filtered water'
    },
    {
        id: 14,
        name: 'Affogato',
        category: 'cold-coffee',
        price: 7.99,
        rating: 4.8,
        description: 'Hot espresso poured over artisan vanilla gelato',
        icon: '🧊',
        calories: 280,
        protein: '6g',
        sugar: '32g',
        serving: '8 oz',
        ingredients: 'Espresso, vanilla gelato'
    },

    // Milkshakes
    {
        id: 15,
        name: 'Vanilla Bean Shake',
        category: 'milkshakes',
        price: 8.99,
        rating: 4.7,
        description: 'Creamy vanilla bean ice cream blended to perfection',
        icon: '🥤',
        calories: 520,
        protein: '12g',
        sugar: '58g',
        serving: '16 oz',
        ingredients: 'Vanilla bean ice cream, whole milk, whipped cream'
    },
    {
        id: 16,
        name: 'Chocolate Indulgence',
        category: 'milkshakes',
        price: 9.49,
        rating: 4.9,
        description: 'Rich chocolate ice cream with cocoa and chocolate drizzle',
        icon: '🥤',
        calories: 580,
        protein: '14g',
        sugar: '62g',
        serving: '16 oz',
        ingredients: 'Chocolate ice cream, cocoa, chocolate sauce, whipped cream'
    },
    {
        id: 17,
        name: 'Strawberry Bliss',
        category: 'milkshakes',
        price: 8.99,
        rating: 4.7,
        description: 'Fresh strawberries blended with creamy vanilla ice cream',
        icon: '🥤',
        calories: 450,
        protein: '10g',
        sugar: '52g',
        serving: '16 oz',
        ingredients: 'Fresh strawberries, vanilla ice cream, cream'
    },
    {
        id: 18,
        name: 'Caramel Crunch',
        category: 'milkshakes',
        price: 9.99,
        rating: 4.8,
        description: 'Caramel ice cream with toffee bits and caramel swirl',
        icon: '🥤',
        calories: 600,
        protein: '12g',
        sugar: '68g',
        serving: '16 oz',
        ingredients: 'Caramel ice cream, toffee bits, caramel sauce, whipped cream'
    },

    // Desserts
    {
        id: 19,
        name: 'Tiramisu',
        category: 'desserts',
        price: 9.99,
        rating: 4.9,
        description: 'Classic Italian dessert with espresso-soaked ladyfingers',
        icon: '🍰',
        calories: 380,
        protein: '8g',
        sugar: '28g',
        serving: '1 slice',
        ingredients: 'Mascarpone, espresso, ladyfingers, cocoa powder'
    },
    {
        id: 20,
        name: 'New York Cheesecake',
        category: 'desserts',
        price: 8.99,
        rating: 4.8,
        description: 'Creamy baked cheesecake with berry compote',
        icon: '🍰',
        calories: 420,
        protein: '8g',
        sugar: '35g',
        serving: '1 slice',
        ingredients: 'Cream cheese, graham cracker crust, berry compote'
    },
    {
        id: 21,
        name: 'Chocolate Lava Cake',
        category: 'desserts',
        price: 10.49,
        rating: 4.9,
        description: 'Warm chocolate cake with molten center and vanilla ice cream',
        icon: '🍰',
        calories: 520,
        protein: '10g',
        sugar: '48g',
        serving: '1 cake',
        ingredients: 'Dark chocolate, butter, eggs, flour, vanilla ice cream'
    },
    {
        id: 22,
        name: 'Crème Brûlée',
        category: 'desserts',
        price: 8.49,
        rating: 4.7,
        description: 'Classic French custard with caramelized sugar crust',
        icon: '🍰',
        calories: 350,
        protein: '6g',
        sugar: '32g',
        serving: '1 ramekin',
        ingredients: 'Heavy cream, vanilla bean, egg yolks, sugar'
    },

    // Snacks
    {
        id: 23,
        name: 'Avocado Toast',
        category: 'snacks',
        price: 8.99,
        rating: 4.6,
        description: 'Smashed avocado on artisan sourdough with microgreens',
        icon: '🥪',
        calories: 320,
        protein: '8g',
        sugar: '3g',
        serving: '1 slice',
        ingredients: 'Sourdough bread, avocado, microgreens, cherry tomatoes, olive oil'
    },
    {
        id: 24,
        name: 'Almond Croissant',
        category: 'snacks',
        price: 5.49,
        rating: 4.8,
        description: 'Buttery croissant filled with almond cream and topped with sliced almonds',
        icon: '🥐',
        calories: 420,
        protein: '10g',
        sugar: '22g',
        serving: '1 croissant',
        ingredients: 'Butter, flour, almond cream, sliced almonds, powdered sugar'
    },
    {
        id: 25,
        name: 'Granola Bowl',
        category: 'snacks',
        price: 7.99,
        rating: 4.5,
        description: 'House-made granola with Greek yogurt and fresh berries',
        icon: '🥣',
        calories: 380,
        protein: '14g',
        sugar: '24g',
        serving: '1 bowl',
        ingredients: 'Oats, nuts, Greek yogurt, honey, mixed berries'
    },
    {
        id: 26,
        name: 'Panini Club',
        category: 'snacks',
        price: 10.99,
        rating: 4.7,
        description: 'Grilled chicken, bacon, and cheese on ciabatta bread',
        icon: '🥪',
        calories: 520,
        protein: '32g',
        sugar: '4g',
        serving: '1 sandwich',
        ingredients: 'Ciabatta, grilled chicken, bacon, swiss cheese, tomato, aioli'
    }
];

// ============================================
// Menu State
// ============================================
let currentFilter = 'all';
let displayCount = 8;
let favorites = JSON.parse(localStorage.getItem('procaffinate-favorites')) || [];

// ============================================
// Initialize Menu
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    initMenuFilters();
    initLoadMore();
});

// ============================================
// Render Menu Items
// ============================================
function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    const filteredItems = currentFilter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter);

    const itemsToShow = filteredItems.slice(0, displayCount);

    menuGrid.innerHTML = itemsToShow.map(item => createMenuCard(item)).join('');

    // Update load more button visibility
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = filteredItems.length > displayCount ? 'inline-flex' : 'none';
    }

    // Initialize card interactions
    initMenuCardInteractions();
}

// ============================================
// Create Menu Card HTML
// ============================================
function createMenuCard(item) {
    const isFavorite = favorites.includes(item.id);
    const stars = generateStars(item.rating);

    return `
        <div class="menu-card reveal" data-id="${item.id}" data-category="${item.category}">
            <div class="menu-card-image">
                <div class="menu-card-icon">${item.icon}</div>
                <button class="menu-card-favorite ${isFavorite ? 'active' : ''}" data-id="${item.id}" aria-label="Add to favorites">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <button class="menu-card-info" data-id="${item.id}" aria-label="View nutrition info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </button>
            </div>
            <div class="menu-card-content">
                <div class="menu-card-header">
                    <h3 class="menu-card-title">${item.name}</h3>
                    <div class="menu-card-rating">
                        <span class="rating-stars">${stars}</span>
                        <span class="rating-value">${item.rating}</span>
                    </div>
                </div>
                <p class="menu-card-description">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">$${item.price.toFixed(2)}</span>
                    <button class="menu-card-add" data-id="${item.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// Generate Star Rating HTML
// ============================================
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star full">★</span>';
    }
    if (hasHalfStar) {
        starsHtml += '<span class="star half">★</span>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="star empty">★</span>';
    }

    return starsHtml;
}

// ============================================
// Initialize Menu Filters
// ============================================
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update current filter
            currentFilter = btn.dataset.filter;
            displayCount = 8;

            // Re-render menu with animation
            const menuGrid = document.getElementById('menu-grid');
            menuGrid.style.opacity = '0';
            menuGrid.style.transform = 'translateY(20px)';

            setTimeout(() => {
                renderMenu();
                menuGrid.style.opacity = '1';
                menuGrid.style.transform = 'translateY(0)';
            }, 300);
        });
    });
}

// ============================================
// Initialize Load More
// ============================================
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
        displayCount += 4;
        renderMenu();
    });
}

// ============================================
// Initialize Menu Card Interactions
// ============================================
function initMenuCardInteractions() {
    // Favorite buttons
    document.querySelectorAll('.menu-card-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.dataset.id);
            toggleFavorite(itemId, btn);
        });
    });

    // Add to cart buttons
    document.querySelectorAll('.menu-card-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.dataset.id);
            addToCart(itemId);
        });
    });

    // Nutrition info buttons
    document.querySelectorAll('.menu-card-info').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.dataset.id);
            showNutritionPopup(itemId);
        });
    });
}

// ============================================
// Toggle Favorite
// ============================================
function toggleFavorite(itemId, btn) {
    const index = favorites.indexOf(itemId);
    
    if (index === -1) {
        favorites.push(itemId);
        btn.classList.add('active');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        showNotification('Added to favorites', 'success');
    } else {
        favorites.splice(index, 1);
        btn.classList.remove('active');
        btn.querySelector('svg').setAttribute('fill', 'none');
        showNotification('Removed from favorites', 'info');
    }

    localStorage.setItem('procaffinate-favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

// ============================================
// Update Favorites Count
// ============================================
function updateFavoritesCount() {
    const countEl = document.getElementById('favorites-count');
    if (countEl) {
        countEl.textContent = favorites.length;
        countEl.classList.toggle('show', favorites.length > 0);
    }
}

// ============================================
// Add to Cart (will be connected to cart module)
// ============================================
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('procaffinate-cart')) || [];
    
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

    // Save to localStorage
    localStorage.setItem('procaffinate-cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${item.name} added to cart`, 'success');

    // Animate cart button
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.classList.add('pulse');
        setTimeout(() => cartBtn.classList.remove('pulse'), 500);
    }
}

// ============================================
// Update Cart Count
// ============================================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('procaffinate-cart')) || [];
    const countEl = document.getElementById('cart-count');
    
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = totalItems;
        countEl.classList.toggle('show', totalItems > 0);
    }
}

// ============================================
// Show Nutrition Popup
// ============================================
function showNutritionPopup(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const popup = document.getElementById('nutrition-popup');
    const nutritionIcon = document.getElementById('nutrition-icon');
    const nutritionTitle = document.getElementById('nutrition-title');
    const nutritionPrice = document.getElementById('nutrition-price');
    const nutritionCalories = document.getElementById('nutrition-calories');
    const nutritionProtein = document.getElementById('nutrition-protein');
    const nutritionSugar = document.getElementById('nutrition-sugar');
    const nutritionServing = document.getElementById('nutrition-serving');
    const nutritionIngredients = document.getElementById('nutrition-ingredients-list');
    const nutritionAddBtn = document.getElementById('nutrition-add-btn');

    nutritionIcon.textContent = item.icon;
    nutritionTitle.textContent = item.name;
    nutritionPrice.textContent = `$${item.price.toFixed(2)}`;
    nutritionCalories.textContent = item.calories;
    nutritionProtein.textContent = item.protein;
    nutritionSugar.textContent = item.sugar;
    nutritionServing.textContent = item.serving;
    nutritionIngredients.textContent = item.ingredients;

    // Set add button data
    nutritionAddBtn.dataset.id = item.id;

    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================================
// Close Nutrition Popup
// ============================================
function initNutritionPopup() {
    const popup = document.getElementById('nutrition-popup');
    const closeBtn = document.getElementById('nutrition-close');
    const addBtn = document.getElementById('nutrition-add-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const itemId = parseInt(addBtn.dataset.id);
            addToCart(itemId);
            popup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Initialize popup on load
document.addEventListener('DOMContentLoaded', initNutritionPopup);

// ============================================
// Search Menu Items (for search module)
// ============================================
function searchMenuItems(query) {
    return menuItems.filter(item => {
        const searchString = `${item.name} ${item.description} ${item.category}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
    });
}

// ============================================
// Initialize counts on load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    updateCartCount();
});
