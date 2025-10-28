import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {wp, hp, fs, sp} from '../utils/responsive';

const SubscriptionScreen = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '₹299',
      duration: '/month',
      savings: null,
      popular: false,
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: '₹799',
      duration: '/3 months',
      savings: 'Save ₹98',
      popular: true,
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '₹2,999',
      duration: '/year',
      savings: 'Save ₹589',
      popular: false,
    },
  ];

  const features = [
    {
      icon: 'cloud-sync',
      title: 'Cloud Backup',
      description: 'Automatic data backup to secure cloud storage',
    },
    {
      icon: 'chart-line',
      title: 'Advanced Analytics',
      description: 'Detailed reports and business insights',
    },
    {
      icon: 'account-multiple',
      title: 'Unlimited Customers',
      description: 'No limit on customer database',
    },
    {
      icon: 'bell-ring',
      title: 'Smart Notifications',
      description: 'Automated reminders for pending orders',
    },
    {
      icon: 'file-export',
      title: 'Export Reports',
      description: 'Export data as PDF, Excel, and CSV',
    },
    {
      icon: 'headset',
      title: 'Priority Support',
      description: '24/7 dedicated customer support',
    },
    {
      icon: 'shield-check',
      title: 'Data Security',
      description: 'End-to-end encryption for your data',
    },
    {
      icon: 'update',
      title: 'Free Updates',
      description: 'Access to all future features and updates',
    },
  ];

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    // Simulate IAP purchase flow - Replace with actual implementation
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Subscription Successful! 🎉',
        `You have successfully subscribed to the ${plans.find(p => p.id === selectedPlan)?.name} plan. Enjoy premium features!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }, 2000);

    // TODO: Implement actual In-App Purchase
    // When ready for production:
    // 1. Install: npm install react-native-iap
    // 2. Configure products in Google Play Console
    // 3. Implement purchase flow:
    /*
    import RNIap from 'react-native-iap';
    
    try {
      await RNIap.initConnection();
      const products = await RNIap.getSubscriptions(['monthly_sub', 'quarterly_sub', 'yearly_sub']);
      const purchase = await RNIap.requestSubscription(selectedPlan + '_sub');
      
      // Verify purchase with your backend
      const receipt = purchase.transactionReceipt;
      // await verifyPurchaseWithBackend(receipt);
      
      // Grant premium access
      // await grantPremiumAccess();
      
      await RNIap.finishTransaction(purchase);
    } catch (error) {
      Alert.alert('Error', 'Failed to process subscription. Please try again.');
    } finally {
      await RNIap.endConnection();
    }
    */
  };

  const handleRestorePurchases = () => {
    Alert.alert(
      'Restore Purchases',
      'No previous purchases found.',
      [{text: 'OK'}],
    );
  };

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
        <Text style={styles.headerTitle}>Premium Subscription</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.crownContainer}>
            <Icon name="crown" size={sp(48)} color="#FFD700" />
          </View>
          <Text style={styles.heroTitle}>Unlock Premium Features</Text>
          <Text style={styles.heroSubtitle}>
            Take your water delivery business to the next level
          </Text>
        </View>

        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          {plans.map(plan => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
                plan.popular && styles.planCardPopular,
              ]}
              onPress={() => setSelectedPlan(plan.id)}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  {plan.savings && (
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsText}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.radioButton}>
                  {selectedPlan === plan.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
              <View style={styles.planPricing}>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planDuration}>{plan.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Icon name={feature.icon} size={sp(28)} color={colors.primary} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.guaranteeSection}>
          <Icon name="shield-check" size={sp(32)} color={colors.success} />
          <View style={styles.guaranteeContent}>
            <Text style={styles.guaranteeTitle}>7-Day Money Back Guarantee</Text>
            <Text style={styles.guaranteeText}>
              Not satisfied? Get a full refund within 7 days, no questions asked.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestorePurchases}>
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
          disabled={isLoading}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.subscribeGradient}>
            {isLoading ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <>
                <Icon name="crown" size={sp(24)} color={colors.white} />
                <Text style={styles.subscribeButtonText}>
                  Subscribe Now - {plans.find(p => p.id === selectedPlan)?.price}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          Cancel anytime • Secure payment • No hidden charges
        </Text>
      </View>
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
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: hp(4),
    paddingHorizontal: wp(5),
  },
  crownContainer: {
    width: sp(100),
    height: sp(100),
    borderRadius: sp(50),
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  heroTitle: {
    fontSize: fs(26),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: fs(16),
    color: colors.textSecondary,
    textAlign: 'center',
  },
  plansSection: {
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: fs(20),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: hp(2),
  },
  planCard: {
    backgroundColor: colors.white,
    borderRadius: sp(16),
    padding: sp(20),
    marginBottom: hp(2),
    borderWidth: 2,
    borderColor: colors.border,
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#E3F2FD',
  },
  planCardPopular: {
    borderColor: '#FFD700',
  },
  popularBadge: {
    position: 'absolute',
    top: -hp(1),
    right: wp(5),
    backgroundColor: '#FFD700',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: sp(12),
  },
  popularText: {
    fontSize: fs(10),
    fontWeight: 'bold',
    color: colors.white,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  planName: {
    fontSize: fs(20),
    fontWeight: 'bold',
    color: colors.text,
  },
  savingsBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: sp(8),
  },
  savingsText: {
    fontSize: fs(11),
    fontWeight: '600',
    color: colors.white,
  },
  radioButton: {
    width: sp(24),
    height: sp(24),
    borderRadius: sp(12),
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: sp(12),
    height: sp(12),
    borderRadius: sp(6),
    backgroundColor: colors.primary,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: fs(32),
    fontWeight: 'bold',
    color: colors.primary,
  },
  planDuration: {
    fontSize: fs(16),
    color: colors.textSecondary,
    marginLeft: wp(1),
  },
  featuresSection: {
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(3),
  },
  featureCard: {
    width: (wp(90) - wp(3)) / 2,
    backgroundColor: colors.white,
    borderRadius: sp(12),
    padding: sp(16),
    alignItems: 'center',
  },
  featureIcon: {
    width: sp(56),
    height: sp(56),
    borderRadius: sp(28),
    backgroundColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  featureTitle: {
    fontSize: fs(14),
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: hp(0.5),
  },
  featureDescription: {
    fontSize: fs(12),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: fs(16),
  },
  guaranteeSection: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    marginHorizontal: wp(5),
    padding: sp(16),
    borderRadius: sp(12),
    marginBottom: hp(2),
    gap: wp(3),
  },
  guaranteeContent: {
    flex: 1,
  },
  guaranteeTitle: {
    fontSize: fs(16),
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: hp(0.5),
  },
  guaranteeText: {
    fontSize: fs(13),
    color: colors.textSecondary,
    lineHeight: fs(18),
  },
  restoreButton: {
    alignSelf: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    marginBottom: hp(2),
  },
  restoreButtonText: {
    fontSize: fs(14),
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  subscribeButton: {
    borderRadius: sp(12),
    overflow: 'hidden',
    marginBottom: hp(1),
  },
  subscribeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    gap: wp(2),
  },
  subscribeButtonText: {
    fontSize: fs(16),
    fontWeight: 'bold',
    color: colors.white,
  },
  footerNote: {
    fontSize: fs(12),
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SubscriptionScreen;
