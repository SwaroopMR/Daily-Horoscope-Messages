/**
 * Zodiac Signs Data
 * Contains information about all 12 zodiac signs
 */

const ZODIAC_SIGNS = [
    {
        name: 'Aries',
        symbol: '♈',
        emoji: '🐏',
        dates: 'Mar 21 - Apr 19',
        color: '#FF6B6B'
    },
    {
        name: 'Taurus',
        symbol: '♉',
        emoji: '🐂',
        dates: 'Apr 20 - May 20',
        color: '#4ECDC4'
    },
    {
        name: 'Gemini',
        symbol: '♊',
        emoji: '👯',
        dates: 'May 21 - Jun 20',
        color: '#FFE66D'
    },
    {
        name: 'Cancer',
        symbol: '♋',
        emoji: '🦀',
        dates: 'Jun 21 - Jul 22',
        color: '#95E1D3'
    },
    {
        name: 'Leo',
        symbol: '♌',
        emoji: '🦁',
        dates: 'Jul 23 - Aug 22',
        color: '#F38181'
    },
    {
        name: 'Virgo',
        symbol: '♍',
        emoji: '👩',
        dates: 'Aug 23 - Sep 22',
        color: '#AA96DA'
    },
    {
        name: 'Libra',
        symbol: '♎',
        emoji: '⚖️',
        dates: 'Sep 23 - Oct 22',
        color: '#FCBAD3'
    },
    {
        name: 'Scorpio',
        symbol: '♏',
        emoji: '🦂',
        dates: 'Oct 23 - Nov 21',
        color: '#A8D8EA'
    },
    {
        name: 'Sagittarius',
        symbol: '♐',
        emoji: '🏹',
        dates: 'Nov 22 - Dec 21',
        color: '#FFB6C1'
    },
    {
        name: 'Capricorn',
        symbol: '♑',
        emoji: '🐐',
        dates: 'Dec 22 - Jan 19',
        color: '#FFDAB9'
    },
    {
        name: 'Aquarius',
        symbol: '♒',
        emoji: '🏺',
        dates: 'Jan 20 - Feb 18',
        color: '#B0E0E6'
    },
    {
        name: 'Pisces',
        symbol: '♓',
        emoji: '🐠',
        dates: 'Feb 19 - Mar 20',
        color: '#FFB7C5'
    }
];

/**
 * Get zodiac sign by name
 * @param {string} name - Sign name
 * @returns {object} Zodiac sign data
 */
function getZodiacByName(name) {
    return ZODIAC_SIGNS.find(sign => sign.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get all zodiac signs
 * @returns {array} All zodiac signs
 */
function getAllZodiacs() {
    return ZODIAC_SIGNS;
}
