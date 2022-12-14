import React from 'react';
import ImageColors from 'react-native-image-colors'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interface/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect, useRef } from 'react';
import { color } from 'react-native-reanimated';
import { useNavigation, CommonActions } from '@react-navigation/native';

const windowWith = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {

    const [bgColor, setBgColor] = useState('gray');
    const isMounted = useRef(true);

    useEffect(() => {
        // IOS:  Background
        // Android: Dominant
    
        if(!isMounted.current) return;

        ImageColors.getColors(pokemon.picture, {fallback: 'gray'})
        .then( colors => {
            if(colors.platform === 'android'){
                setBgColor(colors.dominant || 'gray');
            }
            if(colors.platform === 'ios'){
                setBgColor(colors.background || 'gray');
            }
        })

        return () => {
            isMounted.current = false
        }
    }, []);

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={ () => navigation.dispatch(CommonActions.navigate({name: 'PokemonScreen', params: {
                        simplePokemon: pokemon,
                        color: bgColor
                    }
                })
            )}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWith*0.4,
                backgroundColor: bgColor
            }}>
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image 
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>

            </View>
            <FadeInImage 
                uri={pokemon.picture}
                style={styles.pokemonImage}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        marginBottom: 25,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10, 
    },
    pokebolaContainer: {
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage:{
        width: 120,
        height: 120,
        position: 'absolute',
        right: -0,
        bottom: -4,
    }
});