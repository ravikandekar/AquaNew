import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {wp, hp, fs, sp} from '../utils/responsive';

const PasswordModal = ({visible, onClose, onSuccess}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [scaleAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      setPassword('');
      setError('');
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  const handleSubmit = () => {
    // Default password: "owner123" - In production, this should be stored securely
    if (password === 'owner123') {
      setError('');
      onSuccess();
      setPassword('');
    } else {
      setError('Incorrect password. Please try again.');
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            {transform: [{scale: scaleAnim}]},
          ]}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon name="shield-lock" size={sp(48)} color={colors.white} />
            </View>
            <Text style={styles.title}>Owner Access Required</Text>
            <Text style={styles.subtitle}>
              Enter password to view reports
            </Text>
          </LinearGradient>

          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={sp(20)} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setError('');
                }}
                secureTextEntry={!showPassword}
                autoFocus
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={sp(20)}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Icon name="alert-circle" size={sp(16)} color={colors.danger} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.hintContainer}>
              <Icon name="information" size={sp(16)} color={colors.info} />
              <Text style={styles.hintText}>
                Default password: owner123
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <LinearGradient
                  colors={[colors.success, colors.primary]}
                  style={styles.submitGradient}>
                  <Icon name="check" size={sp(20)} color={colors.white} />
                  <Text style={styles.submitButtonText}>Unlock</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: wp(85),
    backgroundColor: colors.white,
    borderRadius: sp(20),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    paddingVertical: hp(4),
    paddingHorizontal: wp(5),
  },
  iconContainer: {
    width: sp(80),
    height: sp(80),
    borderRadius: sp(40),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontSize: fs(22),
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: hp(0.5),
  },
  subtitle: {
    fontSize: fs(14),
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    padding: sp(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    borderRadius: sp(12),
    paddingHorizontal: wp(4),
    height: hp(6.5),
    marginBottom: hp(1),
  },
  input: {
    flex: 1,
    fontSize: fs(16),
    color: colors.text,
    marginLeft: wp(2),
  },
  eyeButton: {
    padding: sp(4),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: sp(12),
    borderRadius: sp(8),
    marginBottom: hp(1),
    gap: wp(2),
  },
  errorText: {
    fontSize: fs(13),
    color: colors.danger,
    flex: 1,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: sp(12),
    borderRadius: sp(8),
    marginBottom: hp(2),
    gap: wp(2),
  },
  hintText: {
    fontSize: fs(13),
    color: colors.info,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp(3),
    marginTop: hp(1),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.borderLight,
    paddingVertical: hp(1.8),
    borderRadius: sp(12),
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fs(16),
    fontWeight: '600',
    color: colors.text,
  },
  submitButton: {
    flex: 1,
    borderRadius: sp(12),
    overflow: 'hidden',
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.8),
    gap: wp(2),
  },
  submitButtonText: {
    fontSize: fs(16),
    fontWeight: '600',
    color: colors.white,
  },
});

export default PasswordModal;
