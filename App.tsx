import React from 'react';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import Routes from './src/routes/index';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsLoaded)
    return <AppLoading />
  
  return (
    <Routes />
  )
}


//TODO instalar loading comando expo install expo-app-loading
// fazendo if se a fonte não foi carregada ele irá fazer o loading até as fontes estar disponivel
// desta forma vc garante que enquanto as fonts não forem carregadas a tela não seja rendenizada

//TODO para fazer a navegação entre telas é necessário instalar o react navagation, seguir a ordem correta para instalação
// 1 - npm install @react-navigation/native
// também é necessário instalar os pacates que lidam diretamente com a navegação de cada sistema 

// 2 - expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// e por último instalar react navagation stack que é o tipo de navegação que será utilizado no app
// 3 - npm install @react-navigation/stack
