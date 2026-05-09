/**
 * API Service
 * Handles API calls to fetch horoscope data
 */

class APIService {
    constructor() {
        this.apiUrl = 'https://ohmanda.com/api/horoscope/';
    }

    /**
     * Fetch horoscope data from API
     * @returns {Promise<array>} Array of horoscope data for all zodiac signs
     */
    async fetchHoroscopes() {
        try {
            const response = await fetch(this.apiUrl);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Transform API response to our format
            return this.transformData(data);
        } catch (error) {
            console.error('Error fetching horoscopes:', error);
            throw error;
        }
    }

    /**
     * Fetch horoscope for specific sign
     * @param {string} sign - Zodiac sign name
     * @returns {Promise<object>} Horoscope data for the sign
     */
    async fetchSignHoroscope(sign) {
        try {
            const response = await fetch(`${this.apiUrl}?sign=${sign}`);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching horoscope for ${sign}:`, error);
            throw error;
        }
    }

    /**
     * Transform API response to our standardized format
     * @param {object} data - Raw API response
     * @returns {array} Transformed data
     */
    transformData(data) {
        if (Array.isArray(data)) {
            return data.map(item => ({
                sign: item.sign || item.name || '',
                horoscope: item.horoscope || item.date_range || '',
                date_range: item.date_range || '',
                emoji: this.getEmojiForSign(item.sign || item.name || '')
            }));
        }
        return [];
    }

    /**
     * Get emoji for zodiac sign
     * @param {string} sign - Zodiac sign name
     * @returns {string} Emoji representation
     */
    getEmojiForSign(sign) {
        const emojiMap = {
            'aries': '🐏',
            'taurus': '🐂',
            'gemini': '👯',
            'cancer': '🦀',
            'leo': '🦁',
            'virgo': '👩',
            'libra': '⚖️',
            'scorpio': '🦂',
            'sagittarius': '🏹',
            'capricorn': '🐐',
            'aquarius': '🏺',
            'pisces': '🐠'
        };
        return emojiMap[sign.toLowerCase()] || '✨';
    }

    /**
     * Check if API is accessible
     * @returns {Promise<boolean>} True if API is accessible
     */
    async isAPIAccessible() {
        try {
            const response = await fetch(this.apiUrl, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Create global instance
const apiService = new APIService();
