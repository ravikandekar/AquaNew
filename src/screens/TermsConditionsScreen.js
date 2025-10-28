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

const TermsConditionsScreen = ({navigation}) => {
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
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>Last Updated: October 28, 2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By downloading, installing, or using AquaFlow ("the App"), you agree
            to be bound by these Terms and Conditions. If you do not agree to
            these terms, please do not use the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. License to Use</Text>
          <Text style={styles.paragraph}>
            AquaFlow grants you a limited, non-exclusive, non-transferable
            license to use the App for managing your water delivery business.
            This license is for your personal or business use only.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
          <Text style={styles.paragraph}>You agree to:</Text>
          <Text style={styles.bulletPoint}>
            • Provide accurate and complete information
          </Text>
          <Text style={styles.bulletPoint}>
            • Maintain the security of your account credentials
          </Text>
          <Text style={styles.bulletPoint}>
            • Use the App in compliance with all applicable laws
          </Text>
          <Text style={styles.bulletPoint}>
            • Not use the App for any illegal or unauthorized purpose
          </Text>
          <Text style={styles.bulletPoint}>
            • Not attempt to reverse engineer or modify the App
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Service Description</Text>
          <Text style={styles.paragraph}>
            AquaFlow provides tools for managing water delivery businesses,
            including:
          </Text>
          <Text style={styles.bulletPoint}>
            • Customer management and tracking
          </Text>
          <Text style={styles.bulletPoint}>
            • Order and delivery management
          </Text>
          <Text style={styles.bulletPoint}>
            • Inventory and stock tracking
          </Text>
          <Text style={styles.bulletPoint}>
            • Financial reporting and analytics
          </Text>
          <Text style={styles.bulletPoint}>
            • Subscription management (Premium features)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Subscription and Payments</Text>
          <Text style={styles.paragraph}>
            Some features of AquaFlow require a paid subscription. By purchasing
            a subscription, you agree to:
          </Text>
          <Text style={styles.bulletPoint}>
            • Pay all applicable fees for your chosen subscription plan
          </Text>
          <Text style={styles.bulletPoint}>
            • Automatic renewal unless cancelled before the renewal date
          </Text>
          <Text style={styles.bulletPoint}>
            • No refunds for partial subscription periods
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Data Backup and Loss</Text>
          <Text style={styles.paragraph}>
            While we strive to ensure data integrity, you are responsible for
            maintaining backups of your business data. We are not liable for any
            data loss that may occur.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            AquaFlow is provided "as is" without warranties of any kind. We are
            not liable for any indirect, incidental, or consequential damages
            arising from your use of the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, features, and functionality of AquaFlow are owned by us
            and are protected by international copyright, trademark, and other
            intellectual property laws.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to terminate or suspend your access to the App
            at any time, without prior notice, for conduct that we believe
            violates these Terms or is harmful to other users.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Updates and Modifications</Text>
          <Text style={styles.paragraph}>
            We may update the App and these Terms from time to time. Continued
            use of the App after changes constitutes acceptance of the new Terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms shall be governed by and construed in accordance with the
            laws of India, without regard to its conflict of law provisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Contact Information</Text>
          <Text style={styles.paragraph}>
            For questions about these Terms and Conditions, contact us at:
          </Text>
          <Text style={styles.contactText}>Email: support@aquaflow.app</Text>
          <Text style={styles.contactText}>
            Address: AquaFlow Technologies, India
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using AquaFlow, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and Conditions.
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

export default TermsConditionsScreen;
