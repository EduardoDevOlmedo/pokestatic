import React, { useEffect, useState } from 'react'

import { Button, Card, Container, Grid, Modal, Text } from '@nextui-org/react';
import { GetStaticPaths } from 'next'
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router'

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../interfaces[ts]';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon
}

const PokemonPage:NextPage<Props> = ({pokemon}) => {
    

    const capitalizedName: string = pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1)
    const [pokemonExists, setPokemonExists] = useState(false)
    const [visibility, setVisibility] = useState(false)
    
    const onToggleFavorite = () => {
      localFavorites.toggleFavorite(pokemon.id)
      setVisibility(true)
      if(localFavorites.pokemonExistsInFavs(pokemon.id)){
        setPokemonExists(true)
    }
      else if(!localFavorites.pokemonExistsInFavs(pokemon.id)){
        setPokemonExists(false)
     }
    }

    useEffect(() => {
        if(localFavorites.pokemonExistsInFavs(pokemon.id)){
            setPokemonExists(true)
        }
          else {
            setPokemonExists(false)
         }
    }, [pokemon.id])
    

        
    

    return (
    <Layout title={`Pokemon App - ${capitalizedName}`}>
        <Grid.Container gap={2} css={{marginTop: '5px'}}>
            <Grid xs={12} sm={4}>
                <Card hoverable css={{padding: "30px"}}>
                    <Card.Body>
                        <Card.Image 
                            src={pokemon.sprites.other?.dream_world.front_default || "/no-image.png"}
                            alt={pokemon.name}
                            width={"100%"}
                            height="200px"
                        />
                    </Card.Body>
                </Card>
            </Grid>

            <Grid xs={12} sm={8}>
                <Card>
                    <Card.Header css={{display: 'flex', justifyContent: "space-between", flexWrap: "wrap"}}>
                        <Text h1> {capitalizedName} </Text>
                        <Button onClick={onToggleFavorite} color={"gradient"} ghost={!pokemonExists}>{pokemonExists ? "Eliminar de favoritos" : "Guardar en favoritos"}</Button>
                    </Card.Header>
                    <Card.Body>
                        <Text size={30}>Sprites: </Text>
                        <Container>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                            <img src={pokemon.sprites.back_default} alt={pokemon.name}/>
                            <img src={pokemon.sprites.back_shiny} alt={pokemon.name}/>
                            <img src={pokemon.sprites.front_shiny} alt={pokemon.name}/>
                        </Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
        <>
        {
            visibility && 
            <Modal
            aria-labelledby="modal-title"
            open={pokemonExists}
            width="200px"
            scroll
            >
            <Modal.Header>
               {capitalizedName} was added to favorites
            </Modal.Header>
            <Modal.Footer css={{justifyContent:"center"}}>
                
            <Button onClick={() => setVisibility(false)}>Ok</Button>
                
            </Modal.Footer>
        </Modal>
        }
        </>
        
    </Layout>
  )
}


// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes


  
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")
    const pokemons151 = data.results.map(el => el.name)
  
    return {
        paths: pokemons151.map(name => ({
            params: {name: name}
        })),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const {name} = params as {name: string}
    const pokemon = await getPokemonInfo(name.toLowerCase())

    if(!pokemon){
        return {
            redirect: {
                destination: "/favorites",
                permanent: false
            }
        }
    }

    return {
      props: {
        pokemon
      }
    }
}
  

export default PokemonPage