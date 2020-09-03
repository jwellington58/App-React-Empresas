import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';
import Empresa from '../../assets/empresa.jpeg';

Icon.loadFont();

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    borderRadius: 5,
    margin: 10,
    elevation: 8,
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    borderBottomColor: theme.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeadder: {
    fontSize: theme.h4,
    fontFamily: 'roboto',
    color: theme.grey,
  },
  body: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
  },
  enterpriseImage: {
    height: 142,
    width: 284,
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  containerTextBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#00000060',
    flexDirection: 'row',
  },
  textBody: {
    color: 'white',
    maxWidth: 250,
  },
});

const CardHeader = ({ enterpriseName }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.textHeadder}>{enterpriseName}</Text>
    </View>
  );
};
const CardBody = ({ city, country }) => {
  return (
    <View style={styles.body}>
      <ImageBackground style={styles.enterpriseImage} source={Empresa}>
        <View style={styles.containerTextBody}>
          <Icon name="location" size={20} color="white" />
          <Text style={styles.textBody}>{`${city}, ${country}`}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const Card = ({ enterpriseName, city, country, onPress = () => {} }) => {
  useEffect(() => {});
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => onPress()}
    >
      <View style={styles.container}>
        <CardHeader enterpriseName={enterpriseName} />
        <CardBody city={city} country={country} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
