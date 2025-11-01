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

const RecordReturnScreen = ({navigation}) => {
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('Good');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!customerName || !quantity) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const returnData = {
      id: Date.now().toString(),
      customerName,
      quantity: parseInt(quantity),
      condition,
      date: new Date().toISOString(),
      notes,
    };

    // Here you would save to storage
    Alert.alert('Success', 'Return recorded successfully!', [
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
          <Text style={styles.headerTitle}>Record Return</Text>
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
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

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
            <Text style={styles.label}>Jar Condition</Text>
            <View style={styles.conditionButtons}>
              <TouchableOpacity
                style={[
                  styles.conditionButton,
                  condition === 'Good' && styles.conditionButtonActive,
                ]}
                onPress={() => setCondition('Good')}>
                <Icon 
                  name="check-circle" 
                  size={20} 
                  color={condition === 'Good' ? colors.white : colors.success} 
                />
                <Text
                  style={[
                    styles.conditionButtonText,
                    condition === 'Good' && styles.conditionButtonTextActive,
                  ]}>
                  Good
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.conditionButton,
                  condition === 'Damaged' && styles.conditionButtonActive,
                ]}
                onPress={() => setCondition('Damaged')}>
                <Icon 
                  name="alert-circle" 
                  size={20} 
                  color={condition === 'Damaged' ? colors.white : colors.danger} 
                />
                <Text
                  style={[
                    styles.conditionButtonText,
                    condition === 'Damaged' && styles.conditionButtonTextActive,
                  ]}>
                  Damaged
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Icon name="information" size={24} color={colors.iconBlue} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Return Information</Text>
              <Text style={styles.infoText}>
                Recording returns helps maintain accurate inventory levels and track jar circulation.
              </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <Icon name="note-text" size={20} color={colors.textSecondary} style={styles.textAreaIcon} />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add notes about the return"
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
            <Text style={styles.saveButtonText}>Record Return</Text>
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
  conditionButtons: {
    flexDirection: 'row',
    gap: wp(2),
  },
  conditionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.5),
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    gap: wp(2),
  },
  conditionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  conditionButtonText: {
    fontSize: fs(16),
    fontWeight: '600',
    color: colors.text,
  },
  conditionButtonTextActive: {
    color: colors.white,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: wp(4),
    marginBottom: hp(2.5),
    borderLeftWidth: 4,
    borderLeftColor: colors.iconBlue,
  },
  infoContent: {
    flex: 1,
    marginLeft: wp(3),
  },
  infoTitle: {
    fontSize: fs(14),
    fontWeight: '600',
    color: colors.text,
    marginBottom: hp(0.5),
  },
  infoText: {
    fontSize: fs(13),
    color: colors.textSecondary,
    lineHeight: 18,
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

export default RecordReturnScreen;
