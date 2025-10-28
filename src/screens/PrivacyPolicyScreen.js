import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/colors';
import {wp, hp, fs, sp} from '../utils/responsive';

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={sp(24)} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>Last Updated: October 28, 2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            AquaFlow collects information necessary to provide water delivery
            management services. This includes:
          </Text>
          <Text style={styles.bulletPoint}>
            • Business information (name, address, contact details)
          </Text>
          <Text style={styles.bulletPoint}>
            • Customer information (names, addresses, phone numbers)
          </Text>
          <Text style={styles.bulletPoint}>
            • Transaction data (orders, payments, deliveries)
          </Text>
          <Text style={styles.bulletPoint}>
            • Inventory and stock information
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the collected information to:
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide and maintain our water delivery management services
          </Text>
          <Text style={styles.bulletPoint}>
            • Process transactions and manage orders
          </Text>
          <Text style={styles.bulletPoint}>
            • Generate reports and analytics for your business
          </Text>
          <Text style={styles.bulletPoint}>
            • Improve and optimize our application
          </Text>
          <Text style={styles.bulletPoint}>
            • Send important notifications about your business
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Data Storage and Security</Text>
          <Text style={styles.paragraph}>
            Your data is stored locally on your device and optionally in secure
            cloud storage. We implement industry-standard security measures to
            protect your information from unauthorized access, alteration, or
            destruction.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Sharing</Text>
          <Text style={styles.paragraph}>
            We do not sell, trade, or rent your personal information to third
            parties. Your business data remains private and is only accessible
            to you.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.paragraph}>You have the right to:</Text>
          <Text style={styles.bulletPoint}>
            • Access your personal and business data
          </Text>
          <Text style={styles.bulletPoint}>
            • Request correction of inaccurate data
          </Text>
          <Text style={styles.bulletPoint}>
            • Request deletion of your data
          </Text>
          <Text style={styles.bulletPoint}>
            • Export your data in a portable format
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Cookies and Tracking</Text>
          <Text style={styles.paragraph}>
            AquaFlow uses local storage to maintain your session and preferences.
            We do not use cookies or third-party tracking technologies.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
          <Text style={styles.paragraph}>
            Our service is intended for business use and is not directed to
            children under 13. We do not knowingly collect information from
            children.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Changes to Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </Text>
          <Text style={styles.contactText}>Email: support@aquaflow.app</Text>
          <Text style={styles.contactText}>
            Address: AquaFlow Technologies, India
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using AquaFlow, you agree to this Privacy Policy.
          </Text>
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
  },
  backButton: {
    width: sp(40),
    height: sp(40),
    borderRadius: sp(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fs(20),
    fontWeight: 'bold',
    color: colors.white,
  },
  placeholder: {
    width: sp(40),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  lastUpdated: {
    fontSize: fs(12),
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: hp(2),
  },
  section: {
    marginTop: hp(2.5),
  },
  sectionTitle: {
    fontSize: fs(18),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: hp(1),
  },
  paragraph: {
    fontSize: fs(14),
    color: colors.textSecondary,
    lineHeight: fs(22),
    marginBottom: hp(1),
  },
  bulletPoint: {
    fontSize: fs(14),
    color: colors.textSecondary,
    lineHeight: fs(22),
    marginLeft: wp(4),
    marginBottom: hp(0.5),
  },
  contactText: {
    fontSize: fs(14),
    color: colors.primary,
    marginTop: hp(0.5),
  },
  footer: {
    marginTop: hp(3),
    marginBottom: hp(4),
    padding: sp(16),
    backgroundColor: colors.borderLight,
    borderRadius: sp(12),
  },
  footerText: {
    fontSize: fs(14),
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default PrivacyPolicyScreen;
