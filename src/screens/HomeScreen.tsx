import React from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../Theme/appTheme';

export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();
    const {isLoading, simplePokemonList, loadPokemons} = usePokemonPaginated();

    return (
        <View>
            <Image 
                source={ require('../assets/pokebola.png') }
                style={styles.pokebolaBG}
            />

            <View style={{
                alignItems: 'center'
            }}>        
                <FlatList 
                    data={simplePokemonList}
                    keyExtractor={ (pokemon) => pokemon.id  }
                    showsVerticalScrollIndicator={false}
                    numColumns={2} // Cambia el numero de columnas

                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top+20,
                            paddingBottom: 10
                        }}>Pokedex</Text>
                    )}

                    renderItem={ ({item, index}) => (<PokemonCard pokemon={item} />)}
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}
                    
                    ListFooterComponent={ (
                        <ActivityIndicator style={{height: 100}} 
                            size={20}
                            color="gray"
                        />
                    ) }
                />
            </View>
        </View>
    )
}