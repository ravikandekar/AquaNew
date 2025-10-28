import {
  getCustomersData,
  saveCustomersData,
  getStockData,
  saveStockData,
  getSalesData,
  getExpensesData,
} from './storage';
import {
  mockCustomers,
  mockStockData,
  mockSalesData,
  mockExpensesData,
} from '../data/mockData';

/**
 * Initialize app with mock data if no data exists
 */
export const initializeAppData = async () => {
  try {
    // Check if customers data exists
    const existingCustomers = await getCustomersData();
    if (!existingCustomers || existingCustomers.length === 0) {
      await saveCustomersData(mockCustomers);
      console.log('Mock customers data initialized');
    }

    // Check if stock data exists
    const existingStock = await getStockData();
    if (!existingStock) {
      await saveStockData(mockStockData);
      console.log('Mock stock data initialized');
    }

    // Check if sales data exists
    const existingSales = await getSalesData();
    if (!existingSales || existingSales.length === 0) {
      // Sales data is added through the app, so we don't initialize it
      console.log('Sales data ready');
    }

    // Check if expenses data exists
    const existingExpenses = await getExpensesData();
    if (!existingExpenses || existingExpenses.length === 0) {
      // Expenses data is added through the app, so we don't initialize it
      console.log('Expenses data ready');
    }

    return true;
  } catch (error) {
    console.error('Error initializing app data:', error);
    return false;
  }
};

/**
 * Reset all data to mock data (for testing)
 */
export const resetToMockData = async () => {
  try {
    await saveCustomersData(mockCustomers);
    await saveStockData(mockStockData);
    console.log('All data reset to mock data');
    return true;
  } catch (error) {
    console.error('Error resetting data:', error);
    return false;
  }
};
