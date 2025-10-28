import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {hp} from '../utils/responsive';

const TabScreenWrapper = ({children}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? hp(10) : hp(8),
  },
});

export default TabScreenWrapper;
