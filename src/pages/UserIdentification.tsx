import React, { useState } from 'react';
import {
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navagation = useNavigation();

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!! value);
    setName(value);
  }

  async function handleSubmit(){
    if(!name)
      return Alert.alert('Me diz como chamar você 😢')
    
    try{
      await AsyncStorage.setItem('@plantmaneger:user', name)
      navagation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    }catch{
      Alert.alert('Não foi possível salvar seu nome. 😢')
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  { isFilled ? '😀' : '😄' }
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'} chamar você?
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              
              <View style={styles.footer}>
                <Button 
                  title="Confirmar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    width: '100%'
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
    width: '100%',
  },

  header: {
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  emoji: {
    fontSize: 44,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  }
})

//TODO para aparecer os emoji o comando é Ctrl + i no windows

// KeyboardAvoidingView corrige erros ao digitar, sem ele não é possivel ver o 
// button para confirmar, fazendo esta regra com behavior PlatForm ele identifica qual 
// sistema operacional do smartphone, porém com isso é neccesário envolver os demais componentes 
// em outra View para que o efeito de transição dos elementos ao topo seja suave

//TODO usar TouchableWithoutFeedback, melhora a usabilidade do usuário, fazendo que quando clicado
// em qq lugar fora do Input a teclado saia da tela

//TODO AsyncStorage é responsável por armazenar dados no próprio dispositivo do usuário
// expo install @react-native-async-storage/async-storage
// boa prática ao salvar usuário (@plantmaneger:user) sempre começar com @ e o nome do app
// depois o que vc quer salvar nesse app, no caso quero salvar o nome do usuário do app plantmaneger
// desta forma vc evita que de conflitos com outros app do usuário que também estão salvando nome 
// então sempre comece com @ + nome do app + : + o que vc quer salvar
