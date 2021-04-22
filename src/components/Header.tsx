import React from 'react';
import { 
  Image,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import userImg from '../assets/vanessa.png';
import fonts from '../styles/fonts';

export function Header(){
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Vanessa</Text>
      </View>
      <Image 
        style={styles.image}
        source={userImg} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },

  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  }
})


//TODO em alguns smartphones o header vai ficar atras de algum detalhe da tela, para resolver isso
// instale a lib 
// npm i react-native-iphone-x-helper --save
// marginTop: getStatusBarHeight(), dentro de styles no container 