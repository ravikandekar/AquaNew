import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Icon name="water" size={80} color={colors.white} />
        </View>
        <Text style={styles.title}>AquaFlow</Text>
        <Text style={styles.subtitle}>Water Delivery Manager</Text>
      </View>
      <Text style={styles.version}>Version 1.0.0</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  version: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.7,
    marginBottom: 40,
  },
});

export default SplashScreen;
