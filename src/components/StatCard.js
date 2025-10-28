import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles/colors';

const StatCard = ({
  title,
  value,
  subtitle,
  iconName,
  iconColor,
  iconBgColor,
  changeValue,
  changeType,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.iconContainer, {backgroundColor: iconBgColor}]}>
          <Icon name={iconName} size={24} color={iconColor} />
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      {subtitle && (
        <View style={styles.subtitleContainer}>
          {changeValue && (
            <Icon
              name={changeType === 'increase' ? 'trending-up' : 'trending-down'}
              size={16}
              color={changeType === 'increase' ? colors.success : colors.textLight}
              style={styles.changeIcon}
            />
          )}
          <Text
            style={[
              styles.subtitle,
              changeType === 'increase' && styles.subtitleSuccess,
            ]}>
            {subtitle}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: '45%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  subtitleSuccess: {
    color: colors.success,
  },
  changeIcon: {
    marginRight: 4,
  },
});

export default StatCard;
