#!/bin/bash
echo "Running TypeScript check..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors — fix before pushing"
  exit 1
fi
echo "✓ TypeScript clean — safe to push"
