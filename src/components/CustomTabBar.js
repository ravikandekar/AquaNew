import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/colors';
import {wp, hp, sp} from '../utils/responsive';

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBarBackground}>
        {/* Curved notch for center button */}
        <View style={styles.notchContainer}>
          <View style={styles.notchLeft} />
          <View style={styles.notch} />
          <View style={styles.notchRight} />
        </View>

        {/* Tab buttons */}
        <View style={styles.tabsContainer}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;
            const isCenter = index === 2; // Orders tab in center

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            // Get icon and label for each tab
            const getTabConfig = () => {
              switch (route.name) {
                case 'Dashboard':
                  return {icon: 'home-variant', label: 'Home'};
                case 'Customers':
                  return {icon: 'account-group', label: 'Customers'};
                case 'Orders':
                  return {icon: 'cart', label: 'Orders'};
                case 'Reports':
                  return {icon: 'chart-line', label: 'Reports'};
                default:
                  return {icon: 'circle', label: route.name};
              }
            };

            const {icon, label} = getTabConfig();

            // Center button (Orders)
            if (isCenter) {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={onPress}
                  style={styles.centerButtonContainer}>
                  <LinearGradient
                    colors={
                      isFocused
                        ? ['#FF6B6B', '#FF8E53']
                        : [colors.primary, colors.primaryDark]
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.centerButton}>
                    <Icon name={icon} size={sp(28)} color={colors.white} />
                  </LinearGradient>
                </TouchableOpacity>
              );
            }

            // Regular tabs
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.tab}>
                <View
                  style={[
                    styles.iconContainer,
                    isFocused && styles.iconContainerFocused,
                  ]}>
                  <Icon
                    name={icon}
                    size={sp(24)}
                    color={isFocused ? colors.primary : colors.textLight}
                  />
                </View>
                <Text
                  style={[
                    styles.label,
                    {color: isFocused ? colors.primary : colors.textLight},
                  ]}>
                  {label}
                </Text>
                {isFocused && <View style={styles.activeDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarBackground: {
    backgroundColor: colors.white,
    borderTopLeftRadius: sp(24),
    borderTopRightRadius: sp(24),
    paddingBottom: Platform.OS === 'ios' ? hp(3) : hp(1.5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  notchContainer: {
    position: 'absolute',
    top: -sp(2),
    left: 0,
    right: 0,
    height: sp(2),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notchLeft: {
    flex: 1,
    backgroundColor: colors.white,
  },
  notch: {
    width: sp(80),
    backgroundColor: 'transparent',
  },
  notchRight: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: hp(1.5),
    paddingHorizontal: wp(2),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
  },
  iconContainer: {
    width: sp(48),
    height: sp(48),
    borderRadius: sp(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.3),
  },
  iconContainerFocused: {
    backgroundColor: colors.borderLight,
  },
  label: {
    fontSize: sp(11),
    fontWeight: '600',
    marginTop: hp(0.2),
  },
  activeDot: {
    width: sp(4),
    height: sp(4),
    borderRadius: sp(2),
    backgroundColor: colors.primary,
    marginTop: hp(0.3),
  },
  centerButtonContainer: {
    marginTop: -hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: sp(64),
    height: sp(64),
    borderRadius: sp(32),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    borderWidth: 5,
    borderColor: colors.white,
  },
});

export default CustomTabBar;
