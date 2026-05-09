# Daily Horoscope Messages

A modern web application that provides daily horoscopes for all twelve zodiac signs. The app retrieves data dynamically from the [ohmanda.com Horoscope API](https://ohmanda.com/api/horoscope/) and stores it locally for offline access. It combines intuitive UI design, efficient caching, and seamless network communication to deliver a smooth user experience.

## 🌟 Features

- **Real-time Horoscope Data**: Fetches daily horoscopes for all 12 zodiac signs from the ohmanda.com API
- **Offline Access**: Caches horoscope data locally for up to 24 hours
- **Smart Caching**: Automatically validates cache and falls back to stored data when offline
- **Online/Offline Detection**: Monitors connection status and adapts UI accordingly
- **Interactive UI**: Beautiful, responsive zodiac cards with emojis and visual indicators
- **Error Handling**: Graceful error management with user-friendly messages
- **Cache Management**: Clear cached data with a single click
- **Last Updated Tracking**: Displays when horoscopes were last fetched

## 🏗️ Architecture

### Project Structure

```
Daily-Horoscope-Messages/
├── index.html              # Main HTML structure
├── app.js                  # Main application controller
├── api-service.js          # API service for fetching horoscopes
├── storage-manager.js      # Local storage management
├── zodiac-data.js          # Zodiac sign information and emojis
├── styles.css              # Application styling
├── package.json            # Project metadata and scripts
└── README.md               # This file
```

## 📚 Core Components

### 1. **app.js** - HoroscopeApp Controller
The main application class that orchestrates the entire application:

- **Initialization**: Sets up event listeners and loads initial data
- **Data Fetching**: Fetches horoscopes from the API with error handling
- **UI Rendering**: Dynamically creates zodiac cards with horoscope information
- **State Management**: Tracks online/offline status and cache validity
- **User Interactions**: Handles fetch and clear cache button clicks
- **Loading & Error States**: Manages UI indicators during data loading and errors

**Key Methods:**
- `init()` - Initialize the application
- `loadInitialData()` - Load data from cache or API
- `fetchAndDisplayHoroscopes()` - Async fetch and display horoscopes
- `displayHoroscopes()` - Render horoscope cards on the page
- `createHoroscopeCard()` - Generate individual zodiac cards
- `handleClearCache()` - Clear cached data
- `handleOnline()` / `handleOffline()` - Handle connectivity changes

### 2. **api-service.js** - APIService
Manages all API communications:

- **API Endpoint**: `https://ohmanda.com/api/horoscope/`
- **Fetch Methods**: 
  - `fetchHoroscopes()` - Get all zodiac horoscopes
  - `fetchSignHoroscope(sign)` - Get horoscope for specific sign
  - `isAPIAccessible()` - Check API connectivity
- **Data Transformation**: Normalizes API response to consistent format
- **Error Handling**: Catches and logs API errors

**Response Format:**
```javascript
{
  sign: "Aries",
  horoscope: "Today will be a good day...",
  date_range: "Mar 21 - Apr 19",
  emoji: "🐏"
}
```

### 3. **storage-manager.js** - StorageManager
Handles local storage for offline access:

- **Caching**: Stores horoscope data with timestamps
- **Cache Validation**: Checks if cached data is within 24-hour expiration
- **Retrieval**: Gets cached horoscopes or individual zodiac data
- **Cleanup**: Clears cache when needed

**Storage Keys:**
- `horoscope_data` - Cached horoscope data and timestamp
- Cache expiration: 24 hours

**Key Methods:**
- `saveHoroscopes(data)` - Save horoscopes to local storage
- `getHoroscopes()` - Retrieve cached horoscopes
- `isCacheValid()` - Check cache validity
- `getLastUpdateTime()` - Get formatted last update time
- `clearCache()` - Remove all cached data
- `getZodiacHoroscope(sign)` - Get specific sign's horoscope

### 4. **zodiac-data.js** - Zodiac Information
Provides zodiac sign metadata:

- Zodiac names
- Date ranges
- Emojis
- Color codes
- Helper function: `getZodiacByName(sign)` - Returns zodiac data for a given sign

### 5. **index.html** - HTML Structure
Responsive HTML structure with:

- Header with app title
- Control buttons (Fetch & Clear Cache)
- Zodiac grid container for dynamic cards
- Loading spinner
- Error message display
- Script references in correct order

### 6. **styles.css** - Styling
Comprehensive CSS for:

- Responsive grid layout
- Zodiac card styling with color-coded borders
- Loading spinner animations
- Error message styling
- Offline indicator styling
- Mobile-friendly design

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6 support
- Internet connection for initial data fetch

### Installation

1. Clone or download the repository:
```bash
git clone https://github.com/SwaroopMR/Daily-Horoscope-Messages.git
cd Daily-Horoscope-Messages
```

2. Start a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Or using Node.js:**
```bash
npm start
# or
npm run serve
```

3. Open in browser:
```
http://localhost:8000
```

## 📖 Usage

### Fetch Horoscopes
Click the **"Fetch Today's Horoscopes"** button to fetch the latest horoscopes from the API. The app will:
1. Show a loading spinner
2. Fetch data from the API
3. Enhance with zodiac information
4. Cache the data locally
5. Display zodiac cards

### Clear Cache
Click **"Clear Cache"** to remove all stored horoscope data. You'll need internet to fetch new data.

### Offline Mode
- If you lose internet connection, the app uses cached data automatically
- An offline indicator appears showing cached horoscopes
- Once back online, the indicator disappears
- Cache is valid for 24 hours from last fetch

### Last Updated
The timestamp shows when horoscopes were last successfully fetched and cached.

## 🔄 Data Flow

```
App Initialization
  ↓
[Online?] → Yes → Check Cache Valid?
  ↓                      ↓
  No                 Valid? → Yes → Load from Cache → Display
  ↓                      ↓
Check Cache            No → Fetch from API
  ↓                           ↓
Available?               Transform Data
  ↓                           ↓
Yes → Load & Show           Save to Cache
      Offline Indicator        ↓
  ↓                      Display
  No → Show Error
```

## 🔌 API Integration

The app uses the free [ohmanda.com Horoscope API](https://ohmanda.com/api/horoscope/):

**Endpoint:** `https://ohmanda.com/api/horoscope/`

**Response:** Array of horoscope objects for all 12 zodiac signs

**No Authentication Required**

## 💾 Local Storage

Data stored in browser's `localStorage`:
- **Key:** `horoscope_data`
- **Structure:** 
  ```json
  {
    "data": [...horoscopes],
    "timestamp": 1715337373000
  }
  ```
- **Expiration:** 24 hours from last fetch

## ✨ Features Implementation

### Online/Offline Handling
- Monitors `navigator.onLine` API
- Listens to `online` and `offline` events
- Gracefully falls back to cache when offline
- Provides visual feedback via offline indicator

### Error Handling
- Try-catch blocks for API calls
- Fallback to cache on API errors
- User-friendly error messages
- Automatic error dismissal

### Responsive Design
- Mobile-friendly CSS Grid
- Adaptive card sizing
- Touch-friendly buttons
- Readable on all screen sizes

## 🎨 Zodiac Emojis

Each zodiac sign has a corresponding emoji:
- ♈ Aries: 🐏
- ♉ Taurus: 🐂
- ♊ Gemini: 👯
- ♋ Cancer: 🦀
- ♌ Leo: 🦁
- ♍ Virgo: 👩
- ♎ Libra: ⚖️
- ♏ Scorpio: 🦂
- ♐ Sagittarius: 🏹
- ♑ Capricorn: 🐐
- ♒ Aquarius: 🏺
- ♓ Pisces: 🐠

## 📋 Browser Support

- Chrome/Brave/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Opera: Full support
- Requires: ES6+ JavaScript support, localStorage API

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling and grid layouts
- **JavaScript (ES6+)** - Application logic
- **Fetch API** - Network requests
- **localStorage API** - Client-side storage
- **Navigator API** - Online/offline detection

## 📦 Dependencies

- **Runtime:** None (vanilla JavaScript)
- **Dev:** Optional (http-server for local testing)

## 📝 Package.json Scripts

```bash
npm start    # Start Python HTTP server on port 8000
npm run serve # Start http-server
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**SwaroopMR** - [GitHub Profile](https://github.com/SwaroopMR)

## 🙏 Acknowledgments

- Horoscope data from [ohmanda.com API](https://ohmanda.com/api/horoscope/)
- Inspired by modern web app design principles
- Built with accessibility and user experience in mind

## 🐛 Troubleshooting

### Horoscopes Not Loading
- Check internet connection
- Try clearing browser cache
- Verify ohmanda.com API is accessible
- Check browser console for errors

### Offline Mode Not Working
- Ensure you've fetched data while online
- Check if browser supports localStorage
- Verify cache hasn't expired (24 hours)

### Style Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure styles.css is in same directory
- Check browser developer tools for CSS errors

## 📞 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/SwaroopMR/Daily-Horoscope-Messages/issues).

---

**Made with ✨ and cosmic guidance**
