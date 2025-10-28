# AquaFlow Setup Guide

Complete step-by-step guide to set up and run the AquaFlow Water Delivery Manager app.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
1. **Node.js** (v20 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn**
   - Comes with Node.js
   - Verify: `npm --version`

3. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

### For Android Development
4. **Java Development Kit (JDK 17)**
   - Download from: https://www.oracle.com/java/technologies/downloads/

5. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK
   - Set up Android emulator or connect physical device

### For iOS Development (macOS only)
6. **Xcode** (latest version)
   - Download from Mac App Store
   - Install Command Line Tools
   - Set up iOS simulator

7. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

## Installation Steps

### Step 1: Install Dependencies

Navigate to the project directory and install npm packages:

```bash
cd e:/Water/water
npm install
```

This will install all required dependencies including:
- React Navigation
- React Native Vector Icons
- AsyncStorage
- Linear Gradient
- SVG support
- date-fns

### Step 2: Link Native Dependencies

#### For React Native Vector Icons:

The app uses Material Community Icons. After installation, link the fonts:

```bash
npx react-native-asset
```

Or manually link:
```bash
npx react-native link react-native-vector-icons
```

### Step 3: iOS Setup (macOS only)

Install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

If you encounter issues, try:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Step 4: Android Setup

No additional setup required for Android. The Gradle build will handle dependencies.

## Running the Application

### Start Metro Bundler

In one terminal window, start the Metro bundler:

```bash
npm start
```

Or with cache reset:
```bash
npm start -- --reset-cache
```

### Run on Android

In another terminal window:

```bash
npm run android
```

Or directly:
```bash
npx react-native run-android
```

**Troubleshooting Android:**
- Ensure Android emulator is running or device is connected
- Check USB debugging is enabled on physical device
- Verify `adb devices` shows your device

### Run on iOS (macOS only)

```bash
npm run ios
```

Or for specific simulator:
```bash
npx react-native run-ios --simulator="iPhone 15"
```

**Troubleshooting iOS:**
- Open `ios/water.xcworkspace` in Xcode if build fails
- Clean build folder: Product → Clean Build Folder
- Ensure correct signing team is selected

## Configuration

### 1. App Name and Display Name

Already configured in `app.json`:
```json
{
  "name": "AquaFlow",
  "displayName": "AquaFlow - Water Delivery Manager"
}
```

### 2. App Icon

To add custom app icon:
1. Create icon images in required sizes
2. Place in:
   - Android: `android/app/src/main/res/mipmap-*`
   - iOS: `ios/water/Images.xcassets/AppIcon.appiconset/`

### 3. Splash Screen

Splash screen is implemented in `SplashScreen.js` with:
- App logo (water icon)
- App name
- Loading animation

### 4. Colors and Theming

Customize colors in `src/styles/colors.js`:
```javascript
export const colors = {
  primary: '#1E88E5',
  secondary: '#26C6DA',
  success: '#4CAF50',
  // ... more colors
};
```

## Testing the App

### Demo Credentials

**Login Screen:**
- Enter any 10-digit phone number
- OTP: `123456`

### Mock Data

The app includes pre-populated data:
- 5 sample customers
- Inventory with 500 total jars
- Stock movements
- Dashboard statistics

### Testing Features

1. **Dashboard**
   - View statistics
   - Test quick action buttons
   - Check financial summary

2. **Inventory**
   - View stock levels
   - Check recent movements
   - Test Add Stock button

3. **Customers**
   - Browse customer list
   - Search functionality
   - Add new customer
   - View customer details

4. **Reports**
   - Switch between Daily/Weekly/Monthly
   - View financial breakdown
   - Test export buttons (UI only)

5. **Sales Entry**
   - Add new sale
   - Test payment status toggle
   - Verify total calculation

6. **Settings**
   - Navigate through settings
   - Test logout functionality

## Building for Production

### Android APK

1. Generate signing key:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure in `android/app/build.gradle`

3. Build APK:
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### iOS IPA (macOS only)

1. Open Xcode workspace
2. Select "Generic iOS Device"
3. Product → Archive
4. Distribute App

## Common Issues and Solutions

### Issue 1: Metro Bundler Port Conflict
```bash
npx react-native start --port 8082
```

### Issue 2: Build Failures

**Android:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**iOS:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

### Issue 3: Vector Icons Not Showing

1. Clear cache:
```bash
npm start -- --reset-cache
```

2. Rebuild app:
```bash
npm run android
# or
npm run ios
```

### Issue 4: AsyncStorage Warnings

AsyncStorage is properly configured. If warnings appear, ensure:
```bash
npm install @react-native-async-storage/async-storage
```

### Issue 5: Gradle Build Errors

Check Java version:
```bash
java -version
```

Should be JDK 17. Update if needed.

### Issue 6: Pod Install Fails

```bash
cd ios
pod repo update
pod install
cd ..
```

## Development Tips

### Hot Reloading

- Enable Fast Refresh in dev menu (Cmd+D / Ctrl+M)
- Changes reflect automatically

### Debugging

1. **React Native Debugger**
   - Download from: https://github.com/jhen0409/react-native-debugger

2. **Chrome DevTools**
   - Open dev menu → Debug
   - Opens Chrome debugger

3. **Console Logs**
   - Use `console.log()` for debugging
   - View in Metro bundler terminal

### Code Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # App screens
├── navigation/     # Navigation setup
├── data/          # Mock data
├── utils/         # Helper functions
└── styles/        # Global styles
```

## Next Steps

1. **Customize Branding**
   - Update colors in `colors.js`
   - Add custom app icon
   - Modify splash screen

2. **Backend Integration**
   - Replace mock data with API calls
   - Implement real authentication
   - Add cloud sync

3. **Additional Features**
   - Push notifications
   - PDF generation
   - Advanced analytics
   - Route optimization

## Support

For technical support or questions:
- Check README_AQUAFLOW.md
- Review code comments
- Contact development team

## Version Information

- **App Version**: 1.0.0
- **React Native**: 0.81.4
- **React**: 19.1.0
- **Node**: >=20

---

**Happy Coding! 🚀**
