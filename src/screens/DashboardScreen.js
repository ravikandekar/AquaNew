import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import StatCard from '../components/StatCard';
import ActionButton from '../components/ActionButton';
import {mockDashboardData} from '../data/mockData';
import {initializeAppData} from '../utils/initializeData';

const DashboardScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(mockDashboardData);

  useEffect(() => {
    // Initialize mock data on first load
    initializeAppData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Icon name="water" size={32} color={colors.white} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>AquaFlow</Text>
            <Text style={styles.headerSubtitle}>Water Delivery Manager</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notifications')}>
              <Icon name="bell" size={24} color={colors.white} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}>
              <Icon name="cog" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good Morning, Owner!</Text>
          <Text style={styles.greetingSubtext}>Here's your business overview</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.statsGrid}>
          <StatCard
            title="Today's Orders"
            value={data.todaysOrders}
            subtitle={`+${data.ordersChange} from yesterday`}
            iconName="clipboard-text"
            iconColor={colors.iconBlue}
            iconBgColor="#E3F2FD"
            changeValue={data.ordersChange}
            changeType="increase"
          />
          <StatCard
            title="Completed"
            value={data.completed}
            subtitle={`${data.completionRate}% completion`}
            iconName="clipboard-check"
            iconColor={colors.iconBlue}
            iconBgColor="#E3F2FD"
          />
          <StatCard
            title="Jars Delivered"
            value={data.jarsDelivered}
            subtitle={`${data.jarsReturned} returned`}
            iconName="package-variant"
            iconColor={colors.iconBlue}
            iconBgColor="#E3F2FD"
            changeValue={data.jarsReturned}
            changeType="increase"
          />
          <StatCard
            title="Total Customers"
            value={data.totalCustomers}
            subtitle={`+${data.newCustomersThisWeek} this week`}
            iconName="account-group"
            iconColor={colors.iconBlue}
            iconBgColor="#E3F2FD"
            changeValue={data.newCustomersThisWeek}
            changeType="increase"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.actionsContainer}>
            <ActionButton
              title="New Order"
              iconName="plus"
              color={colors.primary}
              onPress={() => navigation.navigate('AddSale')}
            />
            <ActionButton
              title="Add Customer"
              iconName="account-plus"
              color={colors.secondary}
              onPress={() => navigation.navigate('AddCustomer')}
            />
            <ActionButton
              title="Add Stock"
              iconName="package-variant"
              color={colors.success}
              onPress={() => navigation.navigate('Inventory')}
            />
            <ActionButton
              title="Add Expense"
              iconName="credit-card"
              color={colors.danger}
              onPress={() => navigation.navigate('AddExpense')}
            />
            <ActionButton
              title="Reports"
              iconName="chart-bar"
              color={colors.primary}
              onPress={() => navigation.navigate('Reports')}
            />
          </ScrollView>
        </View>

        <View style={styles.financialSection}>
          <Text style={styles.sectionTitle}>Today's Financial Summary</Text>
          <View style={styles.financialCard}>
            <View style={styles.financialRow}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Today's Sale</Text>
                <Text style={styles.financialValue}>₹{data.todaysSale}</Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Pending Dues</Text>
                <Text style={[styles.financialValue, styles.warningText]}>
                  ₹{data.pendingDues}
                </Text>
              </View>
            </View>
            <View style={styles.financialRow}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Today's Income</Text>
                <Text style={[styles.financialValue, styles.successText]}>
                  ₹{data.todaysIncome}
                </Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Today's Expense</Text>
                <Text style={[styles.financialValue, styles.dangerText]}>
                  ₹{data.todaysExpense}
                </Text>
              </View>
            </View>
            <View style={styles.financialRow}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Closing Stock</Text>
                <Text style={styles.financialValue}>{data.closingStock} jars</Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Profit/Loss</Text>
                <Text style={[styles.financialValue, styles.profitText]}>
                  ₹{data.profit}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.danger,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  greetingContainer: {
    marginTop: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  greetingSubtext: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  financialSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 90,
  },
  financialCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  financialRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  financialItem: {
    flex: 1,
  },
  financialLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  financialValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  successText: {
    color: colors.success,
  },
  dangerText: {
    color: colors.danger,
  },
  warningText: {
    color: colors.warning,
  },
  profitText: {
    color: colors.success,
  },
});

export default DashboardScreen;
