import React, { useState } from 'react';
import { View, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.3,
    borderColor: theme.grey,
    borderRadius: 2,
    height: 41,
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 5,
    padding: 12,
  },
});

const Input = ({ props = {}, value, onChangeText, type = '' }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <TextInput
        style={styles.input}
        secureTextEntry={!showPassword}
        {...props}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
        }}
      />
      {type === 'password' ? (
        <TouchableHighlight
          onPress={() => setShowPassword(!showPassword)}
          underlayColor="white"
          style={styles.icon}
        >
          <Icon
            name={showPassword ? 'ios-eye' : 'ios-eye-off'}
            size={25}
            color={theme.primary}
          />
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

export default Input;
