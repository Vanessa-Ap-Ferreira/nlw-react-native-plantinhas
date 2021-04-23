import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Welcome() {

  const navagation = useNavigation();

  function handleStart(){
    navagation.navigate('UserIdentification');
  }

  return (
    //para IOs usar SafeAreaView
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          {/* usar o {'\n} faz a quebra de linha forçada */}
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </Text>

        <Image 
          source={wateringImg} 
          style={styles.image} 
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleStart}
      >
        <MaterialIcons 
          name="arrow-forward-ios" 
          style={styles.buttonIcons}
        />
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20, 
  },

  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 38,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
    paddingHorizontal: 10,
  },

  buttonIcons: {
    fontSize: 24,
    color: colors.white,
  }

})


// usar space-araund não deixa grudar nas bordas
  
// React Native trabalha com densidade de pixel, faça import do react-native Dimensions que irá fazer o cálculo das dimensões
// height: Dimensions.get('window').width * 0.7 comando dentro de styles
// as dimensões no celular vão ficar estranhas, para corrigir dentro de Image use resizeMode="contain"

//TODO comando para instalar icons
// expo install @expo/vector-icons

//TODO fonts, além de poder usar google fonts também é possível usar pelo expo font
// comando para instalar 
// npm install --save @expo-google-fonts/{nome da font}
// depois de instalar, vc precisa usar o useFonts que é um hook pra poder carregar a font e poder ficar disponivel no para uso
//TODO importante, vc deve fazer isso na raiz do projeto, neste caso no App.tsx