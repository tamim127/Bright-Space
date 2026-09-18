fetch('https://unfixedstudio.framer.website/').then(r=>r.text()).then(t=>{
    const urls=t.match(/https:\/\/[^"']+\.(?:mp4|webm)/gi);
    console.log(urls ? [...new Set(urls)] : 'no video found');
});
