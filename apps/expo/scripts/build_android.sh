#!/bin/zsh

# Check if package name is provided
if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  echo "Usage: $0 <package-name> [preview|(dev)elopment]"
  exit 1
fi

PACKAGE_NAME=$1

# Default to 'preview' if no profile is specified
PROFILE=${2:-preview}

# Normalize profile input
case "$PROFILE" in
development | dev)
  PROFILE="development"
  ;;
preview)
  PROFILE="preview"
  ;;
*)
  echo "Error: Invalid profile. Use 'preview', 'development', or 'dev'."
  exit 1
  ;;
esac

echo "Using profile: $PROFILE"

# Step 1: Generate the APK build file and capture the build name
echo "Generating the APK build file..."
BUILD_OUTPUT=$(eas build -p android --local -e "$PROFILE" 2>&1)
APK_NAME=$(echo "$BUILD_OUTPUT" | grep -oE '[^ ]+\.apk' | tail -n 1)

if [ -z "$APK_NAME" ]; then
  echo "Error: Could not determine the APK file name."
  exit 1
fi

echo "APK file generated: ${APK_NAME}"

# Step 2: Install the APK on the emulator
echo "Installing the APK on the emulator..."
INSTALL_RESULT=$(adb install -r "${APK_NAME}")

# Step 3: Launch the app on the emulator
echo "Launching the app on the emulator..."
adb shell monkey -p "${PACKAGE_NAME}" -c android.intent.category.LAUNCHER 1

# Step 4: Conditional Cleanup - Delete the APK file only if it was successfully installed and in development mode
if [[ $INSTALL_RESULT == *"Success"* ]] && [ "$PROFILE" = "development" ]; then
  echo "Cleaning up..."
  rm -f "${APK_NAME}"
fi

echo "Process completed."
