import fs from 'fs';
import path from 'path';

const DESTINATIONS = [
  { key: 'santa_ana', query: 'Santa Ana Volcano El Salvador' },
  { key: 'cerro_verde', query: 'Cerro Verde El Salvador' },
  { key: 'coatepeque', query: 'Lago de Coatepeque' },
  { key: 'ruta_flores', query: 'Ruta de las Flores El Salvador' },
  { key: 'apaneca', query: 'Apaneca El Salvador' },
  { key: 'juayua', query: 'Juayua El Salvador' },
  { key: 'el_imposible', query: 'Parque Nacional El Imposible' },
  { key: 'montecristo', query: 'Montecristo El Salvador' },
  { key: 'el_boqueron', query: 'Volcan de San Salvador' },
  { key: 'el_tunco', query: 'Playa El Tunco' },
  { key: 'el_zonte', query: 'El Zonte El Salvador' },
  { key: 'puerto_libertad', query: 'Puerto de La Libertad' },
  { key: 'costa_del_sol', query: 'Costa del Sol El Salvador' },
  { key: 'jiquilisco', query: 'Bahia de Jiquilisco' },
  { key: 'el_cuco', query: 'Playa El Cuco' },
  { key: 'los_cobanos', query: 'Los Cobanos El Salvador' },
  { key: 'suchitoto', query: 'Suchitoto' },
  { key: 'joya_ceren', query: 'Joya de Ceren' },
  { key: 'tazumal', query: 'Tazumal' },
  { key: 'ataco', query: 'Concepcion de Ataco' },
  { key: 'perquin', query: 'Perquin El Salvador' },
  { key: 'rio_sapo', query: 'Rio Sapo El Salvador' },
  { key: 'san_salvador', query: 'Centro Historico San Salvador' },
  { key: 'pupusas', query: 'Pupusa' },
  { key: 'cafe_salvador', query: 'Coffee plant El Salvador' }
];

const OUTPUT_DIR = './public/assets/destinations';
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function cleanHtml(str) {
  if (!str) return 'Fotografía de archivo documental';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

async function searchAndDownload() {
  const manifest = {};

  for (const dest of DESTINATIONS) {
    console.log(`Searching for ${dest.key} (${dest.query})...`);
    manifest[dest.key] = [];

    try {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(dest.query)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'GiaExperiencesTourism/1.0 (info@giaexperiences.sv)' }
      });
      const data = await res.json();
      const pages = Object.values(data.query?.pages || {});

      let count = 0;
      for (const page of pages) {
        if (count >= 6) break; // Up to 6 photos per destination
        const info = page.imageinfo?.[0];
        if (!info || !info.url) continue;

        // Ensure it is a valid image file, not an svg, pdf or ogg
        const ext = path.extname(page.title).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

        const safeTitle = page.title.replace(/^File:/i, '').replace(/[^a-zA-Z0-9_\-\.]/g, '_').toLowerCase();
        const filename = `${dest.key}_${count + 1}_${safeTitle}`.slice(0, 70) + '.jpg';
        const targetPath = path.join(OUTPUT_DIR, filename);

        // Download image using width thumb if too large, or direct
        let downloadUrl = info.url;
        // Strip URL params
        downloadUrl = downloadUrl.split('?')[0];

        try {
          // If image width > 1600, use thumb
          const thumbUrl = `https://commons.wikimedia.org/w/thumb.php?width=1280&f=${encodeURIComponent(page.title.replace(/^File:/i, ''))}`;
          
          let imgRes = await fetch(thumbUrl, {
            headers: { 'User-Agent': 'GiaExperiencesTourism/1.0 (info@giaexperiences.sv)' }
          });
          
          if (!imgRes.ok) {
            imgRes = await fetch(downloadUrl, {
              headers: { 'User-Agent': 'GiaExperiencesTourism/1.0 (info@giaexperiences.sv)' }
            });
          }

          if (imgRes.ok) {
            const buffer = await imgRes.arrayBuffer();
            if (buffer.byteLength > 5000) { // Valid image
              fs.writeFileSync(targetPath, Buffer.from(buffer));
              
              const rawAuthor = info.extmetadata?.Artist?.value || info.extmetadata?.Credit?.value || 'Wikimedia Commons';
              const rawLicense = info.extmetadata?.LicenseShortName?.value || 'Creative Commons';
              const rawLicenseUrl = info.extmetadata?.LicenseUrl?.value || 'https://creativecommons.org/licenses/';
              const description = info.extmetadata?.ObjectName?.value || info.extmetadata?.ImageDescription?.value || page.title.replace(/^File:/i, '');

              manifest[dest.key].push({
                publicUrl: `/assets/destinations/${filename}`,
                filename,
                title: cleanHtml(description),
                author: cleanHtml(rawAuthor),
                license: cleanHtml(rawLicense),
                licenseUrl: rawLicenseUrl,
                sourceUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`
              });
              count++;
              console.log(`  ✓ Saved ${filename} (${Math.round(buffer.byteLength / 1024)} KB)`);
            }
          }
        } catch (err) {
          console.error(`  ✗ Error downloading ${page.title}:`, err.message);
        }
      }
    } catch (err) {
      console.error(`Error querying ${dest.key}:`, err.message);
    }
  }

  fs.writeFileSync('./src/data/verifiedImagesManifest.json', JSON.stringify(manifest, null, 2));
  console.log('Finished downloading! Manifest saved to src/data/verifiedImagesManifest.json');
}

searchAndDownload();
