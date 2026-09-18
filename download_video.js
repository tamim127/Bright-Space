const fs = require('fs');
const https = require('https');

const url = 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-2680-large.mp4';
const dest = 'c:\\Project\\public\\public\\wave.mp4';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode === 200) {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Download completed');
    });
  } else if (res.statusCode === 301 || res.statusCode === 302) {
    https.get(res.headers.location, options, (res2) => {
      const file = fs.createWriteStream(dest);
      res2.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Download completed');
      });
    });
  } else {
    console.log('Failed to download, status code:', res.statusCode);
  }
}).on('error', (err) => {
  console.log('Error:', err.message);
});
