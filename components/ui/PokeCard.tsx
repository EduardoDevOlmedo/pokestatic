import { Card } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Pokemon } from '../../interfaces[ts]'

interface Props {
    favoritePokemons: number[],
    pokemons: Pokemon[],
    id: number
}

const PokeCard: React.FC<Props> = ({favoritePokemons, pokemons, id}) => {
  
    const router = useRouter()

    const handleClick = (id: number) => {
      router.push(`/pokemon/${id}`)
    }

    const alikePokemons = favoritePokemons.map(el => {
        return pokemons.find(pokemon => pokemon.id == el)
      })
   
    return (
 <Card onClick={() => handleClick(id)} hoverable clickable css={{padding: 10}}>
    <Card.Image 
      src={
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
      }
      width={"100%"}
      height={140}
    />
    <Card.Header>
        {
          alikePokemons.map(el => el?.id === id && el.name.toLocaleUpperCase())
        }
    </Card.Header>
 </Card> 
  )
}

export default PokeCard