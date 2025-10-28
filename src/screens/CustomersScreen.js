import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import CustomerCard from '../components/CustomerCard';
import {mockCustomers} from '../data/mockData';
import {wp, hp, fs, sp} from '../utils/responsive';

const CustomersScreen = ({navigation}) => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderCustomer = ({item}) => (
    <CustomerCard
      customer={item}
      onPress={() => navigation.navigate('CustomerDetails', {customer: item})}
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp(10) : 0}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <Text style={styles.headerTitle}>Customers</Text>
        <Text style={styles.headerSubtitle}>Manage your customer base</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="magnify" size={sp(20)} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddCustomer')}>
          <Icon name="plus" size={sp(24)} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: hp(7),
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sp(12),
    paddingHorizontal: wp(4),
    height: hp(6.5),
    marginRight: wp(3),
  },
  searchInput: {
    flex: 1,
    fontSize: fs(16),
    color: colors.text,
    marginLeft: wp(2),
  },
  addButton: {
    width: sp(50),
    height: sp(50),
    borderRadius: sp(12),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: hp(10),
  },
});

export default CustomersScreen;
