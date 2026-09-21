import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const SITE = 'https://www.indiacompanysetup.com';
const OUT = path.resolve('public');

const IMAGES = [
  // Hero/background banners — resize to 1920w, quality 80
  { src: '/banners and logos/1.png', out: 'banners-and-logos/1.webp', w: 1920, q: 80 },
  { src: '/banners and logos/2.png', out: 'banners-and-logos/2.webp', w: 1920, q: 80 },
  { src: '/banners and logos/Home pg medium size banner.png', out: 'banners-and-logos/home-banner.webp', w: 1920, q: 80 },
  { src: '/banners and logos/Knowledge partner-2.png', out: 'banners-and-logos/knowledge-partner.webp', w: 1200, q: 80 },

  // World map
  { src: '/worldmap.png', out: 'worldmap.webp', w: 1400, q: 80 },

  // Icons — resize from 3375px to 208px (4x retina for 52px display)
  { src: '/banners and logos/Strategy First.png', out: 'icons/strategy-first.webp', w: 208, q: 90 },
  { src: '/banners and logos/Complaince always.png', out: 'icons/compliance-always.webp', w: 208, q: 90 },
  { src: '/banners and logos/Time Zone alligned.png', out: 'icons/time-zone-aligned.webp', w: 208, q: 90 },
  { src: '/banners and logos/Senior Led.png', out: 'icons/senior-led.webp', w: 208, q: 90 },
  { src: '/banners and logos/SAAS.png', out: 'icons/saas.webp', w: 208, q: 90 },
  { src: '/banners and logos/GCCI Captive center.png', out: 'icons/gcc-captive-center.webp', w: 208, q: 90 },
  { src: '/banners and logos/Financial Services.png', out: 'icons/financial-services.webp', w: 208, q: 90 },
  { src: '/banners and logos/Manufacturing.png', out: 'icons/manufacturing.webp', w: 208, q: 90 },
  { src: '/banners and logos/Health and Pharma.png', out: 'icons/health-pharma.webp', w: 208, q: 90 },
  { src: '/banners and logos/E commerce.png', out: 'icons/e-commerce.webp', w: 208, q: 90 },
  { src: '/banners and logos/Clients WorldWide.png', out: 'icons/clients-worldwide.webp', w: 208, q: 90 },
  { src: '/banners and logos/Countries Covered.png', out: 'icons/countries-covered.webp', w: 208, q: 90 },
  { src: '/banners and logos/Markets operate.png', out: 'icons/markets-operate.webp', w: 208, q: 90 },
  { src: '/banners and logos/Client Satisfaction (2).png', out: 'icons/client-satisfaction.webp', w: 208, q: 90 },

  // Setup page banner
  { src: '/banners and logos/private-limited-company-registration (main).png', out: 'banners-and-logos/pvt-ltd-registration.webp', w: 1920, q: 80 },

  // Client logos — resize from 781x468 to 200x120
  { src: '/logos/Protiviti India.png', out: 'logos/protiviti-india.webp', w: 200, q: 90 },
  { src: '/logos/Mahindra Defence Systems.png', out: 'logos/mahindra-defence.webp', w: 200, q: 90 },
  { src: '/logos/Saregama India.png', out: 'logos/saregama-india.webp', w: 200, q: 90 },
  { src: '/logos/Ethos Limited.png', out: 'logos/ethos-limited.webp', w: 200, q: 90 },
  { src: '/logos/Polyplex Corporation Limited (Listed).png', out: 'logos/polyplex-corp.webp', w: 200, q: 90 },
  { src: '/logos/Tube Investment of India.png', out: 'logos/tube-investment.webp', w: 200, q: 90 },
  { src: '/logos/Vibracoustic India Private Limited.png', out: 'logos/vibracoustic.webp', w: 200, q: 90 },
  { src: '/logos/Newtech Filter (BOSCH group Company).png', out: 'logos/newtech-filter-bosch.webp', w: 200, q: 90 },
  { src: '/logos/Godrej, UAE entities.png', out: 'logos/godrej-uae.webp', w: 200, q: 90 },
  { src: '/logos/Ognibene power.png', out: 'logos/ognibene-power.webp', w: 200, q: 90 },
  { src: '/logos/Cloud EQ.png', out: 'logos/cloud-eq.webp', w: 200, q: 90 },
  { src: '/logos/Defacto Infotech India, AU, US.png', out: 'logos/defacto-infotech.webp', w: 200, q: 90 },
  { src: '/logos/CrimsonInsights.png', out: 'logos/crimson-insights.webp', w: 200, q: 90 },
  { src: '/logos/Alleshealth.png', out: 'logos/alleshealth.webp', w: 200, q: 90 },
  { src: '/logos/Foodjam.png', out: 'logos/foodjam.webp', w: 200, q: 90 },
  { src: '/logos/Grid advertising.png', out: 'logos/grid-advertising.webp', w: 200, q: 90 },
  { src: '/logos/Talink.png', out: 'logos/talink.webp', w: 200, q: 90 },
  { src: '/logos/Mcube capital.png', out: 'logos/mcube-capital.webp', w: 200, q: 90 },
  { src: '/logos/SML Mahindra Limited.png', out: 'logos/sml-mahindra.webp', w: 200, q: 90 },
  { src: '/logos/Cheema Boilers Limited.png', out: 'logos/cheema-boilers.webp', w: 200, q: 90 },
  { src: '/logos/AWFIS India Private Limited.png', out: 'logos/awfis.webp', w: 200, q: 90 },
  { src: '/logos/Skin elements.png', out: 'logos/skin-elements.webp', w: 200, q: 90 },
  { src: '/logos/Vyra Life (Modebencura).png', out: 'logos/vyra-life.webp', w: 200, q: 90 },
];

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processImage({ src, out, w, q }) {
  const url = `${SITE}${encodeURI(src)}`;
  const outPath = path.join(OUT, out);
  const dir = path.dirname(outPath);

  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  try {
    const buf = await download(url);
    const img = sharp(buf).resize({ width: w, withoutEnlargement: true });
    await img.webp({ quality: q }).toFile(outPath);
    const origKB = Math.round(buf.length / 1024);
    const { size } = await import('fs').then(fs => fs.promises.stat(outPath));
    const newKB = Math.round(size / 1024);
    console.log(`✓ ${out} — ${origKB} KB → ${newKB} KB (${Math.round((1 - newKB / origKB) * 100)}% saved)`);
  } catch (e) {
    console.error(`✗ ${src} — ${e.message}`);
  }
}

console.log(`\nDownloading and converting ${IMAGES.length} images from ${SITE}...\n`);

let totalOrig = 0, totalNew = 0;
for (const img of IMAGES) {
  await processImage(img);
}

console.log('\nDone! WebP images saved to public/');
console.log('Next step: update image references in JSX to use the new paths.');
