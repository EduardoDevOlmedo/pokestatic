import type { NextPage, GetStaticProps } from 'next'
import {Card, Divider, Grid, Row, Text} from "@nextui-org/react"
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interfaces[ts]'
import PokemonCard from '../pokemon/PokemonCard'
import Image from 'next/image'

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({pokemons}) => {

  return (
    <>


      <Layout title="Pokemon App">
  
        <Grid.Container gap={2} justify="flex-start">
          {
            pokemons.map(pokemon => {
              return (
                <PokemonCard key={pokemon.id} pokemon={pokemon}/>
              )
            })
          }
        </Grid.Container>
      </Layout>

    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.


export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")
  const IMAGEURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" 

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => {
    return {
      ...poke,
      id: i+1,
      image: `${IMAGEURL}${i+1}.svg`
    }
  })

  
  return {
    props: {
      pokemons
    }
  }
}

export default Home
