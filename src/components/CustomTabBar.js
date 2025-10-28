import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/colors';
import {wp, hp, sp} from '../utils/responsive';

const CustomTabBar = ({state, descriptors, navigation}) => {
  // Check if current screen should hide tab bar
  const currentRoute = state.routes[state.index];
  const {tabBarStyle} = descriptors[currentRoute.key].options;
  
  if (tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBarBackground}>
        {/* Curved notch for center button */}
        {/* <View style={styles.notchContainer}>
          <View style={styles.notchLeft} />
          <View style={styles.notch} />
          <View style={styles.notchRight} />
        </View> */}

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
                  return {
                    iconFocused: 'home',
                    iconUnfocused: 'home-outline',
                    label: 'Home',
                  };
                case 'Customers':
                  return {
                    iconFocused: 'account-group',
                    iconUnfocused: 'account-group-outline',
                    label: 'Customers',
                  };
                case 'Orders':
                  return {
                    iconFocused: 'cart',
                    iconUnfocused: 'cart-outline',
                    label: 'Orders',
                  };
                case 'Inventory':
                  return {
                    iconFocused: 'package-variant',
                    iconUnfocused: 'package-variant-closed',
                    label: 'Stock',
                  };
                case 'Reports':
                  return {
                    iconFocused: 'chart-box',
                    iconUnfocused: 'chart-box-outline',
                    label: 'Reports',
                  };
                default:
                  return {
                    iconFocused: 'circle',
                    iconUnfocused: 'circle-outline',
                    label: route.name,
                  };
              }
            };

            const {iconFocused, iconUnfocused, label} = getTabConfig();

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
                        ? ['#4CAF50', '#45a049']
                        : [colors.primary, colors.primaryDark]
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.centerButton}>
                    <Icon
                      name={isFocused ? iconFocused : iconUnfocused}
                      size={sp(28)}
                      color={colors.white}
                    />
                  </LinearGradient>
                  <Text
                    style={[
                      styles.centerLabel,
                      {color: isFocused ? colors.success : colors.primary},
                    ]}>
                    {label}
                  </Text>
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
                {isFocused ? (
                  <View style={styles.iconContainer}>
                    <Icon name={iconFocused} size={sp(28)} color={colors.primary} />
                  </View>
                ) : (
                  <View style={styles.iconContainer}>
                    <Icon name={iconUnfocused} size={sp(22)} color={colors.textLight} />
                  </View>
                )}
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused ? colors.primary : colors.textLight,
                      fontWeight: isFocused ? '800' : '600',
                    },
                  ]}>
                  {label}
                </Text>
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
    borderTopLeftRadius: sp(20),
    borderTopRightRadius: sp(20),
    paddingBottom: Platform.OS === 'ios' ? hp(2.5) : hp(1.2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  notchContainer: {
    position: 'absolute',
    top: -sp(1),
    left: 0,
    right: 0,
    height: sp(1),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notchLeft: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: sp(20),
  },
  notch: {
    width: sp(75),
    backgroundColor: 'transparent',
  },
  notchRight: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: sp(20),
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: hp(0.8),
    paddingHorizontal: wp(0.5),
    height: hp(7),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.4),
  },
  iconContainerFocused: {
    width: sp(48),
    height: sp(48),
    borderRadius: sp(24),
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.4),
  },
  label: {
    fontSize: sp(10),
    fontWeight: '600',
    marginTop: hp(0.1),
  },
  activeDot: {
    width: sp(4),
    height: sp(4),
    borderRadius: sp(2),
    backgroundColor: colors.primary,
    marginTop: hp(0.3),
  },
  centerButtonContainer: {
    marginTop: -hp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: sp(60),
    height: sp(60),
    borderRadius: sp(30),
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
  centerLabel: {
    fontSize: sp(9.5),
    fontWeight: '700',
    color: colors.primary,
    marginTop: hp(0.6),
  },
});

export default CustomTabBar;
