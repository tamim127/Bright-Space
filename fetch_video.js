fetch('https://bluncy.framer.website/').then(r=>r.text()).then(t=>{
    const urls=t.match(/https:\/\/[^"']+\.(?:mp4|webm)/g);
    console.log(urls ? urls : 'no video found');
});
