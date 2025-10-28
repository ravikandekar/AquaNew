import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {wp, hp, fs, sp} from '../utils/responsive';

const OrdersScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const mockOrders = [
    {
      id: '1',
      customerName: 'Rajesh Kumar',
      address: 'Shop 12, MG Road',
      phone: '9876543210',
      quantity: 5,
      amount: 250,
      status: 'pending',
      time: '09:30 AM',
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      address: 'Flat 301, Sunrise Apartments',
      phone: '9876543211',
      quantity: 3,
      amount: 150,
      status: 'pending',
      time: '10:00 AM',
    },
    {
      id: '3',
      customerName: 'Amit Patel',
      address: 'House 45, Green Valley',
      phone: '9876543212',
      quantity: 8,
      amount: 400,
      status: 'completed',
      time: '08:15 AM',
    },
    {
      id: '4',
      customerName: 'Sneha Reddy',
      address: 'Office 204, Tech Park',
      phone: '9876543213',
      quantity: 10,
      amount: 500,
      status: 'completed',
      time: '07:45 AM',
    },
  ];

  const filteredOrders = mockOrders.filter(
    order =>
      order.status === selectedTab &&
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const pendingCount = mockOrders.filter(o => o.status === 'pending').length;
  const completedCount = mockOrders.filter(o => o.status === 'completed').length;

  const renderOrderCard = ({item}) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" size={sp(14)} color={colors.textSecondary} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.quantityBadge}>
          <Icon name="water" size={sp(18)} color={colors.primary} />
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Icon name="map-marker" size={sp(16)} color={colors.textSecondary} />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="phone" size={sp(16)} color={colors.textSecondary} />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.amountText}>₹{item.amount}</Text>
        {item.status === 'pending' ? (
          <TouchableOpacity style={styles.completeButton}>
            <Icon name="check-circle" size={sp(20)} color={colors.white} />
            <Text style={styles.completeButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBadge}>
            <Icon name="check-circle" size={sp(16)} color={colors.success} />
            <Text style={styles.completedText}>Delivered</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp(10) : 0}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <Text style={styles.headerTitle}>Today's Orders</Text>
        <Text style={styles.headerSubtitle}>Manage deliveries efficiently</Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'pending' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('pending')}>
          <Icon
            name="clock-outline"
            size={sp(20)}
            color={selectedTab === 'pending' ? colors.white : colors.primary}
          />
          <Text
            style={[
              styles.tabText,
              selectedTab === 'pending' && styles.activeTabText,
            ]}>
            Pending
          </Text>
          <View
            style={[
              styles.countBadge,
              selectedTab === 'pending' && styles.countBadgeActive,
            ]}>
            <Text
              style={[
                styles.countText,
                selectedTab === 'pending' && styles.countTextActive,
              ]}>
              {pendingCount}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'completed' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('completed')}>
          <Icon
            name="check-circle"
            size={sp(20)}
            color={selectedTab === 'completed' ? colors.white : colors.success}
          />
          <Text
            style={[
              styles.tabText,
              selectedTab === 'completed' && styles.activeTabText,
            ]}>
            Completed
          </Text>
          <View
            style={[
              styles.countBadge,
              selectedTab === 'completed' && styles.countBadgeActive,
            ]}>
            <Text
              style={[
                styles.countText,
                selectedTab === 'completed' && styles.countTextActive,
              ]}>
              {completedCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={sp(20)} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search orders..."
          placeholderTextColor={colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={sp(20)} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="clipboard-text-off" size={sp(64)} color={colors.textLight} />
            <Text style={styles.emptyText}>No {selectedTab} orders</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddSale')}>
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          style={styles.fabGradient}>
          <Icon name="plus" size={sp(28)} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: hp(6),
    paddingBottom: hp(3),
    paddingHorizontal: wp(5),
  },
  headerTitle: {
    fontSize: fs(28),
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: fs(16),
    color: colors.white,
    opacity: 0.9,
    marginTop: hp(0.5),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    gap: wp(3),
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: hp(1.5),
    borderRadius: sp(12),
    gap: wp(2),
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: fs(16),
    fontWeight: '600',
    color: colors.text,
  },
  activeTabText: {
    color: colors.white,
  },
  countBadge: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: sp(10),
    minWidth: sp(24),
    alignItems: 'center',
  },
  countBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  countText: {
    fontSize: fs(12),
    fontWeight: 'bold',
    color: colors.text,
  },
  countTextActive: {
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    borderRadius: sp(12),
    height: hp(6),
  },
  searchInput: {
    flex: 1,
    fontSize: fs(16),
    color: colors.text,
    marginLeft: wp(2),
  },
  listContainer: {
    paddingBottom: hp(12),
  },
  orderCard: {
    backgroundColor: colors.white,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: sp(16),
    padding: sp(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(1.5),
  },
  orderInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: fs(18),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: hp(0.5),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  timeText: {
    fontSize: fs(13),
    color: colors.textSecondary,
  },
  quantityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: sp(20),
    gap: wp(1),
  },
  quantityText: {
    fontSize: fs(16),
    fontWeight: 'bold',
    color: colors.primary,
  },
  orderDetails: {
    marginBottom: hp(1.5),
    gap: hp(0.8),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  detailText: {
    fontSize: fs(14),
    color: colors.textSecondary,
    flex: 1,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  amountText: {
    fontSize: fs(22),
    fontWeight: 'bold',
    color: colors.success,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: sp(10),
    gap: wp(1.5),
  },
  completeButtonText: {
    fontSize: fs(14),
    fontWeight: '600',
    color: colors.white,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
  },
  completedText: {
    fontSize: fs(14),
    fontWeight: '600',
    color: colors.success,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(10),
  },
  emptyText: {
    fontSize: fs(16),
    color: colors.textLight,
    marginTop: hp(2),
  },
  fab: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    width: sp(60),
    height: sp(60),
    borderRadius: sp(30),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: sp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
