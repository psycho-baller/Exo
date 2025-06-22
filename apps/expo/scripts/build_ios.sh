#!/bin/bash

# Check if a .tar.gz file was provided as an argument
if [ $# -eq 0 ]; then
  echo "Error: No arguments provided. Please provide either a bundle identifier or a .tar.gz file."
  echo "Usage: $0 <bundle_identifier> or $0 <path/to/build.tar.gz>"
  exit 1
fi

# Check if the argument is a .tar.gz file
if [[ "$1" == *".tar.gz" ]]; then
  BUILD_NAME=$(basename "$1")
  BUILD_DIR=$(dirname "$1")

  # If a full path wasn't provided, assume it's in the current directory
  if [ "$BUILD_DIR" = "." ]; then
    BUILD_DIR=$(pwd)
  fi

  # Check if the file exists
  if [ ! -f "$1" ]; then
    echo "Error: File $1 not found."
    exit 1
  fi

  # Copy the file to current directory if it's not already here
  if [ "$(realpath "$1")" != "$(pwd)/$BUILD_NAME" ]; then
    cp "$1" .
  fi
else
  # Original build process
  BUNDLE_IDENTIFIER=$1
  echo "Generating the tar.gz build file..."
  BUILD_OUTPUT=$(eas build -p ios --local -e development 2>&1)
  BUILD_NAME=$(echo "$BUILD_OUTPUT" | grep -oE '[^ ]+\.tar\.gz' | tail -n1)

  if [ -z "$BUILD_NAME" ]; then
    echo "Error: Could not determine the build file name."
    exit 1
  fi
  echo "Build file generated: ${BUILD_NAME}"
fi

# Step 2: Extract the tar.gz file
echo "Extracting the build file..."
tar -xzf "${BUILD_NAME}"

# Step 3: Find the .app folder
APP_FOLDER=$(find . -name "*.app" -type d | head -n 1)

if [ -z "$APP_FOLDER" ]; then
  echo "Error: .app folder not found."
  exit 1
fi

echo "Found app folder: ${APP_FOLDER}"

# Rest of your script continues here...
# [Previous content after finding APP_FOLDER]

echo "Found app folder: ${APP_FOLDER}"

# Step 4: Install the app on the simulator
echo "Installing the app on the simulator..."
IS_INSTALLED=$(xcrun simctl install booted "${APP_FOLDER}")

if [ -z "$IS_INSTALLED" ]; then
  echo "Error: Could not install the app on the simulator."
  exit 1
fi

# Step 5: Launch the app on the simulator
echo "Launching the app on the simulator..."
xcrun simctl launch booted "${BUNDLE_IDENTIFIER}"

# Step 6: Cleanup - Delete the tar.gz file and the .app folder if the app was successfully installed
echo "Cleaning up..."
rm -f "${BUILD_NAME}"
rm -rf "${APP_FOLDER}"

echo "Process completed."
