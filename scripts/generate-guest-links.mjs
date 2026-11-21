import fs from 'node:fs';
const site = (process.env.SITE_URL || 'https://YOUR-VERCEL-DOMAIN.vercel.app').replace(/\/$/, '');
const rows = [['Guest ID','Invitation URL','QR Token']];
for (let i=1;i<=250;i++) {
  const id=`G${String(i).padStart(3,'0')}`;
  rows.push([id,`${site}/?id=${id}`,`RUDRA-ENTRY-${id}-2026`]);
}
const csv=rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
fs.writeFileSync('guest-links.csv',csv,'utf8');
console.log('Created guest-links.csv with 250 unique invitation links.');
console.log('Set SITE_URL to your deployed invitation URL before running for real guests.');
