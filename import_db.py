import os
import django
import json
import subprocess

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.core.models import Question

# Use Node.js to evaluate the JS module and output JSON
print("Running node to parse JS...")
result = subprocess.run(
    ["node", "-e", "const {questionsDB} = require('./static/js/data.js'); console.log(JSON.stringify(questionsDB));"],
    capture_output=True,
    text=True,
    check=True
)

data = json.loads(result.stdout)
print("Parsed data successfully!")

# Map options from 0, 1, 2, 3 to A, B, C, D
OPTION_MAP = {0: 'A', 1: 'B', 2: 'C', 3: 'D'}
CATEGORY_MAP = {
    'math': 'physics',
    'programming': 'computer',
    'iq': 'iq',
}

# Delete existing questions to avoid duplicates on multiple runs
Question.objects.all().delete()
count = 0

for cat, questions in data.items():
    db_cat = CATEGORY_MAP.get(cat, 'iq')
    for q in questions:
        Question.objects.create(
            category=db_cat,
            question_text=q['question'],
            option_a=q['options'][0],
            option_b=q['options'][1],
            option_c=q['options'][2],
            option_d=q['options'][3],
            right_answer=OPTION_MAP[q['correct']],
            marks=1
        )
        count += 1

print(f"Successfully imported {count} questions!")
