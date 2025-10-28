import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {saveUserSession} from '../utils/storage';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }
    // Simulate OTP sending
    setOtpSent(true);
    Alert.alert('Success', 'OTP sent to your phone number');
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    
    // Simulate OTP verification (in real app, verify with backend)
    if (otp === '123456') {
      const session = {
        phoneNumber,
        loggedIn: true,
        rememberMe,
        loginTime: new Date().toISOString(),
      };
      await saveUserSession(session);
      navigation.replace('BusinessSetup');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <Icon name="water" size={60} color={colors.white} />
        <Text style={styles.headerTitle}>AquaFlow</Text>
        <Text style={styles.headerSubtitle}>Water Delivery Manager</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to manage your business</Text>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!otpSent}
          />
        </View>

        {otpSent && (
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
          </View>
        )}

        {otpSent && (
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}>
            <Icon
              name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
              color={colors.primary}
            />
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </TouchableOpacity>
        )}

        {!otpSent ? (
          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
              <Text style={styles.buttonText}>Verify & Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOtpSent(false)}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.demoText}>Demo OTP: 123456</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.text,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  demoText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
});

export default LoginScreen;
