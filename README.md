# 📼 VideoVlog

Turns raw phone clips into a finished, uploaded YouTube vlog — record on your phone, tap upload, get a rendered daily vlog on your channel with music, quote overlays, and a consistent ending screen.

## What it does

- 📱 Takes video uploads from a companion mobile app (Expo/React Native)
- 🎬 Stitches clips into a single timeline, ordered by the clips' real recording time
- 🎵 Picks a random instrumental track and mixes it in
- ✍️ Overlays a rotating quote (never repeats one until the pool is exhausted)
- 🏷️ Generates a title, tagged with the day-of-year number
- 🖤 Appends the same cinematic black ending screen to every vlog
- ▶️ Uploads the finished video straight to your YouTube channel

## How it works

```
   Phone (Expo app)
         │  POST /upload (video files)
         ▼
   Node/Express server  ──────────────────────────┐
         │                                          │
         ▼                                          │
   jobs/<timestamp>/  (raw clips land here)          │
         │                                          │
         ▼                                          │
   Media scanner → reads each clip's real            │
   creation date/metadata, builds a timeline          │
         │                                          │
         ▼                                          │
   FFmpeg renders the silent video, mixes in         │
   music, overlays date + quote text, appends        │
   the ending screen                                  │
         │                                          │
         ▼                                          │
   YouTube Data API upload  ───────────────────────►  your channel
         │
         ▼
   Job folder deleted, quote/title marked as used
```

The date shown on the vlog comes from the clips' actual metadata (when you filmed them), not from when you happened to upload. Quotes and titles are tracked in `history/used.json` so the same one never shows up twice until the whole list has cycled through.

## Project layout

```
src/
  app.js                 Express server — /upload and /events (live status) routes
  config.js               Paths + render profile (resolution/fps)
  pipeline/generateVlog.js  Orchestrates the whole render → upload flow
  timeline/                Scans clips, reads metadata, builds the render timeline
  renderer/                FFmpeg rendering steps (video, ending screen, final text)
  text/                    Date + quote overlay positioning/timing
  quotes/, titles/         Quote and title pools + selection logic
  youtube/                 OAuth + upload to the YouTube Data API

VideoVlogMobile/          Expo/React Native app you run on your phone
music/                    Instrumental tracks the mixer picks from
assets/ending.mov         The fixed clip appended to every vlog
history/used.json         Tracks which quotes/titles have already been used
jobs/                     Working folder for in-progress uploads (cleaned up automatically)
output/                   Rendered intermediate/final video files for the current job
```

## Setup

### 1. Install dependencies

```
npm install
```

FFmpeg itself is bundled via `ffmpeg-static`/`ffprobe-static` — you don't need to install it separately.

### 2. Set up YouTube access

1. In [Google Cloud Console](https://console.cloud.google.com/), create (or reuse) a project and enable the **YouTube Data API v3**.
2. Under **APIs & Services → Credentials**, create an **OAuth client ID** of type **Desktop app**, and download the JSON.
3. Save that downloaded file as **both** `client_secret.json` and `credentials.json` in the project root (the upload code reads one, the re-auth script reads the other — they're the same client).
4. Run the one-time authorization:

   ```
   npm run reauth
   ```

   This opens your browser to Google's consent screen; click **Allow** and it writes `token.json` automatically — no copy-pasting a code.

None of `client_secret.json`, `credentials.json`, or `token.json` are committed to git (they're gitignored) — you need to do this setup on every machine you run the server from.

> **Token expired?** Just run `npm run reauth` again. If it's expiring weekly, check the OAuth consent screen's **Publishing status** in Google Cloud Console — apps left in "Testing" have refresh tokens that hard-expire after 7 days. Switching to "In production" fixes it for good.

### 3. Point the mobile app at your computer

The phone app talks to the server over your local network, so it needs your computer's LAN IP (not `localhost`). Find yours with `ipconfig getifaddr en0` (Wi-Fi) on macOS, then set it in `VideoVlogMobile/src/constants/config.ts`:

```ts
export const SERVER = "http://<your-computer's-LAN-IP>:3000";
```

Your phone and computer need to be on the same Wi-Fi network.

## Running it

Start the backend server:

```
npm start
```

Runs on `localhost:3000` (and your LAN IP, for the phone).

Start the mobile app:

```
npm run mobile
```

Opens Expo — scan the QR code with your phone (Expo Go app) to load it.

Or start both together:

```
npm run dev
```

## Roadmap

- [x] Automated end-to-end vlog generation
- [x] Mobile uploads with live status
- [x] Quote/title history tracking
- [x] YouTube uploading
- [ ] Cloud-hosted server (no computer required to be on/nearby)
- [ ] AI-generated titles
- [ ] Multiple export styles (e.g. vertical for Shorts/TikTok)

## Created by

Devon
