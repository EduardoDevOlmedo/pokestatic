import { GetStaticProps } from 'next'
import { Card, Grid } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { Layout } from "../../components/layouts"
import NoFavorites from "../../components/ui/NoFavorites"
import { localFavorites } from "../../utils"
import { pokeApi } from '../../api'
import {PokemonListResponse, Pokemon, SmallPokemon } from '../../interfaces[ts]'
import FavoritePokemons from '../../components/ui/FavoritePokemons'


interface Props {
  pokemons: Pokemon[]
}

const FavoritesPage: React.FC<Props> = ({pokemons}) => {

  
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])

  return (
    <Layout title="Favorite Pokemons">
      {
        favoritePokemons.length === 0 ? 
        <NoFavorites />
        : <FavoritePokemons pokemons={pokemons} favoritePokemons={favoritePokemons}/>
      }
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } =  await  pokeApi.get<PokemonListResponse>("/pokemon?limit=151")
  
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => {
    return {
      ...poke,
      id: i+1,
    }
  })

  return {
    props: {
      pokemons
    }
  }
}

export default FavoritesPage;