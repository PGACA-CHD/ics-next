const fs = require('fs');
const path = require('path');

const directories = ['from-uk', 'from-usa', 'from-singapore', 'from-dubai', 'from-canada'];
const basePath = path.join(__dirname, 'src', 'app', 'company-registration');

const styleToReplace = `
        @media(max-width:860px){
          .proc-3col{grid-template-columns:1fr!important;}
          .proc-3col>div:nth-child(1){padding:28px 24px;}
          .proc-3col>div:nth-child(2){border-left:none!important;border-right:none!important;border-top:1px solid rgba(0,0,0,0.08);border-bottom:1px solid rgba(0,0,0,0.08);}
          .proc-3col>div:nth-child(3){padding:28px 24px;}
          .why-eq-grid{grid-template-columns:1fr 1fr!important;grid-auto-rows:auto;}
          .hero-g{grid-template-columns:1fr!important;gap:36px!important;}
          .hero-g>div:last-child{display:none;}
          .doc-tl-row{grid-template-columns:64px 1fr!important;min-height:auto!important;padding:16px 0;}
          .doc-tl-content-l,.doc-tl-content-r{grid-column:2!important;grid-row:1!important;visibility:visible!important;text-align:left!important;padding:0 0 0 20px!important;}
          .doc-tl-content-l p{margin-left:0!important;}
          .tl-left .doc-tl-content-r,.tl-right .doc-tl-content-l{display:none;}
        }`;

const newStyle = `
        /* NO borders between sections */
        .sec-div { border-top: none; }

        /* Headings: always centered, at every screen size, regardless of parent flex/grid context */
        .sec-heading-wrap { text-align:center !important; width:100%; margin-left:auto; margin-right:auto; }
        .sec-heading-wrap > * { margin-left:auto !important; margin-right:auto !important; text-align:center !important; }

        /* 861px – 1200px: collapse the straddling two-column doc timeline into the same
           clean single-side layout used on mobile, just with more breathing room, so
           nothing drifts off-centre or overlaps the middle line in this in-between range */
        @media(max-width:1200px){
          .doc-tl { max-width:640px !important; padding:10px 24px !important; }
          .doc-tl-line, .doc-tl-line-fill, .doc-tl-cap { left:32px !important; }
          .doc-tl-cap { transform:translateX(-4px) !important; }
          .doc-tl-row { grid-template-columns:64px 1fr !important; min-height:auto !important; padding:18px 0; }
          .doc-tl-row > div:nth-child(2) { grid-column:1; grid-row:1; justify-content:flex-start !important; }
          .doc-tl-row > div:nth-child(2) > div { width:52px !important; height:52px !important; }
          .doc-tl-row > div:nth-child(2) > div > div { width:40px !important; height:40px !important; }
          .doc-tl-content-l,.doc-tl-content-r { grid-column:2 !important; grid-row:1 !important; visibility:visible !important; text-align:left !important; padding:0 0 0 24px !important; }
          .doc-tl-content-l p { margin-left:0 !important; }
          .tl-left .doc-tl-content-r,.tl-right .doc-tl-content-l { display:none; }
        }
        @media(max-width:860px){
          .proc-3col { grid-template-columns:1fr !important; }
          .proc-3col > div:nth-child(1) { padding:28px 24px; }
          .proc-3col > div:nth-child(2) { border-left:none !important; border-right:none !important; border-top:1px solid rgba(0,0,0,0.08); border-bottom:1px solid rgba(0,0,0,0.08); }
          .proc-3col > div:nth-child(3) { padding:28px 24px; }
          .why-eq-grid { grid-template-columns:1fr 1fr !important; grid-auto-rows:auto; }
          .hero-g { grid-template-columns:1fr !important; gap:36px !important; }
          .hero-g > div:last-child { display:none; }
        }`;

