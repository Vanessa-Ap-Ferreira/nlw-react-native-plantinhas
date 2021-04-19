import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Image, 
  StyleSheet 
} from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import { Button } from '../components/Button';


export function Welcome() {
  const [visible, setVisible] = useState(false);

  function handleVisibility() {
    setVisible(true)
  }
  return (
    //para IOs usar SafeAreaView
    <View style={styles.container}>
      <Text style={styles.title}>
        {/* usar o {'\n} faz a quebra de linha forçada */}
        Gerencie {'\n'} suas plantas {'\n'} de forma fácil
      </Text>

      {
        <Image source={wateringImg} style={styles.image} />
      }

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas.
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>
      <Button 
        title=">" 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 38,
    color: colors.heading,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },

  image: {
    width: 292,
    height: 284,
  },

})