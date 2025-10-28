#!/bin/bash

# Workaround for Node.js < 20.12.0 styleText compatibility issue
# This script patches the Metro bundler and starts it

echo "🔧 Patching Metro bundler for Node.js compatibility..."

# Patch the runServer.js file
RUNSERVER_FILE="node_modules/@react-native/community-cli-plugin/dist/commands/start/runServer.js"

if [ -f "$RUNSERVER_FILE" ]; then
  # Create backup if it doesn't exist
  if [ ! -f "$RUNSERVER_FILE.backup" ]; then
    cp "$RUNSERVER_FILE" "$RUNSERVER_FILE.backup"
  fi
  
  # Replace styleText calls with plain strings
  sed -i.tmp 's/(0, _util\.styleText)([^,]*, \([^)]*\))/\1/g' "$RUNSERVER_FILE"
  rm -f "$RUNSERVER_FILE.tmp"
  
  echo "✅ Metro bundler patched successfully"
else
  echo "❌ runServer.js not found"
  exit 1
fi

echo "🚀 Starting Metro bundler..."
npx react-native start --reset-cache
