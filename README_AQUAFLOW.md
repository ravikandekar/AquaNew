# AquaFlow - Water Delivery Manager

A complete mobile application built with React Native for water distributors to manage their daily operations, track sales, inventory, customers, and generate reports.

## Features

### 🎯 Core Features
- **Dashboard**: Real-time business overview with key metrics
- **Inventory Management**: Track stock, deliveries, and returns
- **Customer Management**: Maintain customer database with payment tracking
- **Sales Entry**: Quick daily sales recording with payment status
- **Expense Tracking**: Record and categorize business expenses
- **Reports & Analytics**: Daily, weekly, and monthly business reports
- **Payment Tracking**: Monitor pending dues and payments
- **Notifications**: Alerts for low stock and pending payments

### 📱 Screens Included
1. **Splash Screen** - App loading with branding
2. **Login Screen** - OTP-based authentication
3. **Business Setup** - First-time business profile setup
4. **Dashboard** - Main overview with statistics and quick actions
5. **Inventory Screen** - Stock management with movement tracking
6. **Customers Screen** - Customer list with search functionality
7. **Customer Details** - Detailed customer information and history
8. **Reports Screen** - Comprehensive business analytics
9. **Add Sale** - Quick sale entry form
10. **Add Customer** - New customer registration
11. **Add Expense** - Expense recording
12. **Settings** - App configuration and preferences

## Installation

### Prerequisites
- Node.js (v20 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Install iOS Pods** (macOS only)
```bash
cd ios && pod install && cd ..
```

3. **Link Vector Icons** (if needed)
```bash
npx react-native link react-native-vector-icons
```

### Running the App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Start Metro Bundler:**
```bash
npm start
```

## Project Structure

```
water/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── StatCard.js
│   │   ├── ActionButton.js
│   │   └── CustomerCard.js
│   ├── screens/             # All app screens
│   │   ├── SplashScreen.js
│   │   ├── LoginScreen.js
│   │   ├── BusinessSetupScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── InventoryScreen.js
│   │   ├── CustomersScreen.js
│   │   ├── CustomerDetailsScreen.js
│   │   ├── ReportsScreen.js
│   │   ├── AddSaleScreen.js
│   │   ├── AddCustomerScreen.js
│   │   ├── AddExpenseScreen.js
│   │   └── SettingsScreen.js
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js
│   ├── data/                # Mock data and constants
│   │   └── mockData.js
│   ├── utils/               # Utility functions
│   │   └── storage.js
│   └── styles/              # Global styles and colors
│       └── colors.js
├── App.tsx                  # Root component
├── package.json
└── README_AQUAFLOW.md
```

## Key Technologies

- **React Native 0.81.4** - Mobile framework
- **React Navigation 7.x** - Navigation library
- **React Native Vector Icons** - Icon library
- **AsyncStorage** - Local data persistence
- **React Native Linear Gradient** - Gradient backgrounds
- **React Native SVG** - SVG support
- **date-fns** - Date formatting

## Mock Data

The app comes with pre-populated mock data for testing:
- 5 sample customers
- Stock inventory data
- Sales and expense records
- Dashboard statistics

### Demo Credentials
- **OTP**: 123456 (for testing login)

## Features in Detail

### Dashboard
- Today's orders and completion rate
- Jars delivered and returned
- Total customers count
- Financial summary (sales, income, expenses, profit)
- Quick action buttons

### Inventory Management
- Total inventory overview
- Available stock with progress bar
- In-delivery and returned items tracking
- Recent movements list
- Add stock and record return functionality

### Customer Management
- Customer list with search
- Customer details with contact info
- Order history and payment tracking
- WhatsApp reminder integration
- Call functionality

### Reports & Analytics
- Daily, weekly, and monthly reports
- Cans sold, income, expenses, and profit
- Pending payments tracking
- Export to PDF/Excel (coming soon)

### Sales Entry
- Quick sale recording
- Customer name and quantity
- Rate per can with auto-calculation
- Payment status (Paid/Pending)
- Notes field

### Expense Tracking
- Category-based expense recording
- Fuel, Maintenance, Labor, Purchase, Miscellaneous
- Amount and notes
- Date tracking

## Color Scheme

- **Primary**: #1E88E5 (Blue)
- **Secondary**: #26C6DA (Cyan)
- **Success**: #4CAF50 (Green)
- **Warning**: #FFC107 (Amber)
- **Danger**: #F44336 (Red)

## Future Enhancements

- [ ] Firebase authentication integration
- [ ] Cloud data backup
- [ ] PDF/Excel export functionality
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Offline mode with sync
- [ ] Advanced analytics with charts
- [ ] Invoice generation
- [ ] Route optimization for deliveries

## Troubleshooting

### Common Issues

1. **Metro Bundler Issues**
```bash
npm start -- --reset-cache
```

2. **Build Errors**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

3. **iOS Pod Issues**
```bash
cd ios && pod deintegrate && pod install && cd ..
```

4. **Vector Icons Not Showing**
- Make sure to rebuild the app after installing vector icons
- Check if fonts are properly linked in native projects

## Support

For issues and feature requests, please contact the development team.

## License

This project is proprietary software for water distribution businesses.

---

**Made with ❤️ for Water Distributors**
