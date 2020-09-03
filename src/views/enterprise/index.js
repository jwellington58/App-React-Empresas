import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { set } from 'react-native-reanimated';
import { Loading } from '../../components';
import api from '../../services/ApiService';
import Empresa from '../../assets/empresa.jpeg';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  enterpriseImage: {
    height: 300,
    justifyContent: 'flex-end',
  },
  containerImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerTextImage: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    backgroundColor: '#00000060',
    flexDirection: 'row',
    marginLeft: 10,
  },
  textImage: {
    color: 'white',
    maxWidth: 250,
  },
  containerScroll: { flex: 1, margin: 10 },
  text: {
    fontSize: theme.h5,
    color: theme.grey,
  },
  containerIconText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 2,
    padding: 5,
  },
  icon: {
    marginRight: 5,
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
  containerHeaderImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  iconHeaderImage: { marginLeft: 10, marginTop: 10 },
});

const TextIcon = ({ font, icon = '', text }) => {
  return (
    <View style={styles.containerIconText}>
      {icon !== '' ? (
        <>
          {font ? (
            <FontAwesome
              name={icon}
              size={25}
              color={theme.grey}
              style={styles.icon}
            />
          ) : (
            <Icon
              name={icon}
              size={25}
              color={theme.grey}
              style={styles.icon}
            />
          )}
        </>
      ) : null}

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const Enterprise = ({ route, navigation }) => {
  const [enterprise, setEnterprise] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [erro, setError] = useState(false);
  // function loading(id) {
  //   const headers = {
  //     // ...api.defaults.headers,
  //     empresa_id: id,
  //   };
  //   setLoading(true);
  //   api
  //     .get(
  //       `empresas/id`,
  //       {},
  //       {
  //         headers: {
  //           empresa_id: id,
  //         },
  //       }
  //     )
  //     .then((emps) => {
  //       if (emps.data !== undefined) {
  //         setEnterprise(emps.data);
  //         setLoading(false);
  //       } else {
  //         setError(true);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('Deu ruim ==>', err);
  //       setError(true);
  //       setLoading(false);
  //     });
  // }
  useEffect(() => {
    setEnterprise(route.params.enterprise);
    // loading(route.params.id);
    const backAction = () => {
      navigation.goBack();
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
      {!isLoading ? (
        <>
          {erro ? (
            <View style={styles.containerMessage}>
              <Icon name="cloud-offline" size={25} color={theme.grey} />
              <Text style={styles.textMessage}>
                Erro, verifique sua conexão.
              </Text>
            </View>
          ) : (
            <>
              <ImageBackground style={styles.enterpriseImage} source={Empresa}>
                <View style={styles.containerImage}>
                  <View style={styles.containerHeaderImage}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <Icon
                        name="arrow-back"
                        color="white"
                        size={25}
                        style={styles.iconHeaderImage}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.containerTextImage}>
                    <Text style={styles.textImage}>{enterprise.nome}</Text>
                  </View>
                </View>
              </ImageBackground>
              <ScrollView style={styles.containerScroll}>
                <>
                  <TextIcon text="Descricao" />
                  <TextIcon
                    icon="location"
                    text={`${enterprise.cidade}, ${enterprise.pais}`}
                  />
                  <TextIcon
                    icon="phone-square"
                    text={
                      enterprise.telefone
                        ? enterprise.telefone
                        : 'Não informado'
                    }
                    font
                  />
                  <TextIcon
                    icon="mail"
                    text={enterprise.email ? enterprise.email : 'Não informado'}
                  />
                  <TextIcon
                    icon="linkedin-square"
                    text={
                      enterprise.linkedin
                        ? enterprise.linkedin
                        : 'Não informado'
                    }
                    font
                  />
                  <TextIcon
                    icon="facebook-square"
                    text={
                      enterprise.facebook
                        ? enterprise.facebook
                        : 'Não informado'
                    }
                    font
                  />
                  <TextIcon
                    icon="instagram"
                    text={
                      enterprise.instagram
                        ? enterprise.instagram
                        : 'Não informado'
                    }
                    font
                  />
                </>
              </ScrollView>
            </>
          )}
        </>
      ) : (
        <Loading center />
      )}
    </View>
  );
};

export default Enterprise;
