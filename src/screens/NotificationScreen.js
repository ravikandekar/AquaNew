import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NotificationScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      icon: 'cart-check',
      iconColor: colors.success,
      iconBg: '#E8F5E9',
      title: 'New Order Received',
      message: 'Customer Rajesh Kumar placed an order for 5 water jars',
      time: '5 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'payment',
      icon: 'cash-check',
      iconColor: colors.primary,
      iconBg: '#E3F2FD',
      title: 'Payment Received',
      message: 'Payment of ₹500 received from Priya Sharma',
      time: '15 min ago',
      read: false,
    },
    {
      id: 3,
      type: 'delivery',
      icon: 'truck-delivery',
      iconColor: colors.iconCyan,
      iconBg: '#E0F7FA',
      title: 'Delivery Completed',
      message: 'Order #1234 has been successfully delivered',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 4,
      type: 'inventory',
      icon: 'package-variant-closed',
      iconColor: colors.warning,
      iconBg: '#FFF3E0',
      title: 'Low Stock Alert',
      message: 'Only 10 empty jars remaining in inventory',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 5,
      type: 'customer',
      icon: 'account-plus',
      iconColor: colors.iconGreen,
      iconBg: '#E8F5E9',
      title: 'New Customer Added',
      message: 'Amit Patel has been added to your customer list',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 6,
      type: 'reminder',
      icon: 'bell-ring',
      iconColor: colors.iconOrange,
      iconBg: '#FFF3E0',
      title: 'Delivery Reminder',
      message: 'You have 3 pending deliveries for today',
      time: '5 hours ago',
      read: true,
    },
    {
      id: 7,
      type: 'return',
      icon: 'package-variant',
      iconColor: colors.info,
      iconBg: '#E3F2FD',
      title: 'Jars Returned',
      message: '8 empty jars returned by Sunita Devi',
      time: '1 day ago',
      read: true,
    },
    {
      id: 8,
      type: 'expense',
      icon: 'receipt',
      iconColor: colors.danger,
      iconBg: '#FFEBEE',
      title: 'Expense Added',
      message: 'New expense of ₹2000 added for fuel',
      time: '1 day ago',
      read: true,
    },
  ]);

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? {...notif, read: true} : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({...notif, read: true})),
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={markAllAsRead}>
            <Icon name="check-all" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Action Buttons */}
      {notifications.length > 0 && (
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={markAllAsRead}>
            <Icon name="check-all" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Mark all as read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearAll}>
            <Icon name="delete-outline" size={18} color={colors.danger} />
            <Text style={[styles.actionButtonText, styles.clearButtonText]}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon name="bell-off-outline" size={80} color={colors.textLight} />
            </View>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyMessage}>
              You're all caught up! We'll notify you when something new happens.
            </Text>
          </View>
        ) : (
          notifications.map((notification, index) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard,
                index === notifications.length - 1 && styles.lastCard,
              ]}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.iconContainer,
                  {backgroundColor: notification.iconBg},
                ]}>
                <Icon
                  name={notification.icon}
                  size={24}
                  color={notification.iconColor}
                />
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <View style={styles.notificationFooter}>
                  <Icon name="clock-outline" size={14} color={colors.textLight} />
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    paddingTop: hp(2),
    paddingBottom: hp(2),
    paddingHorizontal: wp(4),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  headerBadge: {
    backgroundColor: colors.danger,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 24,
    alignItems: 'center',
  },
  headerBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  clearButton: {
    backgroundColor: '#FFEBEE',
  },
  clearButtonText: {
    color: colors.danger,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: wp(4),
    marginTop: hp(1.5),
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  unreadCard: {
    borderLeftColor: colors.primary,
    backgroundColor: '#F8FCFF',
  },
  lastCard: {
    marginBottom: hp(2),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textLight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(8),
    paddingTop: hp(10),
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default NotificationScreen;
