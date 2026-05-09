/**
 * Main Application Controller
 * Manages the horoscope application logic
 */

class HoroscopeApp {
    constructor() {
        this.horoscopes = [];
        this.isOnline = navigator.onLine;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.attachEventListeners();
        this.checkOnlineStatus();
        this.loadInitialData();
    }

    /**
     * Attach event listeners to UI elements
     */
    attachEventListeners() {
        const fetchBtn = document.getElementById('fetchBtn');
        const clearBtn = document.getElementById('clearBtn');

        if (fetchBtn) {
            fetchBtn.addEventListener('click', () => this.fetchAndDisplayHoroscopes());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.handleClearCache());
        }

        // Listen for online/offline status changes
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    /**
     * Load initial data (either from cache or API)
     */
    loadInitialData() {
        const cachedData = storage.getHoroscopes();

        if (cachedData && storage.isCacheValid()) {
            console.log('Loading from cache');
            this.displayHoroscopes(cachedData);
            this.updateLastUpdated();
        } else if (this.isOnline) {
            console.log('Cache invalid or unavailable, fetching from API');
            this.fetchAndDisplayHoroscopes();
        } else {
            if (cachedData) {
                console.log('Offline: Loading expired cache');
                this.displayHoroscopes(cachedData);
                this.showOfflineIndicator();
            } else {
                this.showError('No cached data available and offline. Please connect to internet and fetch horoscopes.');
            }
        }
    }

    /**
     * Fetch horoscopes from API and display them
     */
    async fetchAndDisplayHoroscopes() {
        this.showLoading(true);
        this.clearError();

        try {
            if (!this.isOnline) {
                throw new Error('No internet connection. Using cached data.');
            }

            const horoscopes = await apiService.fetchHoroscopes();
            
            // Enhance with zodiac data
            const enhanced = this.enhanceHoroscopes(horoscopes);
            
            // Save to storage
            storage.saveHoroscopes(enhanced);
            
            // Display
            this.displayHoroscopes(enhanced);
            this.updateLastUpdated();
        } catch (error) {
            console.error('Error fetching horoscopes:', error);
            
            // Try to load from cache on error
            const cachedData = storage.getHoroscopes();
            if (cachedData) {
                this.displayHoroscopes(cachedData);
                this.showError(`Error fetching new data. Showing cached horoscopes: ${error.message}`);
            } else {
                this.showError(`Failed to fetch horoscopes: ${error.message}`);
            }
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Enhance horoscope data with zodiac information
     * @param {array} horoscopes - Raw horoscope data
     * @returns {array} Enhanced horoscope data
     */
    enhanceHoroscopes(horoscopes) {
        return horoscopes.map(h => {
            const zodiacData = getZodiacByName(h.sign);
            return {
                ...h,
                emoji: zodiacData?.emoji || '✨',
                color: zodiacData?.color || '#667eea'
            };
        });
    }

    /**
     * Display horoscopes on the page
     * @param {array} horoscopes - Horoscope data to display
     */
    displayHoroscopes(horoscopes) {
        const grid = document.querySelector('.zodiac-grid');
        if (!grid) return;

        grid.innerHTML = '';
        this.horoscopes = horoscopes;

        horoscopes.forEach(h => {
            const card = this.createHoroscopeCard(h);
            grid.appendChild(card);
        });
    }

    /**
     * Create a horoscope card element
     * @param {object} horoscope - Horoscope data
     * @returns {HTMLElement} Card element
     */
    createHoroscopeCard(horoscope) {
        const card = document.createElement('div');
        card.className = 'zodiac-card';
        card.style.borderLeftColor = horoscope.color || '#667eea';

        card.innerHTML = `
            <div class="zodiac-icon">${horoscope.emoji || '✨'}</div>
            <h2>${horoscope.sign}</h2>
            <div class="zodiac-dates">${horoscope.date_range || ''}</div>
            <p class="horoscope-text">${horoscope.horoscope || 'No horoscope available'}</p>
            <div class="horoscope-mood">
                <div class="mood-item">
                    <div class="mood-label">Mood</div>
                    <div class="mood-value">✨</div>
                </div>
                <div class="mood-item">
                    <div class="mood-label">Luck</div>
                    <div class="mood-value">🍀</div>
                </div>
                <div class="mood-item">
                    <div class="mood-label">Energy</div>
                    <div class="mood-value">⚡</div>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Update last updated timestamp display
     */
    updateLastUpdated() {
        const element = document.getElementById('lastUpdated');
        if (element) {
            const time = storage.getLastUpdateTime();
            element.textContent = `Last updated: ${time}`;
        }
    }

    /**
     * Handle clear cache action
     */
    handleClearCache() {
        if (confirm('Are you sure you want to clear cached horoscopes?')) {
            storage.clearCache();
            document.querySelector('.zodiac-grid').innerHTML = '';
            document.getElementById('lastUpdated').textContent = '';
            this.showError('Cache cleared successfully!');
            setTimeout(() => this.clearError(), 3000);
        }
    }

    /**
     * Show loading indicator
     * @param {boolean} show - Whether to show loading
     */
    showLoading(show) {
        const loading = document.getElementById('loading');
        const fetchBtn = document.getElementById('fetchBtn');
        
        if (loading) {
            loading.style.display = show ? 'block' : 'none';
        }
        
        if (fetchBtn) {
            fetchBtn.disabled = show;
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        const errorDiv = document.getElementById('error');
        if (errorDiv) {
            errorDiv.innerHTML = `
                <span>${message}</span>
                <button class="error-close" onclick="this.parentElement.style.display='none';">✕</button>
            `;
            errorDiv.style.display = 'flex';
        }
    }

    /**
     * Clear error message
     */
    clearError() {
        const errorDiv = document.getElementById('error');
        if (errorDiv) {
            errorDiv.style.display = 'none';
            errorDiv.innerHTML = '';
        }
    }

    /**
     * Show offline indicator
     */
    showOfflineIndicator() {
        const grid = document.querySelector('.zodiac-grid');
        if (grid) {
            const indicator = document.createElement('div');
            indicator.className = 'offline-indicator';
            indicator.innerHTML = '📵 You are offline. Showing cached horoscopes.';
            grid.parentElement.insertBefore(indicator, grid);
        }
    }

    /**
     * Handle online status change
     */
    handleOnline() {
        this.isOnline = true;
        console.log('Back online');
        const offlineIndicator = document.querySelector('.offline-indicator');
        if (offlineIndicator) {
            offlineIndicator.remove();
        }
    }

    /**
     * Handle offline status change
     */
    handleOffline() {
        this.isOnline = false;
        console.log('Gone offline');
        this.showOfflineIndicator();
    }

    /**
     * Check current online status
     */
    checkOnlineStatus() {
        this.isOnline = navigator.onLine;
        console.log('Online status:', this.isOnline);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new HoroscopeApp();
    });
} else {
    window.app = new HoroscopeApp();
}
