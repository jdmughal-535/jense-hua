"""tools/retime.py — re-time story/shots.json after timeline/words.json changes (e.g. after real Whisper alignment).

  python tools/retime.py --project projects/jensen-huang [--lead 0.12]

Every shot carries `anchor`: the index of the first script word it illustrates. This re-reads timeline/words.json and
sets each shot's start to that word's start minus `lead`; ends stay contiguous. Run it right after
`python tools/transcribe.py --project projects/jensen-huang --script projects/jensen-huang/input/script.txt --lang en --model small`.
"""
import argparse, json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import load_json, save_json
ap = argparse.ArgumentParser(); ap.add_argument("--project", required=True); ap.add_argument("--lead", type=float, default=0.12)
a = ap.parse_args()
sp = os.path.join(a.project, "story", "shots.json"); data = load_json(sp)
words = load_json(os.path.join(a.project, "timeline", "words.json"))["words"]
shots = data["shots"]
for k, s in enumerate(shots):
    s["start"] = 0.0 if k == 0 else round(max(shots[k - 1]["start"] + 0.5, words[s["anchor"]]["start"] - a.lead), 3)
for k, s in enumerate(shots):
    s["end"] = shots[k + 1]["start"] if k + 1 < len(shots) else data["duration"]
save_json(sp, data)
d = sorted(s["end"] - s["start"] for s in shots)
print(f"retimed {len(shots)} shots (median {d[len(d)//2]:.2f}s, min {d[0]:.2f}s, max {d[-1]:.2f}s)")
