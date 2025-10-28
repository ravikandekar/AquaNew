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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {saveExpenseData} from '../utils/storage';

const AddExpenseScreen = ({navigation}) => {
  const [category, setCategory] = useState('Fuel');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const categories = ['Fuel', 'Maintenance', 'Labor', 'Purchase', 'Miscellaneous'];

  const handleSave = async () => {
    if (!category || !amount) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const expenseData = {
      id: Date.now().toString(),
      category,
      amount: parseInt(amount),
      date: new Date().toISOString(),
      notes,
    };

    const saved = await saveExpenseData(expenseData);
    if (saved) {
      Alert.alert('Success', 'Expense added successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } else {
      Alert.alert('Error', 'Failed to save expense data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Expense</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === cat && styles.categoryButtonTextActive,
                  ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount *</Text>
          <View style={styles.inputContainer}>
            <Icon name="currency-inr" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="number-pad"
              value={amount}
              onChangeText={setAmount}
            />
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
          <Text style={styles.saveButtonText}>Save Expense</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryButtonTextActive: {
    color: colors.white,
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

export default AddExpenseScreen;