directories.forEach(dir => {
  const filePath = path.join(basePath, dir, 'page.jsx');
  if (!fs.existsSync(filePath)) {
    console.log("Missing:", filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace style media queries
  if (content.includes(".sec-heading-wrap")) {
     console.log("Already updated styles for", dir);
  } else {
     // The files might have slightly different @media(max-width:860px) block spacing
     // Let's replace by finding from '@media(max-width:860px){' to right before '@media(max-width:580px){'
     
     const media860Start = content.indexOf('@media(max-width:860px){');
     const media580Start = content.indexOf('@media(max-width:580px){');
     if (media860Start !== -1 && media580Start !== -1) {
       const toReplace = content.substring(media860Start, media580Start);
       content = content.replace(toReplace, newStyle + "\n        ");
       
       // also remove '.sec-div{border-top:none;}' if it exists earlier
       content = content.replace(".sec-div{border-top:none;}", "");
     }
  }

  // Add class names to DocTimeline
  content = content.replace(
    /<div ref=\{wrapRef\} style=\{\{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '10px 0' \}\}>/g,
    `<div ref={wrapRef} className="doc-tl" style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '10px 0' }}>`
  );
  content = content.replace(
    /<div style=\{\{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'rgba\(9,48,36,0\.12\)', transform: 'translateX\(-1px\)' \}\} \/>/g,
    `<div className="doc-tl-line" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'rgba(9,48,36,0.12)', transform: 'translateX(-1px)' }} />`
  );
  content = content.replace(
    /<div style=\{\{ position: 'absolute', top: 0, left: '50%', width: 2, height: \`\$\{progress \* 100\}%\`, background: GREEN, transform: 'translateX\(-1px\)', transition: 'height 0\.15s linear', borderRadius: 2 \}\} \/>/g,
    `<div className="doc-tl-line-fill" style={{ position: 'absolute', top: 0, left: '50%', width: 2, height: \`\$\{progress * 100\}%\`, background: GREEN, transform: 'translateX(-1px)', transition: 'height 0.15s linear', borderRadius: 2 }} />`
  );
  content = content.replace(
    /<div style=\{\{ position: 'absolute', top: -4, left: '50%', width: 10, height: 10, borderRadius: '50%', background: GREEN, transform: 'translateX\(-5px\)' \}\} \/>/g,
    `<div className="doc-tl-cap" style={{ position: 'absolute', top: -4, left: '50%', width: 10, height: 10, borderRadius: '50%', background: GREEN, transform: 'translateX(-5px)' }} />`
  );
  content = content.replace(
    /<div style=\{\{ position: 'absolute', bottom: -4, left: '50%', width: 10, height: 10, borderRadius: '50%', background: progress > 0\.98 \? GREEN : 'rgba\(9,48,36,0\.18\)', transform: 'translateX\(-5px\)', transition: 'background 0\.3s ease' \}\} \/>/g,
    `<div className="doc-tl-cap" style={{ position: 'absolute', bottom: -4, left: '50%', width: 10, height: 10, borderRadius: '50%', background: progress > 0.98 ? GREEN : 'rgba(9,48,36,0.18)', transform: 'translateX(-5px)', transition: 'background 0.3s ease' }} />`
  );

  // Replace text-align center divs with sec-heading-wrap
  content = content.replace(
    /<div style=\{\{ textAlign: 'center', marginBottom: 36 \}\}>/g,
    `<div className="sec-heading-wrap" style={{ marginBottom: 36 }}>`
  );
  content = content.replace(
    /<div style=\{\{ textAlign: 'center', marginBottom: 56 \}\}>/g,
    `<div className="sec-heading-wrap" style={{ marginBottom: 56 }}>`
  );
  content = content.replace(
    /<div style=\{\{ textAlign: 'center', marginBottom: 32 \}\}>/g,
    `<div className="sec-heading-wrap" style={{ marginBottom: 32 }}>`
  );
  
  // Wait, UK/USA might have `<div style={{ textAlign: 'center', marginBottom: 36 }}>` or similar, I'll also just check globally for `textAlign: 'center'` in a div wrapper
  // We can do a regex to catch `<div style={{ textAlign: 'center', marginBottom: (\d+) }}>`
  content = content.replace(
    /<div style=\{\{ textAlign: 'center', marginBottom: (\d+) \}\}>/g,
    `<div className="sec-heading-wrap" style={{ marginBottom: $1 }}>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Updated", dir);
});
