import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
  },
});

const Loading = ({ center }) => {
  useEffect(() => {});
  return (
    <View
      style={[
        styles.loading,
        { justifyContent: center ? 'center' : 'flex-start' },
      ]}
    >
      <ActivityIndicator
        size="large"
        color={theme.primary}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

export default Loading;
