import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { PokemonData, Type } from '../interface/pokemonDataInterface';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonData;
}

export const PokemonDetail = ({pokemon}: Props) => {
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject
            }}
        >
            {/* Types */}
            <View style={{
                ...styles.conatiner, 
                marginTop: 380,
            }}>
                <Text style={styles.title}>Types: </Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemon.types.map( ({type}) => (
                            <Text
                                style={{...styles.regularText, marginRight: 10}}
                                key={type.name}
                            >
                                {type.name}
                            </Text>
                        ))
                    }
                </View>
                {/* Peso */}
                <Text style={styles.title}>Peso</Text>
                <Text style={styles.regularText}>{pokemon.weight}Kg</Text>

            </View>

            {/* Sprites */}
            <View style={styles.conatiner}>
                <Text style={styles.title}>Sprites</Text>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage 
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                <FadeInImage 
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />
                <FadeInImage 
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprite}
                />
                <FadeInImage 
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprite}
                />
            </ScrollView>

            {/* Habilidades */}
            <View style={styles.conatiner}>
                <Text style={styles.title}>Habilidades Base</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemon.abilities.map( ({ability}) => (
                            <Text
                                style={{...styles.regularText, marginRight: 10}}
                                key={ability.name}
                            >
                                {ability.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Movimiento */}
            <View style={styles.conatiner}>
                <Text style={styles.title}>Movimientos </Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                        pokemon.moves.map( ({move}) => (
                            <Text
                                style={{...styles.regularText, marginRight: 10}}
                                key={move.name}
                            >
                                {move.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Stats */}
            <View style={styles.conatiner}>
                <Text style={styles.title}>Estados </Text>
                <View>
                    {
                        pokemon.stats.map( (stat, indice) => (
                            <View 
                                key={stat.stat.name+indice}
                                style={{flexDirection: 'row'}}
                            >
                                <Text style={{...styles.regularText, marginRight: 10, width: 150}}>
                                    {stat.stat.name}
                                </Text>
                                <Text style={{...styles.regularText, marginRight: 10, fontWeight: 'bold'}}>
                                    {stat.base_stat}
                                </Text>
                            </View>
                        ))
                    }
                </View>

                <View style={{marginBottom: 20,alignItems: 'center'}}>
                    <FadeInImage 
                        uri={pokemon.sprites.front_default}
                        style={styles.basicSprite}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        marginHorizontal: 20
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 19,

    },
    basicSprite: {
        height: 100,
        width: 100,
    }
});