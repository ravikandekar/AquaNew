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
import {saveBusinessInfo} from '../utils/storage';

const BusinessSetupScreen = ({navigation}) => {
  const [businessName, setBusinessName] = useState('AquaFlow');
  const [ownerName, setOwnerName] = useState('Owner');
  const [address, setAddress] = useState('Market Road, Sector 12');
  const [contact, setContact] = useState('+91 98765 43210');
  const [dailyCapacity, setDailyCapacity] = useState('500');

  const handleSave = async () => {
    if (!businessName || !ownerName || !address || !contact || !dailyCapacity) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const businessInfo = {
      businessName,
      ownerName,
      address,
      contact,
      dailyRefillCapacity: parseInt(dailyCapacity, 10),
      setupDate: new Date().toISOString(),
    };

    const saved = await saveBusinessInfo(businessInfo);
    if (saved) {
      Alert.alert('Success', 'Business setup completed!', [
        {text: 'OK', onPress: () => navigation.replace('MainTabs')},
      ]);
    } else {
      Alert.alert('Error', 'Failed to save business information');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="store" size={60} color={colors.primary} />
        <Text style={styles.headerTitle}>Business Setup</Text>
        <Text style={styles.headerSubtitle}>
          Let's set up your business profile
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Name</Text>
          <View style={styles.inputContainer}>
            <Icon name="store" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter business name"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Owner Name</Text>
          <View style={styles.inputContainer}>
            <Icon name="account" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter owner name"
              value={ownerName}
              onChangeText={setOwnerName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter business address"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Number</Text>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
              value={contact}
              onChangeText={setContact}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Daily Refill Capacity</Text>
          <View style={styles.inputContainer}>
            <Icon name="water" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter daily capacity"
              keyboardType="number-pad"
              value={dailyCapacity}
              onChangeText={setDailyCapacity}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Complete Setup</Text>
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
    backgroundColor: colors.white,
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
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
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BusinessSetupScreen;
