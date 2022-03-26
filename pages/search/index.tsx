import { Button, Grid, Input, Text } from "@nextui-org/react"
import { useCallback, useEffect, useState } from "react"
import { Layout } from "../../components/layouts"
import { GetStaticProps, NextPage } from 'next';
import { pokeApi } from "../../api";
import { PokemonListResponse, SmallPokemon } from "../../interfaces[ts]";
import PokemonCard from "../../pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[],

}



const Index:NextPage<Props> = ({pokemons}) => {
  
  const [input, setInput] = useState("")
  const [characters, setCharacters] = useState<any>([])

    const handleChange = (e: any) => {
      setInput(e.target.value)
    }

    const getData = useCallback(
      () => {
        if(input.trim() !== ""){
          const value = input.toLowerCase()
          const foundPokemons = pokemons.filter((pokemon: SmallPokemon) => {
            return pokemon.name.toLowerCase().includes(value)
          })
          setCharacters(foundPokemons)
        }
        else {
          setCharacters([])
        }
      },
      [input, pokemons],
    )
    
    
    useEffect(() => {
        getData()
      }, [input, getData])
      


    return (
    <Layout title="Search">
        <Grid.Container css={{marginTop: 20}} gap={2} alignItems={"center"} justify="center">
            <Grid xs={6} xl={12} md={8}>
             <Input width="100%" 
            clearable 
            onChange={handleChange}
            label="Find a a pokemon" 
            placeholder="Search for a pokemon" 
            initialValue={input}
            name={"input"}
            />
            </Grid>
        </Grid.Container>
        <Grid.Container  gap={2} alignItems={"center"} justify="center">
            {
              characters.length === 0 ?
              <Text h3>Search a Pokemon</Text>
              :
              characters.map((el: SmallPokemon) => {
                return (
                  <PokemonCard key={el.id} pokemon={el}/>
                )
              })
            }
      </Grid.Container>

    </Layout>
  )
}



export const getStaticProps: GetStaticProps = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=800")
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



 
export default Index