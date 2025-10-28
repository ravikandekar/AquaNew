import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionButton = ({title, iconName, color, onPress}) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
      <Icon name={iconName} size={28} color="#FFFFFF" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 90,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ActionButton;
