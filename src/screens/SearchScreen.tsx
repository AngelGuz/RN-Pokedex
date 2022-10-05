import React from 'react';
import { View, Text, Platform, ActivityIndicator, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../Theme/appTheme';
import { useState, useEffect } from 'react';
import { SimplePokemon } from '../interface/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const {top} = useSafeAreaInsets();
    const {isFetching, simplePokemonList} = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

    const [term, setTerm] = useState('');

    useEffect(() => {
        
        if(term.length === 0){
            return setPokemonFiltered([]);
        }

        if(isNaN(Number(term))){
            setPokemonFiltered(
                simplePokemonList.filter(poke => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
            )
        }else{
            const pokemonById = simplePokemonList.find(poke => poke.id === term);
            setPokemonFiltered(
                (pokemonById) ? [pokemonById]: []
            );
        }

        
    }, [term])
    

    if(isFetching){
        return (
            <Loading />
        )
    }

    return (
        <View style={{
            flex: 1,
            marginHorizontal: 20
        }}>
            <SearchInput
                onDebounce={ (value) => setTerm(value) }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios')? top+10: top+30,
                }}
            />

            <FlatList
                data={pokemonFiltered}
                keyExtractor={ (pokemon) => pokemon.id  }
                showsVerticalScrollIndicator={false}
                numColumns={2} // Cambia el numero de columnas
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        marginTop: (Platform.OS === 'ios')? top+60: top+80,
                        paddingBottom: 10
                    }}>{term}</Text>
                )}
                renderItem={ ({item, index}) => (<PokemonCard pokemon={item} />)}
                
            />
        </View>
    )
}