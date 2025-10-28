# AquaFlow - Installation Steps

Follow these steps to install and run the AquaFlow Water Delivery Manager app.

## 📋 Prerequisites Check

Before starting, verify you have:

- [ ] Node.js v20+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Android Studio (for Android) OR Xcode (for iOS on macOS)
- [ ] Android emulator running OR iOS simulator running OR physical device connected

## 🔧 Step-by-Step Installation

### Step 1: Navigate to Project Directory

```bash
cd e:/Water/water
```

### Step 2: Install Dependencies

The npm install command has been initiated. Wait for it to complete (may take 2-5 minutes).

```bash
npm install
```

**What this installs:**
- React Navigation (navigation library)
- React Native Vector Icons (icons)
- AsyncStorage (local storage)
- Linear Gradient (gradient backgrounds)
- SVG support
- date-fns (date formatting)
- All other dependencies

### Step 3: Link Vector Icons (Important!)

After npm install completes, link the icon fonts:

```bash
npx react-native-asset
```

**Alternative if above doesn't work:**
```bash
npx react-native link react-native-vector-icons
```

### Step 4: iOS Setup (macOS only)

If you're on macOS and want to run on iOS:

```bash
cd ios
pod install
cd ..
```

**If pod install fails:**
```bash
cd ios
pod repo update
pod install
cd ..
```

### Step 5: Start Metro Bundler

Open a new terminal and start the Metro bundler:

```bash
npm start
```

**Or with cache reset:**
```bash
npm start -- --reset-cache
```

Keep this terminal running!

### Step 6: Run the App

#### For Android:

In a new terminal (keep Metro running):

```bash
npm run android
```

**Requirements:**
- Android emulator must be running, OR
- Physical Android device connected with USB debugging enabled

**Check device connection:**
```bash
adb devices
```

#### For iOS (macOS only):

In a new terminal (keep Metro running):

```bash
npm run ios
```

**Or for specific simulator:**
```bash
npx react-native run-ios --simulator="iPhone 15"
```

## ✅ Verification Steps

Once the app launches:

1. **Splash Screen** should appear with AquaFlow logo
2. After 2 seconds, **Login Screen** appears
3. Enter any 10-digit phone number (e.g., 9876543210)
4. Click "Send OTP"
5. Enter OTP: **123456**
6. Click "Verify & Login"
7. **Business Setup** screen appears with pre-filled data
8. Click "Complete Setup"
9. **Dashboard** appears with statistics and quick actions

## 🎨 What You Should See

### Dashboard (Main Screen)
- Blue gradient header
- "Good Morning, Owner!" greeting
- 4 statistics cards (Orders, Completed, Jars Delivered, Customers)
- 5 quick action buttons
- Financial summary section
- Bottom navigation (Dashboard, Customers, Inventory, Reports)

### Inventory Screen
- Total inventory: 500 jars
- Progress bar showing available stock
- 3 stat cards (In Delivery, Returned, Available)
- Recent movements list

### Customers Screen
- Search bar
- 5 customer cards
- Add customer button (cyan, floating)

### Reports Screen
- Period selector (Daily/Weekly/Monthly)
- Summary cards
- Detailed breakdown
- Export buttons

## 🐛 Troubleshooting

### Issue 1: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 2: Metro bundler port conflict

**Solution:**
```bash
# Kill process on port 8081
npx react-native start --port 8082
```

### Issue 3: Android build fails

**Solution:**
```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

### Issue 4: Icons not showing

**Solution:**
```bash
# Link assets
npx react-native-asset

# Rebuild app
npm run android  # or npm run ios
```

### Issue 5: iOS build fails (macOS)

**Solution:**
```bash
# Clean pods
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..

# Rebuild
npm run ios
```

### Issue 6: "Unable to resolve module"

**Solution:**
```bash
# Reset Metro cache
npm start -- --reset-cache

# In another terminal
npm run android  # or npm run ios
```

## 📱 Testing the App

### Test Checklist:

1. **Login Flow**
   - [ ] Splash screen appears
   - [ ] Login with OTP works
   - [ ] Business setup saves data

2. **Dashboard**
   - [ ] Statistics display correctly
   - [ ] Quick actions navigate properly
   - [ ] Financial summary shows data
   - [ ] Settings button works

3. **Inventory**
   - [ ] Stock numbers display
   - [ ] Progress bar shows correctly
   - [ ] Movements list appears
   - [ ] Add Stock button works

4. **Customers**
   - [ ] Customer list displays
   - [ ] Search works
   - [ ] Customer details open
   - [ ] Add customer form works

5. **Reports**
   - [ ] Period switching works
   - [ ] Data updates correctly
   - [ ] Export buttons visible

6. **Sales & Expenses**
   - [ ] Add sale form works
   - [ ] Add expense form works
   - [ ] Data saves successfully

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Link icons
npx react-native-asset

# Start Metro
npm start

# Run Android
npm run android

# Run iOS (macOS)
npm run ios

# Clean cache
npm start -- --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean iOS build
cd ios && rm -rf Pods && pod install && cd ..
```

## 📞 Demo Credentials

- **Phone**: Any 10-digit number (e.g., 9876543210)
- **OTP**: 123456
- **Business Name**: AquaFlow (pre-filled)
- **Owner Name**: Owner (pre-filled)

## 🎉 Success Indicators

You'll know everything is working when:

✅ App launches without errors
✅ All icons display correctly
✅ Navigation works smoothly
✅ Data persists after app restart
✅ All screens are accessible
✅ Mock data displays correctly

## 📚 Next Steps

After successful installation:

1. Explore all screens and features
2. Test adding sales, customers, expenses
3. Check data persistence (close and reopen app)
4. Review code structure in `src/` folder
5. Read `PROJECT_SUMMARY.md` for feature details
6. Check `FEATURES_CHECKLIST.md` for complete feature list

## 🆘 Need Help?

If you encounter issues:

1. Check `SETUP_GUIDE.md` for detailed troubleshooting
2. Review `README_AQUAFLOW.md` for comprehensive documentation
3. Verify all prerequisites are installed
4. Ensure Android emulator/iOS simulator is running
5. Check Metro bundler terminal for errors

---

**Happy Testing! 🚀**
