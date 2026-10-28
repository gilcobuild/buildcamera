#!/bin/bash
# Prints the right Xcode container flag (CocoaPods workspace or Swift Package project)
if [ -d ios/App/App.xcworkspace ]; then echo "-workspace ios/App/App.xcworkspace"; else echo "-project ios/App/App.xcodeproj"; fi
