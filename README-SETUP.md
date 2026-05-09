# Daily Horoscope Messages - Setup Guide

## Overview

The Daily Horoscope Messages is a web application that provides daily horoscopes for all twelve zodiac signs. The app retrieves data dynamically from the [OhManda API](https://ohmanda.com/api/horoscope/) and stores it locally for offline access.

## Features

✨ **Core Features:**
- Display horoscopes for all 12 zodiac signs
- Fetch data from online API
- Store data locally for offline access
- Beautiful and intuitive UI
- Responsive design
- Online/offline status detection
- Cache management

## Project Structure

```
Daily-Horoscope-Messages/
├── index.html              # Main HTML file
├── styles.css             # Styling
├── zodiac-data.js         # Zodiac signs data
├── storage-manager.js     # Local storage management
├── api-service.js         # API communication
├── app.js                 # Main application logic
├── package.json           # Project metadata
├── .gitignore            # Git ignore rules
└── README-SETUP.md       # Setup documentation
```

## Installation

### Quick Start (No Installation Required)

1. Clone the repository:
```bash
git clone https://github.com/SwaroopMR/Daily-Horoscope-Messages.git
cd Daily-Horoscope-Messages
```

2. Open `index.html` in your web browser

### Using Local Server (Recommended)

#### Option 1: Python (Python 3)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 2: Python (Python 2)
```bash
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 3: Node.js
```bash
npx http-server
```
Then open `http://localhost:8080` in your browser.

## How It Works

### Architecture

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
    ┌────▼────────────────────┐
    │    app.js (Controller)   │
    └────┬────────────────────┘
         │
    ┌────┼─────────────────┬──────────────┐
    │    │                 │              │
┌───▼─┐ ┌──▼──────────┐   ┌▼──────────┐ ┌▼────────────┐
│UI   │ │API Service │   │Storage    │ │Zodiac Data │
└─────┘ │(OhManda)   │   │Manager    │ │(12 Signs)  │
        └────────────┘   └───────────┘ └────────────┘
```

### Data Flow

1. **Initialization**: App checks for cached data
2. **Cache Valid?**: If yes, display cached horoscopes
3. **Cache Invalid/Expired**: Fetch from API if online
4. **API Fetch**: Get latest horoscope data
5. **Storage**: Save to local storage
6. **Display**: Render horoscopes to UI
7. **Offline Mode**: Use cached data when offline

## File Descriptions

### index.html
- Main HTML structure
- Contains UI elements for zodiac cards, buttons, and loading states
- Links to CSS and JavaScript files

### styles.css
- Modern gradient backgrounds
- Responsive grid layout for zodiac cards
- Animations and hover effects
- Mobile-friendly design
- Dark mode compatible

### zodiac-data.js
- Defines all 12 zodiac signs
- Contains sign names, symbols, emojis, and date ranges
- Helper functions to retrieve zodiac data

### storage-manager.js
- **StorageManager Class**: Manages local storage operations
- Methods:
  - `saveHoroscopes()`: Save data to localStorage
  - `getHoroscopes()`: Retrieve cached data
  - `isCacheValid()`: Check if cache is fresh (24-hour expiration)
  - `getLastUpdateTime()`: Get formatted timestamp
  - `clearCache()`: Remove cached data
  - `getZodiacHoroscope()`: Get specific sign's horoscope

### api-service.js
- **APIService Class**: Handles API communication
- Methods:
  - `fetchHoroscopes()`: Get all horoscopes from API
  - `fetchSignHoroscope()`: Get specific sign horoscope
  - `transformData()`: Convert API response to app format
  - `getEmojiForSign()`: Map sign to emoji
  - `isAPIAccessible()`: Check API availability

### app.js
- **HoroscopeApp Class**: Main application controller
- Key Methods:
  - `init()`: Initialize the app
  - `loadInitialData()`: Load cached or fetch new data
  - `fetchAndDisplayHoroscopes()`: Fetch and render horoscopes
  - `displayHoroscopes()`: Render to UI
  - `createHoroscopeCard()`: Generate card HTML
  - `handleOnline()`: Handle online status
  - `handleOffline()`: Handle offline status

## Usage

### Fetching Horoscopes
1. Click "Fetch Today's Horoscopes" button
2. App fetches from API and displays all 12 zodiac signs
3. Data is automatically saved to browser's local storage

### Offline Access
1. App automatically detects offline status
2. Displays cached horoscopes with offline indicator
3. No internet connection needed for cached data

### Clearing Cache
1. Click "Clear Cache" button
2. Confirm deletion
3. All stored data is removed
4. Fetch again to reload horoscopes

## API Information

**API Endpoint**: `https://ohmanda.com/api/horoscope/`

**Response Format**:
```json
[
  {
    "sign": "Aries",
    "horoscope": "Today's horoscope text...",
    "date_range": "Mar 21 - Apr 19"
  },
  ...
]
```

## Caching Strategy

- **Cache Duration**: 24 hours
- **Storage Method**: Browser's localStorage
- **Fallback**: If cache expires and offline, expired cache is used
- **Manual Clear**: User can manually clear cache via button

## Browser Compatibility

- ✅ Chrome/Chromium (88+)
- ✅ Firefox (85+)
- ✅ Safari (14+)
- ✅ Edge (88+)
- ⚠️ Internet Explorer 11 (limited support)

## Features in Detail

### Responsive Design
- Desktop: 3-column grid layout
- Tablet: 2-column layout
- Mobile: Single column layout

### Accessibility
- Semantic HTML
- Color contrast compliance
- Keyboard navigation support
- ARIA labels where needed

### Performance
- Efficient caching (24-hour validity)
- Lazy loading of data
- Minimal DOM manipulation
- Optimized CSS animations

## Troubleshooting

### Issue: "Failed to fetch horoscopes"
**Solution**: 
- Check internet connection
- Verify API is accessible: https://ohmanda.com/api/horoscope/
- Check browser console for specific errors

### Issue: No data displayed offline
**Solution**:
- Fetch horoscopes once while online
- This will cache the data
- Then you can access offline

### Issue: Stale data showing
**Solution**:
- Click "Clear Cache" button
- Then click "Fetch Today's Horoscopes"
- Fresh data will be loaded

## Development

### Adding New Features
1. Modify `index.html` for new UI elements
2. Update `styles.css` for styling
3. Add logic to `app.js` for functionality
4. Test in browser console

### Debugging
Open browser Developer Tools (F12) and check:
- Network tab for API calls
- Application tab for localStorage data
- Console for error messages

## Future Enhancements

- [ ] Add mood/compatibility ratings
- [ ] Store user favorite signs
- [ ] Add notifications for daily updates
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Search/filter functionality
- [ ] Share horoscope feature
- [ ] Historical horoscopes

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console errors
3. Open an issue on GitHub

## Credits

- API provided by [OhManda](https://ohmanda.com/api/horoscope/)
- Zodiac emoji and data from standard sources
- Built with vanilla JavaScript (no frameworks)

---

**Happy horoscope reading!** ✨🌟
