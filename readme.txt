# YouTube Playlist Duration Calculator

A simple web tool to calculate the total duration of all videos in a YouTube playlist. Just paste a YouTube playlist URL and get the total hours, minutes, and seconds of content.

## Features

- **Easy to Use**: Simply paste a YouTube playlist URL and click calculate
- **Accurate Duration**: Fetches real-time data from YouTube API
- **Multiple Formats**: Shows total duration in hours, minutes, and seconds
- **Video Count**: Displays the number of videos in the playlist
- **Responsive Design**: Works on desktop and mobile devices
- **No Installation Required**: Runs entirely in the browser

## How to Use

1. Open the tool in your web browser
2. Paste a YouTube playlist URL in the input field
3. Click the "Calculate Duration" button
4. View the total duration and video count

## Supported URL Formats

The tool supports various YouTube playlist URL formats:
- `https://www.youtube.com/playlist?list=PLxxxxxx`
- `https://youtube.com/playlist?list=PLxxxxxx`
- `https://www.youtube.com/watch?v=xxxxx&list=PLxxxxxx`
- `https://youtu.be/xxxxx?list=PLxxxxxx`

## Technical Details

### Technologies Used
- **HTML5**: Structure and layout
- **CSS3**: Styling and responsive design
- **JavaScript**: Core functionality and API integration
- **YouTube Data API v3**: Fetching playlist and video data

### API Requirements
To use this tool, you'll need:
1. A Google Cloud Console account
2. YouTube Data API v3 enabled
3. An API key with YouTube Data API access

### Setup Instructions

1. **Get YouTube API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Restrict the API key to YouTube Data API v3

2. **Configure the Tool**:
   - Replace `YOUR_API_KEY_HERE` in the JavaScript code with your actual API key
   - Host the HTML file on a web server or open locally

### File Structure
```
youtube-playlist-calculator/
├── index.html          # Main HTML file
├── style.css           # CSS styles (embedded)
├── script.js           # JavaScript logic (embedded)
└── README.md           # This file
```

## Features Explained

### Duration Calculation
- Fetches all videos in the playlist using YouTube API
- Converts ISO 8601 duration format to seconds
- Sums up all video durations
- Displays in human-readable format (hours:minutes:seconds)

### Error Handling
- Invalid URL detection
- Private/unavailable playlist handling
- API rate limit management
- Network error handling

### Performance
- Efficient API calls with pagination
- Minimal data fetching (only required fields)
- Responsive user interface

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Limitations

- Requires internet connection
- Subject to YouTube API quotas
- Private playlists cannot be accessed
- Age-restricted content may not be included

## Privacy

- No data is stored or transmitted to external servers
- All processing happens in your browser
- YouTube API calls are made directly from your browser

## Contributing

Feel free to contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter issues:
1. Check that your API key is valid and has proper permissions
2. Ensure the playlist URL is public and accessible
3. Verify your internet connection
4. Check browser console for error messages

## Future Enhancements

- Playlist comparison feature
- Export results to CSV
- Average video duration calculation
- Most common video length analysis
- Playlist statistics and insights

---

**Note**: This tool is not affiliated with YouTube or Google. It uses the official YouTube Data API v3 for fetching playlist information.