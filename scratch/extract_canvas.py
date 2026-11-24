import json, base64

step_file = r'C:\Users\Shreyam\.gemini\antigravity\brain\9ea9d0a4-f51a-4019-b233-94e10f3118cb\.system_generated\steps\16894\output.txt'
with open(step_file, 'r', encoding='utf-8') as f:
    text = f.read()

if 'data:image/png;base64,' in text:
    b64 = text.split('data:image/png;base64,')[1].split('"')[0]
    data = base64.b64decode(b64)
    with open('scratch/game_canvas_live.png', 'wb') as out:
        out.write(data)
    print('Saved canvas snapshot to scratch/game_canvas_live.png (bytes:', len(data), ')')
else:
    print('No base64 found in step file')
