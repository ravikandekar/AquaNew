import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';
import {mockReportsData} from '../data/mockData';
import PasswordModal from '../components/PasswordModal';
import {wp, hp, fs, sp} from '../utils/responsive';

const ReportsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [reportData, setReportData] = useState(mockReportsData.daily);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (!isUnlocked) {
      setShowPasswordModal(true);
    }
  }, []);

  const handlePasswordSuccess = () => {
    setIsUnlocked(true);
    setShowPasswordModal(false);
  };

  const handlePasswordClose = () => {
    setShowPasswordModal(false);
  };

  const periods = [
    {key: 'daily', label: 'Daily'},
    {key: 'weekly', label: 'Weekly'},
    {key: 'monthly', label: 'Monthly'},
  ];

  const handlePeriodChange = period => {
    setSelectedPeriod(period);
    setReportData(mockReportsData[period]);
  };

  if (!isUnlocked) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.lockedContainer}>
          <Icon name="lock" size={sp(80)} color="rgba(255, 255, 255, 0.3)" />
          <Text style={styles.lockedTitle}>Reports Locked</Text>
          <Text style={styles.lockedSubtitle}>Owner access required</Text>
          <TouchableOpacity
            style={styles.unlockButton}
            onPress={() => setShowPasswordModal(true)}>
            <Icon name="lock-open" size={sp(20)} color={colors.white} />
            <Text style={styles.unlockButtonText}>Unlock Reports</Text>
          </TouchableOpacity>
        </LinearGradient>
        <PasswordModal
          visible={showPasswordModal}
          onClose={handlePasswordClose}
          onSuccess={handlePasswordSuccess}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Reports & Analytics</Text>
            <Text style={styles.headerSubtitle}>Track your business performance</Text>
          </View>
          <TouchableOpacity
            style={styles.lockButton}
            onPress={() => setIsUnlocked(false)}>
            <Icon name="lock" size={sp(20)} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.periodSelector}>
        {periods.map(period => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.periodButtonActive,
            ]}
            onPress={() => handlePeriodChange(period.key)}>
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.periodButtonTextActive,
              ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Icon name="package-variant" size={32} color={colors.primary} />
              <Text style={styles.summaryLabel}>Cans Sold</Text>
              <Text style={styles.summaryValue}>{reportData.cansSold}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="cash" size={32} color={colors.success} />
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.successText]}>
                ₹{reportData.income}
              </Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Icon name="credit-card" size={32} color={colors.danger} />
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={[styles.summaryValue, styles.dangerText]}>
                ₹{reportData.expense}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="chart-line" size={32} color={colors.success} />
              <Text style={styles.summaryLabel}>Profit</Text>
              <Text style={[styles.summaryValue, styles.profitText]}>
                ₹{reportData.profit}
              </Text>
            </View>
          </View>

          <View style={styles.pendingSection}>
            <Icon name="clock-alert" size={24} color={colors.warning} />
            <View style={styles.pendingContent}>
              <Text style={styles.pendingLabel}>Pending Payments</Text>
              <Text style={[styles.summaryValue, styles.warningText]}>
                ₹{reportData.pendingPayments}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Detailed Breakdown</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Cans Sold</Text>
            <Text style={styles.detailValue}>{reportData.cansSold}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Income</Text>
            <Text style={[styles.detailValue, styles.successText]}>
              ₹{reportData.income}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Expense</Text>
            <Text style={[styles.detailValue, styles.dangerText]}>
              ₹{reportData.expense}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Net Profit</Text>
            <Text style={[styles.detailValue, styles.profitText]}>
              ₹{reportData.profit}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pending Payments</Text>
            <Text style={[styles.detailValue, styles.warningText]}>
              ₹{reportData.pendingPayments}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Profit Margin</Text>
            <Text style={[styles.detailValue, styles.successText]}>
              {((reportData.profit / reportData.income) * 100).toFixed(1)}%
            </Text>
          </View>
        </View>

        <View style={styles.exportSection}>
          <TouchableOpacity style={styles.exportButton}>
            <Icon name="file-pdf-box" size={24} color={colors.white} />
            <Text style={styles.exportButtonText}>Export as PDF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.exportButton, styles.excelButton]}>
            <Icon name="file-excel" size={24} color={colors.white} />
            <Text style={styles.exportButtonText}>Export as Excel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <PasswordModal
        visible={showPasswordModal}
        onClose={handlePasswordClose}
        onSuccess={handlePasswordSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  lockedTitle: {
    fontSize: fs(28),
    fontWeight: 'bold',
    color: colors.white,
    marginTop: hp(3),
  },
  lockedSubtitle: {
    fontSize: fs(16),
    color: colors.white,
    opacity: 0.9,
    marginTop: hp(1),
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: sp(12),
    marginTop: hp(4),
    gap: wp(2),
  },
  unlockButtonText: {
    fontSize: fs(16),
    fontWeight: '600',
    color: colors.white,
  },
  header: {
    paddingTop: hp(7),
    paddingBottom: hp(3),
    paddingHorizontal: wp(5),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lockButton: {
    width: sp(40),
    height: sp(40),
    borderRadius: sp(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fs(28),
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: fs(16),
    color: colors.white,
    opacity: 0.9,
    marginTop: hp(0.5),
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  periodButtonTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: hp(10),
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  successText: {
    color: colors.success,
  },
  dangerText: {
    color: colors.danger,
  },
  warningText: {
    color: colors.warning,
  },
  profitText: {
    color: colors.success,
  },
  pendingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  pendingContent: {
    flex: 1,
    marginLeft: 12,
  },
  pendingLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  exportSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  excelButton: {
    backgroundColor: colors.success,
  },
  exportButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ReportsScreen;
