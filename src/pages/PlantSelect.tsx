import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList, 
  ActivityIndicator
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';
import { useNavigation } from '@react-navigation/core';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoadin] = useState(true);
  
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleEnviromentSelected(evironment: string) {
    setEnviromentSelected(evironment);

    if(evironment == 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.environments.includes(evironment)  
    );

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number){
    if(distance < 1)
      return;
    
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  async function fetchPlants() {
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if(!data)
      return setLoadin(true);

    if(page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    }else {
      setPlants(data);
      setFilteredPlants(data);
    }
    
    setLoadingMore(false);
    setLoadin(false);
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api
      .get('plants_environments?_sort=title&_order=asc');
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ])
    }

    fetchEnviroment();

  }, [])

  useEffect(() => {
    
    fetchPlants();
  }, [])

  if(loading)
    return <Load />
    
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View>
        <FlatList 
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton 
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary 
              data ={item} 
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore
            ?
            <ActivityIndicator color={colors.green} />
            : <></>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
  },

  title:{
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 20,
    color: colors.heading,
  },

  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 32,
    marginVertical: 32,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})

//TODO FlatList, faz uma lista de elementos ela espera que seja passado qual é o id e todo elemento é ideal que tenha um id
// horizontal por padrão a lista está na vertical, com esse comando ela fica na horizontal
// showsHorizontalScrollIndicator={false} retira a barra de rolagem dos itens

//TODO load pode ser baixado https://lottiefiles.com/
// após escolher qual quer utilizar faça o download em formato json e salve dentro da pasta assets
// faça a instalação do expo install lottie-react-native