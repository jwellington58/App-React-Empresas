import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { debounce } from 'debounce';
import { Card, Header, Loading } from '../../components';
import api from '../../services/ApiService';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: { flexGrow: 1, alignItems: 'center' },
  loading: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
  },
  containerMessage: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  textMessage: {
    fontSize: theme.h4,
    color: theme.grey,
  },
});

const Home = ({ navigation }) => {
  const [enterprises, setEnterprises] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function findBySearch(search) {
    setLoading(true);
    api
      .get(`empresas`)
      .then((emps) => {
        if (emps.data !== undefined) {
          setEnterprises(emps.data);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }
  function findBySearchDebounce(search) {
    debounce(findBySearch(search), 200);
  }
  function lougout() {
    setLoading(true);
    AsyncStorage.removeItem('token').then(() => {
      navigation.navigate('Login');
    });
  }
  useEffect(() => {
    findBySearch('');
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        icon="exit-outline"
        onSearch={findBySearch}
        onSearchChangeText={findBySearchDebounce}
        onPress={() => {
          Alert.alert('Sair', 'Você deseja realmente sair?', [
            { text: 'Não', onPress: () => {} },
            { text: 'Sim', onPress: () => lougout() },
          ]);
        }}
      />
      {!isLoading ? (
        <>
          {error ? (
            <View style={styles.containerMessage}>
              <Icon name="cloud-offline" size={25} color={theme.grey} />
              <Text style={styles.textMessage}>
                Erro, verifique sua conexão.
              </Text>
            </View>
          ) : (
            <>
              {enterprises.length > 0 ? (
                <ScrollView
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContent}
                >
                  <>
                    {enterprises.map((emp) => {
                      return (
                        <Card
                          key={emp.id}
                          enterpriseName={emp.nome}
                          city={emp.cidade}
                          country={emp.pais}
                          onPress={() => {
                            navigation.navigate('Enterprise', {
                              enterprise: emp,
                            });
                          }}
                        />
                      );
                    })}
                  </>
                </ScrollView>
              ) : (
                <View style={styles.containerMessage}>
                  <Text style={styles.textMessage}>
                    Nenhum registro foi encotrado.
                  </Text>
                </View>
              )}
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Home;
