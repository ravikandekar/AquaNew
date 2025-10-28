import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const KEYS = {
  BUSINESS_INFO: '@business_info',
  STOCK_DATA: '@stock_data',
  SALES_DATA: '@sales_data',
  EXPENSES_DATA: '@expenses_data',
  CUSTOMERS_DATA: '@customers_data',
  PAYMENTS_DATA: '@payments_data',
  USER_SESSION: '@user_session',
};

// Business Info
export const saveBusinessInfo = async (data) => {
  try {
    await AsyncStorage.setItem(KEYS.BUSINESS_INFO, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving business info:', error);
    return false;
  }
};

export const getBusinessInfo = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.BUSINESS_INFO);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting business info:', error);
    return null;
  }
};

// Stock Data
export const saveStockData = async (data) => {
  try {
    await AsyncStorage.setItem(KEYS.STOCK_DATA, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving stock data:', error);
    return false;
  }
};

export const getStockData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.STOCK_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting stock data:', error);
    return null;
  }
};

// Sales Data
export const saveSalesData = async (data) => {
  try {
    const existing = await getSalesData();
    const updated = [...(existing || []), data];
    await AsyncStorage.setItem(KEYS.SALES_DATA, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving sales data:', error);
    return false;
  }
};

export const getSalesData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.SALES_DATA);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting sales data:', error);
    return [];
  }
};

// Expenses Data
export const saveExpenseData = async (data) => {
  try {
    const existing = await getExpensesData();
    const updated = [...(existing || []), data];
    await AsyncStorage.setItem(KEYS.EXPENSES_DATA, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving expense data:', error);
    return false;
  }
};

export const getExpensesData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.EXPENSES_DATA);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting expenses data:', error);
    return [];
  }
};

// Customers Data
export const saveCustomersData = async (data) => {
  try {
    await AsyncStorage.setItem(KEYS.CUSTOMERS_DATA, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving customers data:', error);
    return false;
  }
};

export const getCustomersData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.CUSTOMERS_DATA);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting customers data:', error);
    return [];
  }
};

// User Session
export const saveUserSession = async (data) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_SESSION, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving user session:', error);
    return false;
  }
};

export const getUserSession = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_SESSION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
};

export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER_SESSION);
    return true;
  } catch (error) {
    console.error('Error clearing user session:', error);
    return false;
  }
};
