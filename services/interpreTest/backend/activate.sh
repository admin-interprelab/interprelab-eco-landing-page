#!/bin/bash
# Activate virtual environment and provide helpful commands

echo "================================================"
echo "  InterpreTest Backend - Virtual Environment"
echo "================================================"
echo ""

# Check if venv exists
if [ ! -f "venv/bin/activate" ]; then
    echo "Virtual environment not found. Creating..."
    python3 -m venv venv
    echo "Virtual environment created!"
    echo ""
fi

# Activate venv
source venv/bin/activate

echo "Virtual environment activated!"
echo "Python location: $(which python)"
echo ""
echo "================================================"
echo "  Available Commands:"
echo "================================================"
echo "  pip install -r requirements.txt  - Install dependencies"
echo "  python -m spacy download es_core_news_lg  - Download Spanish model"
echo "  python -m spacy download en_core_web_lg   - Download English model"
echo "  python -m spacy download en_core_sci_md   - Download Medical model"
echo "  uvicorn app.main:app --reload --port 8001 - Run dev server"
echo "  jupyter lab                                - Start Jupyter"
echo "  pytest tests/                              - Run tests"
echo "================================================"
echo ""
