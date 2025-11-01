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
import {wp, hp, fs, sp} from '../utils/responsive';

const AddStockScreen = ({navigation}) => {
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [purchaseRate, setPurchaseRate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [notes, setNotes] = useState('');

  const totalCost = quantity && purchaseRate ? parseInt(quantity) * parseInt(purchaseRate) : 0;

  const handleSave = async () => {
    if (!quantity || !supplier) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const stockData = {
      id: Date.now().toString(),
      quantity: parseInt(quantity),
      supplier,
      purchaseRate: purchaseRate ? parseInt(purchaseRate) : 0,
      totalCost,
      invoiceNumber,
      date: new Date().toISOString(),
      notes,
    };

    // Here you would save to storage
    Alert.alert('Success', 'Stock added successfully!', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Stock</Text>
          <View style={{width: 24}} />
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity (Jars) *</Text>
            <View style={styles.inputContainer}>
              <Icon name="package-variant" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Enter quantity"
                keyboardType="number-pad"
                value={quantity}
                onChangeText={setQuantity}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Supplier Name *</Text>
            <View style={styles.inputContainer}>
              <Icon name="truck-delivery" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Enter supplier name"
                value={supplier}
                onChangeText={setSupplier}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Purchase Rate per Jar (Optional)</Text>
            <View style={styles.inputContainer}>
              <Icon name="currency-inr" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Enter purchase rate"
                keyboardType="number-pad"
                value={purchaseRate}
                onChangeText={setPurchaseRate}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          {purchaseRate && quantity ? (
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Cost</Text>
              <Text style={styles.totalValue}>₹{totalCost}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Invoice Number (Optional)</Text>
            <View style={styles.inputContainer}>
              <Icon name="file-document" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Enter invoice number"
                value={invoiceNumber}
                onChangeText={setInvoiceNumber}
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <Icon name="note-text" size={20} color={colors.textSecondary} style={styles.textAreaIcon} />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add notes"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name="check-circle" size={24} color={colors.white} />
            <Text style={styles.saveButtonText}>Add Stock</Text>
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
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: sp(2),
  },
  headerTitle: {
    fontSize: fs(20),
    fontWeight: 'bold',
    color: colors.text,
  },
  form: {
    padding: wp(5),
  },
  inputGroup: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: fs(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: hp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: wp(4),
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    height: hp(6),
    fontSize: fs(16),
    color: colors.text,
    marginLeft: wp(3),
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
  },
  textAreaIcon: {
    marginTop: hp(1),
  },
  textArea: {
    height: hp(12),
    paddingTop: hp(1),
  },
  totalContainer: {
    backgroundColor: colors.success,
    borderRadius: 12,
    padding: wp(5),
    marginBottom: hp(2.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLabel: {
    fontSize: fs(16),
    color: colors.white,
    marginBottom: hp(1),
    opacity: 0.9,
  },
  totalValue: {
    fontSize: fs(32),
    fontWeight: 'bold',
    color: colors.white,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: hp(2),
    alignItems: 'center',
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: fs(16),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
});

export default AddStockScreen;
