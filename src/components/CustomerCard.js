import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {wp, hp, fs, sp} from '../utils/responsive';

const CustomerCard = ({customer, onPress}) => {
  const [orderDone, setOrderDone] = useState(customer.todayOrderDone || false);

  const handleToggleOrder = (e) => {
    e.stopPropagation();
    setOrderDone(!orderDone);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{customer.name}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{customer.status}</Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <Icon name="phone" size={sp(16)} color={colors.textSecondary} />
        <Text style={styles.infoText}>{customer.phone}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Icon name="map-marker" size={sp(16)} color={colors.textSecondary} />
        <Text style={styles.infoText}>{customer.address}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Daily Jars</Text>
          <Text style={styles.statValue}>{customer.dailyJars}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Balance</Text>
          <Text style={[styles.statValue, customer.balance > 0 && styles.balanceDue]}>
            ₹{customer.balance}
          </Text>
        </View>
      </View>

      <View style={styles.orderToggleContainer}>
        <View style={styles.orderToggleLeft}>
          <Icon 
            name={orderDone ? "check-circle" : "clock-outline"} 
            size={sp(18)} 
            color={orderDone ? colors.success : colors.warning} 
          />
          <Text style={styles.orderToggleLabel}>Today's Order</Text>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, orderDone && styles.toggleButtonActive]}
          onPress={handleToggleOrder}
          activeOpacity={0.7}>
          <View style={[styles.toggleCircle, orderDone && styles.toggleCircleActive]} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: sp(16),
    padding: sp(16),
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  name: {
    fontSize: fs(18),
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: sp(12),
  },
  statusText: {
    color: colors.white,
    fontSize: fs(12),
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  infoText: {
    fontSize: fs(14),
    color: colors.textSecondary,
    marginLeft: wp(2),
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: hp(1.5),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: fs(12),
    color: colors.textSecondary,
    marginBottom: hp(0.5),
  },
  statValue: {
    fontSize: fs(16),
    fontWeight: 'bold',
    color: colors.text,
  },
  balanceDue: {
    color: colors.warning,
  },
  orderToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.5),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  orderToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  orderToggleLabel: {
    fontSize: fs(14),
    fontWeight: '600',
    color: colors.text,
  },
  toggleButton: {
    width: sp(50),
    height: sp(28),
    borderRadius: sp(14),
    backgroundColor: colors.border,
    justifyContent: 'center',
    padding: sp(2),
  },
  toggleButtonActive: {
    backgroundColor: colors.success,
  },
  toggleCircle: {
    width: sp(24),
    height: sp(24),
    borderRadius: sp(12),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
});

export default CustomerCard;
