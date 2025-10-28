import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {clearUserSession} from '../utils/storage';
import {wp, hp, fs, sp} from '../utils/responsive';

const SettingsScreen = ({navigation}) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await clearUserSession();
            navigation.replace('Login');
          },
        },
      ],
    );
  };

  const SettingItem = ({icon, title, subtitle, onPress, showArrow = true}) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Icon name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && (
        <Icon name="chevron-right" size={24} color={colors.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <SettingItem
          icon="crown"
          title="Premium Plan"
          subtitle="Unlock unlimited features & cloud backup"
          onPress={() => navigation.navigate('Subscription')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Settings</Text>
        <SettingItem
          icon="store"
          title="Business Profile"
          subtitle="Manage your business information"
          onPress={() => navigation.navigate('BusinessSetup')}
        />
        <SettingItem
          icon="bell-outline"
          title="Notifications"
          subtitle="Order alerts & reminders"
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Backup</Text>
        <SettingItem
          icon="cloud-upload-outline"
          title="Cloud Backup"
          subtitle="Auto-sync your data securely"
          onPress={() => Alert.alert('Coming Soon', 'Cloud backup coming soon')}
        />
        <SettingItem
          icon="file-export-outline"
          title="Export Reports"
          subtitle="Download as Excel or PDF"
          onPress={() => Alert.alert('Coming Soon', 'Export feature coming soon')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & Legal</Text>
        <SettingItem
          icon="help-circle-outline"
          title="Help Center"
          subtitle="FAQs and tutorials"
          onPress={() => Alert.alert('Coming Soon', 'Help center coming soon')}
        />
        <SettingItem
          icon="shield-check-outline"
          title="Privacy Policy"
          subtitle="How we protect your data"
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />
        <SettingItem
          icon="file-document-outline"
          title="Terms of Service"
          subtitle="Usage terms & conditions"
          onPress={() => navigation.navigate('TermsConditions')}
        />
        <SettingItem
          icon="information-outline"
          title="App Version"
          subtitle="v1.0.0"
          showArrow={false}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color={colors.white} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Made with ❤️ for Water Distributors
      </Text>
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
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fs(28),
    fontWeight: 'bold',
    color: colors.text,
  },
  section: {
    marginTop: hp(3),
    paddingHorizontal: wp(4),
  },
  sectionTitle: {
    fontSize: fs(14),
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: hp(1.5),
    marginLeft: wp(1),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sp(12),
    padding: sp(16),
    marginBottom: hp(1),
  },
  settingIcon: {
    width: sp(40),
    height: sp(40),
    borderRadius: sp(10),
    backgroundColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fs(16),
    fontWeight: '600',
    color: colors.text,
  },
  settingSubtitle: {
    fontSize: fs(14),
    color: colors.textSecondary,
    marginTop: hp(0.3),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger,
    borderRadius: sp(12),
    paddingVertical: hp(2),
    marginHorizontal: wp(4),
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: fs(16),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  footer: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: fs(14),
    marginVertical: hp(3),
  },
});

export default SettingsScreen;
