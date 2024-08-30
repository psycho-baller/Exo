#!/bin/zsh

# Check if bundle identifier is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <bundle-identifier>"
  exit 1
fi

BUNDLE_IDENTIFIER=$1

# Step 1: Generate the tar.gz build file and capture the build name
echo "Generating the tar.gz build file..."
BUILD_OUTPUT=$(eas build -p ios --local -e preview 2>&1)
BUILD_NAME=$(echo "$BUILD_OUTPUT" | grep -oE '[^ ]+\.tar\.gz' | tail -n 1)

if [ -z "$BUILD_NAME" ]; then
  echo "Error: Could not determine the build file name."
  exit 1
fi

echo "Build file generated: ${BUILD_NAME}"

# Step 2: Extract the tar.gz file
echo "Extracting the build file..."
tar -xzf "${BUILD_NAME}"

# Step 3: Find the .app folder
APP_FOLDER=$(find . -name "*.app" -type d)

if [ -z "$APP_FOLDER" ]; then
  echo "Error: .app folder not found."
  exit 1
fi

echo "Found app folder: ${APP_FOLDER}"

# Step 4: Install the app on the simulator
echo "Installing the app on the simulator..."
xcrun simctl install booted "${APP_FOLDER}"

# Step 5: Launch the app on the simulator
echo "Launching the app on the simulator..."
xcrun simctl launch booted "${BUNDLE_IDENTIFIER}"

# Step 6: Cleanup - Delete the tar.gz file and the .app folder
echo "Cleaning up..."
rm -f "${BUILD_NAME}"
rm -rf "${APP_FOLDER}"

echo "Process completed."
