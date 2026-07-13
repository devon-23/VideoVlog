# 📼 VideoVlog

An automated daily vlog generator that turns raw phone clips into a finished YouTube vlog.

VideoVlog handles:

- 📱 Mobile video uploads
- 🎬 Automatic clip combining
- 🎵 Music selection
- ✍️ Quote generation
- 📝 Dynamic text rendering
- 🖤 Cinematic ending screen
- 🏷️ Automatic vlog titles
- ▶️ YouTube uploading


## Overview

The goal of VideoVlog is to remove the friction of creating daily memories.

Instead of manually editing videos:

```
Record clips
      ↓
Upload
      ↓
VideoVlog processes everything
      ↓
Finished vlog uploaded
```


---

# Architecture

```
                 iPhone App
                     |
                     |
                     v

              Node.js Server
                     |
        ---------------------------
        |            |            |
        v            v            v

   Media Scanner   Timeline    Quote Engine

                     |
                     v

              FFmpeg Pipeline

                     |
                     v

              Final Vlog.mp4

                     |
                     v

              YouTube Upload
```


---

# Pipeline Flow

## 1. Upload

User selects videos from the mobile app.

The app sends:

```
POST /upload
```

The server creates a unique job:

```
jobs/
 └── 1783956301227/
       ├── IMG_1625.mov
       ├── IMG_1630.mov
       └── IMG_1636.mov
```


---

## 2. Metadata Extraction

Video metadata is scanned.

VideoVlog determines:

- Recording date
- Clip order
- Total duration


The vlog date comes from the original media creation date.


---

## 3. Timeline Generation

The system creates a timeline:

Example:

```
00:00 - clip 1
00:04 - clip 2
00:09 - quote appears
00:15 - ending screen
```


---

## 4. Quote Generation

Quotes are selected from:

```
quotes.json
```

Previously used quotes are tracked:

```
history/
 └── used.json
```


Example:

```json
{
  "sections":[
    "Maybe the little things",
    "were the big things",
    "all along"
  ],
  "vibe":"nostalgia"
}
```


---

## 5. Text Rendering

FFmpeg dynamically adds:

- date
- quote sections
- changing positions

Example:

```
Maybe the little things

       were the big things

all along
```


---

## 6. Ending Screen

Every vlog receives the same ending:

```
black_screen.mov
```

This creates consistency between daily uploads.


---

## 7. Title Generation

Each vlog receives:

Example:

```
#193 — Maybe the little things
```


Used titles are tracked to prevent duplicates.


---

# Running VideoVlog

## Backend

Install:

```
npm install
```


Start:

```
npm run server
```


Server:

```
localhost:3000
```


---

## Mobile App


```
cd VideoVlogMobile

npm install

npx expo start
```


---

## Start Everything

From the root folder:

```
npm run dev
```


This starts:

- Node backend
- Expo mobile application


---

# Tech Stack

## Backend

- Node.js
- Express
- FFmpeg
- fluent-ffmpeg
- YouTube API


## Mobile

- React Native
- Expo


## Media

- FFmpeg
- Metadata extraction


---

# Future Features

- [x] Automated vlog generation
- [x] Mobile uploads
- [x] Quote history tracking
- [x] Dynamic text overlays
- [x] YouTube uploading

Planned:

- [ ] Live mobile progress screen
- [ ] Cloud processing
- [ ] Remote server hosting
- [ ] AI generated titles
- [ ] Multiple vlog styles


---

# Created By

Devon