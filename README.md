# Build Camera for iPhone

This branch holds the App Store version of Build Camera. It's a thin iPhone app that opens
https://buildcamera.com, so every change to the website shows up in the app right away.
GitHub's Mac computers build it, so no Mac is needed.

## One-time setup (after Apple approves the developer account)

1. App Store Connect → Apps → + → New App
   - Platform: iOS · Name: Build Camera · Language: English (U.S.)
   - Bundle ID: com.gilcollc.buildcamera (register it under Certificates, Identifiers & Profiles → Identifiers if it isn't listed)
   - SKU: BUILDCAMERA1
2. App Store Connect → Users and Access → Integrations → App Store Connect API → Team Keys → Generate API Key
   - Name: GitHub Builds · Access: Admin
   - Download the .p8 file (Apple only lets you download it once). Note the Key ID and the Issuer ID.
3. Membership details page on developer.apple.com: copy the Team ID.
4. GitHub → this repository → Settings → Secrets and variables → Actions → New repository secret. Add four secrets:
   - `ASC_KEY_ID` — the Key ID
   - `ASC_ISSUER_ID` — the Issuer ID
   - `ASC_KEY_P8` — open the .p8 file in a text editor and paste everything, including the BEGIN and END lines
   - `APPLE_TEAM_ID` — the Team ID
5. GitHub → Actions → iOS App → Run workflow (branch: ios).

Each run uploads a new build to TestFlight. Install the TestFlight app on the iPhone to test it.
