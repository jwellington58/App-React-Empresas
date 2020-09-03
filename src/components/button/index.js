import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.primary,
    height: 41,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#d7d7d7',
  },
  label: {
    fontSize: theme.h5,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
});

const Button = ({ onPress, label, style, disabled }) => (
  <View style={style}>
    <TouchableHighlight
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      underlayColor="#d7d7d7"
      disabled={disabled}
    >
      <>
        <Text style={[styles.label]}>{label.toUpperCase()}</Text>
      </>
    </TouchableHighlight>
  </View>
);

export default Button;
