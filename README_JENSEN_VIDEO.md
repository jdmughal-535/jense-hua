# Who Gets Jensen Huang Next? — aiTrends 2D Studio project

Ready-to-render project: 69 hand-built 2D shots, 16:9, 1080p, 24 fps, SFX only (no music), "Midnight Blue" style.
Everything lives in `projects/jensen-huang/` (config, voiceover, script, timeline, story/shots.json, scenes/).

## 1. One-time setup (needs internet)
```bash
npm install                      # playwright, three, fonts (Fredoka, Nunito, Playfair)
npx playwright install chromium
pip install numpy scipy          # for the sound mix (ffmpeg must be on PATH)
```

## 2. (Recommended) Replace the estimated timing with real Whisper timing
The word timings in `timeline/words.json` were *estimated from pauses in the audio* because Whisper could not be
installed offline. Pictures land close to the right words, but for exact sync run:
```bash
pip install faster-whisper
python tools/transcribe.py --project projects/jensen-huang --script projects/jensen-huang/input/script.txt --lang en --model small
python tools/retime.py --project projects/jensen-huang      # re-times every shot to the real word times
```

## 3. Check, preview, render
```bash
node render.mjs --project projects/jensen-huang --sheet                     # contact sheets in projects/jensen-huang/build/sheets
node render.mjs --project projects/jensen-huang --from 0 --to 30 --scale 0.5 # quick preview -> build/preview.mp4
node render.mjs --project projects/jensen-huang --format jpeg                # full render -> build/video_silent.mp4 (~3,970 frames)
python audio/mix.py --project projects/jensen-huang                          # SFX + ambience + voice, -14 LUFS, muxes out/<title>.mp4
```
Rough time: about 2 frames/s on a small CPU, 4–10 frames/s on a modern desktop (add `--workers N` to use more cores).

## 4. Tweaks
- Look: `config.json` → `"style"`: `dusk`, `midnight` (current), `golden`, `neon`, `storybook`. Compare all: `node render.mjs --project projects/jensen-huang --styles dusk,midnight,golden,neon,storybook`.
- Title: `config.json` → `"title"` (also the output file name).
- Music: set `config.json` → `music.enabled: true` (generated) or `music.file: "input/music.mp3"`.
- Resolution: `config.json` → `"resolution"`: `720p | 1080p | 1440p | 2160p`.
- Shots live in `projects/jensen-huang/scenes/shots/01…04_*.js`; one `registerShot('sNNN', …)` per shot, matching `story/shots.json`.
- Fact check before publishing: Polymarket percentages, the 1,600 figure, the Trump quote and the Dec 1 hearing date come from your script. Also, Nvidia's earnings report may already be out by the time this goes live.
