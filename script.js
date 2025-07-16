// Replace with your actual API key
const API_KEY = 'AIzaSyARVLLHEPKEBHpBoQLdOHCd3KVXSrZB52A';
const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const VIDEO_API_URL = 'https://www.googleapis.com/youtube/v3/videos';

document.getElementById('playlist-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('playlist-url').value.trim();
  const errorDiv = document.getElementById('error-message');
  const resultsDiv = document.getElementById('results');
  const thumbImg = document.getElementById('playlist-thumbnail');
  const thumbWrapper = document.getElementById('thumbnail-wrapper');
  // Remove animation classes before hiding
  errorDiv.classList.remove('fade-in-up');
  resultsDiv.classList.remove('fade-in-up');
  errorDiv.textContent = '';
  resultsDiv.style.display = 'none';
  thumbWrapper.style.display = 'none';
  thumbImg.src = '';

  const playlistId = extractPlaylistId(url);
  if (!playlistId) {
    errorDiv.textContent = 'Invalid YouTube playlist URL.';
    return;
  }

  try {
    const videoIds = await fetchAllVideoIds(playlistId);
    if (videoIds.length === 0) {
      errorDiv.textContent = 'No videos found in this playlist.';
      errorDiv.classList.add('fade-in-up');
      return;
    }
    const durationsAndThumb = await fetchVideoDurationsAndThumb(videoIds);
    const durations = durationsAndThumb.durations;
    const thumbnail = durationsAndThumb.thumbnail;
    const totalSeconds = durations.reduce((sum, dur) => sum + dur, 0);
    document.getElementById('video-count').textContent = videoIds.length;
    // Show durations at different speeds
    setDuration('duration-1x', totalSeconds, 1);
    setDuration('duration-1_25x', totalSeconds, 1.25);
    setDuration('duration-1_5x', totalSeconds, 1.5);
    setDuration('duration-1_75x', totalSeconds, 1.75);
    setDuration('duration-2x', totalSeconds, 2);
    // Show thumbnail if available
    if (thumbnail) {
      thumbImg.src = thumbnail;
      thumbWrapper.style.display = 'block';
    } else {
      thumbWrapper.style.display = 'none';
    }
    resultsDiv.style.display = 'block';
    resultsDiv.classList.add('fade-in-up');
  } catch (err) {
    errorDiv.textContent = err.message || 'An error occurred while fetching playlist data.';
    errorDiv.classList.add('fade-in-up');
  }
});

function extractPlaylistId(url) {
  // Support various YouTube playlist URL formats
  const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function fetchAllVideoIds(playlistId) {
  let videoIds = [];
  let nextPageToken = '';
  try {
    do {
      const params = new URLSearchParams({
        part: 'contentDetails',
        maxResults: '50',
        playlistId,
        key: API_KEY,
        pageToken: nextPageToken
      });
      const resp = await fetch(`${API_URL}?${params}`);
      if (!resp.ok) throw new Error('Failed to fetch playlist data.');
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message);
      videoIds.push(...data.items.map(item => item.contentDetails.videoId));
      nextPageToken = data.nextPageToken || '';
    } while (nextPageToken);
  } catch (err) {
    throw new Error('Could not fetch playlist videos. ' + err.message);
  }
  return videoIds;
}

async function fetchVideoDurationsAndThumb(videoIds) {
  let durations = [];
  let thumbnail = null;
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const params = new URLSearchParams({
      part: 'contentDetails,snippet',
      id: batch.join(','),
      key: API_KEY
    });
    const resp = await fetch(`${VIDEO_API_URL}?${params}`);
    if (!resp.ok) throw new Error('Failed to fetch video details.');
    const data = await resp.json();
    if (data.error) throw new Error(data.error.message);
    durations.push(...data.items.map(item => parseISODuration(item.contentDetails.duration)));
    // Get thumbnail from the first video only
    if (thumbnail === null && data.items.length > 0 && data.items[0].snippet && data.items[0].snippet.thumbnails) {
      // Prefer high quality, fallback to default
      const thumbs = data.items[0].snippet.thumbnails;
      thumbnail = (thumbs.maxres && thumbs.maxres.url) || (thumbs.standard && thumbs.standard.url) || (thumbs.high && thumbs.high.url) || (thumbs.medium && thumbs.medium.url) || (thumbs.default && thumbs.default.url) || null;
    }
  }
  return { durations, thumbnail };
}

function parseISODuration(iso) {
  // Example: PT1H2M10S
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const [, h, m, s] = iso.match(regex) || [];
  return (parseInt(h) || 0) * 3600 + (parseInt(m) || 0) * 60 + (parseInt(s) || 0);
}

function setDuration(elementId, totalSeconds, speed) {
  const seconds = totalSeconds / speed;
  document.getElementById(elementId).textContent = formatDuration(seconds);
}

function formatDuration(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}h ${m}m ${s}s`;
} 