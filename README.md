# 🎬 VideoVlog

An automated cinematic daily vlog generator.

VideoVlog takes a folder of clips recorded throughout your day and turns them into a finished YouTube Short with almost no editing required. Instead of opening Premiere Pro or CapCut every evening, the goal is to drop in your clips, click **Generate**, and let the app build the entire video for you.

The finished video includes:

* 📱 Every uploaded clip (no trimming)
* 🖼️ Automatic support for photos (displayed for a few seconds)
* 🎥 Landscape video with intelligent cropping for vertical phone footage
* 🎵 Random royalty-free instrumental music
* 📅 Date overlay based on the media's creation metadata
* 💬 A unique quote displayed section-by-section throughout the video
* ⬛ A cinematic black ending screen with the final quote lingering
* 📝 Automatically generated YouTube title (`#001`, `#177`, etc.)
* 🧠 Quote and title history to prevent duplicates
* 📄 `vlog.json` manifest for every generated video
* ☁️ *(In Progress)* Automatic YouTube upload

---

# Example

Input:

```text
IMG_1023.MOV
IMG_1024.MOV
IMG_1025.MOV
```

Output:

```
📅 07/12/2026

Maybe the little things

↓

were the big things

↓

all along

↓

⬛
all along
```

Title:

```
(don't) look back in anger #193
```

---

# How It Works

```text
📱 Upload clips
        │
        ▼
🔍 Scan media folder
        │
        ▼
📅 Read metadata
(determine actual recording date)
        │
        ▼
🔢 Calculate day of year
(#001 - #365)
        │
        ▼
💬 Select unused quote
        │
        ▼
🎵 Pick random instrumental
        │
        ▼
🎞️ Build video timeline
        │
        ▼
✂️ Crop & render clips
        │
        ▼
📝 Overlay date + quote sections
        │
        ▼
⬛ Append ending screen
        │
        ▼
📄 Generate vlog.json
        │
        ▼
🧠 Save used quote/title history
        │
        ▼
☁️ Upload to YouTube
```

---

# Project Structure

```
VideoVlog/

src/
├── metadata/
├── music/
├── quotes/
├── renderer/
├── text/
├── timeline/
├── youtube/
├── history/
├── titles/
└── app.js

uploads/
music/
output/
```

---

# Current Features

* ✅ Automatic media scanning
* ✅ Landscape rendering
* ✅ Photo support
* ✅ Music selection
* ✅ Metadata-based dates
* ✅ Day-of-year title generation
* ✅ Random quote selection
* ✅ Quote history
* ✅ Title history
* ✅ Dynamic text timeline
* ✅ Ending screen
* ✅ Manifest generation

---

# Planned Features

* [ ] Automatic YouTube upload
* [ ] Vertical TikTok renderer
* [ ] Drag-and-drop web interface
* [ ] AI-generated descriptions
* [ ] Automatic thumbnail generation
* [ ] Music history (avoid repeats)
* [ ] Weather/location metadata
* [ ] Optional transitions between clips
* [ ] Multiple visual themes
* [ ] Scheduled uploads

---

# Philosophy

Life is mostly made of tiny moments that are easy to forget.

This project exists to remove the friction from documenting those moments. Instead of spending time editing, the goal is to make creating a beautiful daily video as effortless as uploading your clips.

Take videos during the day.

Press one button.

Go make coffee.

Come back to a finished vlog.

---

# Tech Stack

* Node.js
* FFmpeg
* Fluent-FFmpeg
* ExifTool
* Google YouTube Data API

```
```
