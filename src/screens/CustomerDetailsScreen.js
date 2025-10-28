import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';

const CustomerDetailsScreen = ({navigation, route}) => {
  const {customer} = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${customer.phone}`);
  };

  const handleWhatsApp = () => {
    const message = `Hello ${customer.name}, this is a reminder about your pending payment of ₹${customer.balance}.`;
    Linking.openURL(`whatsapp://send?phone=${customer.phone}&text=${message}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Details</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Icon name="account" size={48} color={colors.white} />
          </View>
          <Text style={styles.customerName}>{customer.name}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{customer.status}</Text>
          </View>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <Icon name="phone" size={20} color={colors.textSecondary} />
            <Text style={styles.contactText}>{customer.phone}</Text>
            <TouchableOpacity style={styles.actionIcon} onPress={handleCall}>
              <Icon name="phone" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Icon name="map-marker" size={20} color={colors.textSecondary} />
            <Text style={styles.contactText}>{customer.address}</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{customer.dailyJars}</Text>
              <Text style={styles.statLabel}>Daily Jars</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{customer.totalOrders}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, styles.successText]}>
                ₹{customer.totalPaid}
              </Text>
              <Text style={styles.statLabel}>Total Paid</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, styles.warningText]}>
                ₹{customer.totalPending}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>

        {customer.balance > 0 && (
          <View style={styles.balanceCard}>
            <Icon name="alert-circle" size={24} color={colors.warning} />
            <View style={styles.balanceContent}>
              <Text style={styles.balanceLabel}>Outstanding Balance</Text>
              <Text style={styles.balanceValue}>₹{customer.balance}</Text>
            </View>
            <TouchableOpacity
              style={styles.reminderButton}
              onPress={handleWhatsApp}>
              <Icon name="whatsapp" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="plus" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>New Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}>
            <Icon name="cash" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>Record Payment</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  successText: {
    color: colors.success,
  },
  warningText: {
    color: colors.warning,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  balanceContent: {
    flex: 1,
    marginLeft: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.warning,
  },
  reminderButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsCard: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: colors.success,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CustomerDetailsScreen;
