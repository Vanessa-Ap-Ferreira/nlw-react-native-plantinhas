import React, { useState } from 'react';
import { 
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { Button } from '../components/Button';
import { isBefore } from 'date-fns';
import { format } from 'date-fns/esm';
import { PlantProps, savePlant } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterdrop from '../assets/waterdrop.png';

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  const navagation = useNavigation();

  function handleChangeTime(event: Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState);
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if(dateTime)
      setSelectedDateTime(dateTime);
  }

  function handleOpenDatetimePickerForAndroid(){
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave(){
    try{
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });
      navagation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    }catch{
      Alert.alert('Não foi possível salvar. 😢');
    }
  }

  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
          />
          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
          <Image
            source={waterdrop}
            style={styles.tipImage}
          />
          <Text style={styles.tipText}>
            {plant.water_tips} 
          </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}  

          {
            Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.dateTimePicker}
                onPress={handleOpenDatetimePickerForAndroid}
              >
                <Text style={styles.dateTimePickerText}>
                  {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }      

          <Button
            title="Cadastrar planta"
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },

  plantName:{
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },

  controller:{
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },

  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },

  dateTimePicker: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },

  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
})

//TODO pra fazer o relógio para lembrar a hora de regar a planta 
// expo install @react-native-community/datetimepicker
// timepicker possui configurações diferentes para android e IOs
// para controle de estado não faz sentido o usuário ser lembrado de um horário que já passou para isso instalar a lib
// npm install date-fns
//