#!/bin/bash
# Activate Python virtual environment if it exists
if [ -d ".venv" ]; then
  source .venv/bin/activate
fi

if [ "$ENV" = "production" ]; then
  uvicorn app.main:app --host 0.0.0.0 --port 8000
else
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
fi