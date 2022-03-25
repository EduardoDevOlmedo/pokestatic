import { Grid, Card } from "@nextui-org/react"
import { Pokemon } from "../../interfaces[ts]"
import PokeCard from "./PokeCard"

interface Props {
    favoritePokemons: number[],
    pokemons: Pokemon[]
}

const FavoritePokemons: React.FC<Props> = ({favoritePokemons, pokemons}) => {
  
  

    return (
    (
        <Grid.Container gap={2} direction={"row"} justify={"flex-start"}>
          {
            favoritePokemons.map(id => (
              <Grid key={id} xs={6} sm={3} md={2} xl={1}>
                <PokeCard  pokemons={pokemons} id={id} favoritePokemons={favoritePokemons}/>
              </Grid>
            ))
          }
        </Grid.Container>
      )
  )
}

export default FavoritePokemons