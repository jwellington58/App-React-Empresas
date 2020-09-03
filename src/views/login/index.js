import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Loading, Input } from '../../components';
import api from '../../services/ApiService';
import theme from '../../theme';
import Logo from '../../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerImage: {
    alignItems: 'center',
    marginTop: -100,
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 53,
  },
  input: {
    borderWidth: 0.3,
    borderColor: theme.grey,
    borderRadius: 2,
    height: 41,
    marginVertical: 10,
  },
  painelButtons: {
    marginHorizontal: 30,
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 5,
    padding: 12,
  },
  containerLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageLoading: { width: 200, height: 53, marginTop: 25 },
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('teste@fortbrasil.com');
  const [password, setPassword] = useState('12345678');
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {}, []);
  function logar() {
    setIsloading(true);
    const credentials = {
      email,
      password,
    };

    api
      .post('session', credentials)
      .then((res) => {
        console.log('Deu bom');
        AsyncStorage.setItem('token', res.data.token).then(() => {
          api.defaults.headers = {
            ...api.defaults.headers,
            Authorization: `Bearer ${res.data.token}`,
          };
          navigation.navigate('Home');
        });
      })
      .catch((err) => {
        console.log('erro', err);
        setError(true);
        setIsloading(false);
      });
  }
  return (
    <>
      {isLoading ? (
        <Loading center />
      ) : (
        <>
          {error ? (
            Alert.alert('Erro', 'Verifique seu email e senha!', [
              { text: 'OK', onPress: () => setError(false) },
            ])
          ) : (
            <View style={styles.container}>
              <View style={styles.painelButtons}>
                <View style={[styles.containerImage]}>
                  <Image style={styles.logo} source={Logo} />
                </View>
                <Input
                  props={{
                    placeholder: 'Email',
                    autoCorrect: false,
                    blurOnSubmit: false,
                    keyboardType: 'email-address',
                    returnKeyType: 'next',
                    autoCapitalize: 'none',
                    autoCompleteType: 'email',
                  }}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  value={email}
                />
                <Input
                  type="password"
                  props={{
                    autoCorrect: false,
                    blurOnSubmit: false,
                    returnKeyType: 'done',
                    autoCapitalize: 'none',
                    autoCompleteType: 'password',
                    placeholder: 'Senha',
                  }}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                />
                <Button label="Entrar" onPress={() => logar()} />
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Login;
