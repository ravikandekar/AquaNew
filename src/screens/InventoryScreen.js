import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {mockStockData} from '../data/mockData';
import {format} from 'date-fns';

const InventoryScreen = ({navigation}) => {
  const [stockData, setStockData] = useState(mockStockData);

  const renderMovementItem = ({item}) => {
    const isOut = item.type === 'out';
    const timeAgo = format(new Date(item.timestamp), 'h:mm a');
    
    return (
      <View style={styles.movementCard}>
        <View style={[styles.movementIcon, isOut ? styles.outIcon : styles.inIcon]}>
          <Icon
            name={isOut ? 'trending-down' : 'trending-up'}
            size={24}
            color={isOut ? colors.danger : colors.success}
          />
        </View>
        <View style={styles.movementContent}>
          <Text style={styles.movementTitle}>
            {isOut ? 'Delivered to' : 'Returned from'} {item.customer}
          </Text>
          <Text style={styles.movementQuantity}>
            {isOut ? '-' : '+'}{item.quantity} jars
          </Text>
          <Text style={styles.movementTime}>{timeAgo}</Text>
        </View>
        <View style={[styles.statusBadge, isOut ? styles.outBadge : styles.inBadge]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <Text style={styles.headerTitle}>Inventory</Text>
        <Text style={styles.headerSubtitle}>Manage your stock</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.totalInventoryCard}>
          <View style={styles.totalInventoryHeader}>
            <View>
              <Text style={styles.totalInventoryLabel}>Total Inventory</Text>
              <Text style={styles.totalInventoryValue}>{stockData.totalInventory}</Text>
            </View>
            <View style={styles.inventoryIconContainer}>
              <Icon name="package-variant" size={40} color={colors.iconBlue} />
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(stockData.availableStock / stockData.totalInventory) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Available Stock: {stockData.availableStock} jars
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, {backgroundColor: '#E3F2FD'}]}>
              <Icon name="trending-down" size={28} color={colors.iconBlue} />
            </View>
            <Text style={styles.statValue}>{stockData.inDelivery}</Text>
            <Text style={styles.statLabel}>In Delivery</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, {backgroundColor: '#E8F5E9'}]}>
              <Icon name="trending-up" size={28} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{stockData.returned}</Text>
            <Text style={styles.statLabel}>Returned</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, {backgroundColor: '#E3F2FD'}]}>
              <Icon name="package-variant" size={28} color={colors.iconBlue} />
            </View>
            <Text style={styles.statValue}>{stockData.availableStock}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: colors.success}]}
            onPress={() => navigation.navigate('AddStock')}>
            <Icon name="package-variant" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>Add Stock</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: colors.secondary}]}
            onPress={() => navigation.navigate('RecordReturn')}>
            <Icon name="trending-up" size={24} color={colors.white} />
            <Text style={styles.actionButtonText}>Record Return</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.movementsSection}>
          <Text style={styles.sectionTitle}>Recent Movements</Text>
          <FlatList
            data={stockData.movements}
            renderItem={renderMovementItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
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
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  totalInventoryCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  totalInventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalInventoryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  totalInventoryValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  inventoryIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  movementsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  movementCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  movementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outIcon: {
    backgroundColor: '#FFEBEE',
  },
  inIcon: {
    backgroundColor: '#E8F5E9',
  },
  movementContent: {
    flex: 1,
    marginLeft: 12,
  },
  movementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  movementQuantity: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  movementTime: {
    fontSize: 12,
    color: colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  outBadge: {
    backgroundColor: colors.secondary,
  },
  inBadge: {
    backgroundColor: colors.success,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default InventoryScreen;
