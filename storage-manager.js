/**
 * Storage Manager
 * Handles local storage for offline access and caching
 */

class StorageManager {
    constructor() {
        this.storageKey = 'horoscope_data';
        this.timestampKey = 'horoscope_timestamp';
        this.cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }

    /**
     * Save horoscope data to local storage
     * @param {array} data - Horoscope data for all zodiac signs
     */
    saveHoroscopes(data) {
        try {
            const payload = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(payload));
            console.log('Horoscopes saved to local storage');
        } catch (error) {
            console.error('Error saving to local storage:', error);
        }
    }

    /**
     * Retrieve horoscope data from local storage
     * @returns {array|null} Cached horoscope data or null if not available
     */
    getHoroscopes() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return null;
            
            const payload = JSON.parse(stored);
            return payload.data || null;
        } catch (error) {
            console.error('Error retrieving from local storage:', error);
            return null;
        }
    }

    /**
     * Check if cached data is still valid
     * @returns {boolean} True if cache is valid, false if expired
     */
    isCacheValid() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return false;
            
            const payload = JSON.parse(stored);
            const age = Date.now() - payload.timestamp;
            return age < this.cacheExpiration;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get last update timestamp
     * @returns {string} Formatted timestamp or 'Never'
     */
    getLastUpdateTime() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return 'Never';
            
            const payload = JSON.parse(stored);
            const date = new Date(payload.timestamp);
            return date.toLocaleString();
        } catch (error) {
            return 'Unknown';
        }
    }

    /**
     * Clear all cached data
     */
    clearCache() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('Cache cleared');
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }

    /**
     * Get individual zodiac horoscope from cache
     * @param {string} sign - Zodiac sign name
     * @returns {object|null} Horoscope data for the sign
     */
    getZodiacHoroscope(sign) {
        const horoscopes = this.getHoroscopes();
        if (!horoscopes) return null;
        return horoscopes.find(h => h.sign.toLowerCase() === sign.toLowerCase()) || null;
    }
}

// Create global instance
const storage = new StorageManager();
