# Rudra Space Construction — Digital Invitation & QR Entry Demo

Event details are based on the supplied invitation:
- Sunday, 22 November 2026
- 7:00 PM–11:00 PM
- Hotel Centre Point, Ramdas Peth, Nagpur

## Run
1. Install Node.js LTS.
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`
5. Open the localhost URL shown.

## Guest links
- `/?id=G001` through `/?id=G250` (each displays a distinct QR token)
- `/scanner` volunteer QR scanner (camera requires HTTPS or localhost)
- `/admin` guest check-in dashboard

## Important demo limitation
The check-in database uses this browser's localStorage. It is suitable for testing on one device only. Different volunteer devices will not synchronize. For real use, connect a backend such as Supabase and perform QR token validation/check-in atomically server-side. QR tokens in this demo are deterministic and are not secure production tokens.

## Generate 250 personalized guest links

After deployment, run from this project folder in a terminal (replace with your actual Vercel domain):

```bash
SITE_URL=https://YOUR-VERCEL-DOMAIN.vercel.app node scripts/generate-guest-links.mjs
```
On Windows PowerShell:
```powershell
$env:SITE_URL="https://YOUR-VERCEL-DOMAIN.vercel.app"; node scripts/generate-guest-links.mjs
```
This creates `guest-links.csv` containing IDs G001-G250 and unique invitation URLs. Each URL loads the same invitation design but displays the matching guest ID and QR token.


**Demo limitation:** QR tokens are predictable and check-ins use browser local storage in this version. Do not use it as secure production entry control until random server-issued tokens, a shared database, and protected volunteer access are configured.
