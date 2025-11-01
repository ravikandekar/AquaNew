import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {saveSalesData} from '../utils/storage';

const AddSaleScreen = ({navigation}) => {
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('30');
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [notes, setNotes] = useState('');

  const totalAmount = quantity && rate ? parseInt(quantity) * parseInt(rate) : 0;

  const handleSave = async () => {
    if (!customerName || !quantity || !rate) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const saleData = {
      id: Date.now().toString(),
      customerName,
      quantity: parseInt(quantity),
      rate: parseInt(rate),
      totalAmount,
      paymentStatus,
      date: new Date().toISOString(),
      notes,
    };

    const saved = await saveSalesData(saleData);
    if (saved) {
      Alert.alert('Success', 'Sale added successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } else {
      Alert.alert('Error', 'Failed to save sale data');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Sale</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Customer Name *</Text>
          <View style={styles.inputContainer}>
            <Icon name="account" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter customer name"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity (Cans) *</Text>
          <View style={styles.inputContainer}>
            <Icon name="package-variant" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              keyboardType="number-pad"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rate per Can *</Text>
          <View style={styles.inputContainer}>
            <Icon name="currency-inr" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter rate"
              keyboardType="number-pad"
              value={rate}
              onChangeText={setRate}
            />
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{totalAmount}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Payment Status</Text>
          <View style={styles.paymentButtons}>
            <TouchableOpacity
              style={[
                styles.paymentButton,
                paymentStatus === 'Paid' && styles.paymentButtonActive,
              ]}
              onPress={() => setPaymentStatus('Paid')}>
              <Text
                style={[
                  styles.paymentButtonText,
                  paymentStatus === 'Paid' && styles.paymentButtonTextActive,
                ]}>
                Paid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentButton,
                paymentStatus === 'Pending' && styles.paymentButtonActive,
              ]}
              onPress={() => setPaymentStatus('Pending')}>
              <Text
                style={[
                  styles.paymentButtonText,
                  paymentStatus === 'Pending' && styles.paymentButtonTextActive,
                ]}>
                Pending
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <View style={styles.inputContainer}>
            <Icon name="note-text" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Add notes"
              value={notes}
              onChangeText={setNotes}
              multiline
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Sale</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  totalContainer: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  paymentButtons: {
    flexDirection: 'row',
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentButtonActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  paymentButtonTextActive: {
    color: colors.white,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSaleScreen;
