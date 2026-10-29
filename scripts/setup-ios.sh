#!/bin/bash
# Creates or refreshes the native iOS project and applies Build Camera's settings.
set -euo pipefail
[ -d ios ] || npx cap add ios
npx cap sync ios
PL=ios/App/App/Info.plist
put(){ /usr/libexec/PlistBuddy -c "Delete :$1" "$PL" >/dev/null 2>&1 || true; /usr/libexec/PlistBuddy -c "Add :$1 $2 $3" "$PL"; }
put CFBundleDisplayName string "Build Camera"
put NSCameraUsageDescription string "Build Camera uses the camera to take stamped jobsite photos and videos."
put NSMicrophoneUsageDescription string "Build Camera records sound with jobsite videos and voice notes."
put NSLocationWhenInUseUsageDescription string "Build Camera stamps GPS on each photo and files it to the nearest job."
put NSPhotoLibraryUsageDescription string "Pick photos from your library to add to a job."
put NSPhotoLibraryAddUsageDescription string "Save photos and reports to your library."
put ITSAppUsesNonExemptEncryption bool false
ICON=ios/App/App/Assets.xcassets/AppIcon.appiconset
if [ -f "$ICON/AppIcon-512@2x.png" ]; then cp assets/AppIcon-1024.png "$ICON/AppIcon-512@2x.png"; else
  cp assets/AppIcon-1024.png "$ICON/AppIcon-1024.png"
  printf '{"images":[{"filename":"AppIcon-1024.png","idiom":"universal","platform":"ios","size":"1024x1024"}],"info":{"author":"xcode","version":1}}' > "$ICON/Contents.json"
fi
# iPhone only (no iPad version, so Apple doesn't require iPad screenshots)
sed -i '' 's/TARGETED_DEVICE_FAMILY = "1,2";/TARGETED_DEVICE_FAMILY = 1;/g' ios/App/App.xcodeproj/project.pbxproj || true
echo "iOS project ready"
