import { SmallPokemon } from "../interfaces[ts]"
import {Card, Divider, Grid, Row, Text} from "@nextui-org/react"
import { useRouter } from "next/router"

interface Props {
    pokemon: SmallPokemon
}

const PokemonCard: React.FC<Props> = ({pokemon}) => {
 

  const router = useRouter()

  const handleClick = () => {
    router.push(`/name/${pokemon.name}`)
  }

    return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
    <Card onClick={handleClick} color={"primary"} hoverable clickable>
        <Card.Body>
          <Card.Image 
            src={pokemon.image}
            width="100%"
            height={"140px"}
          />
        </Card.Body>
          <Divider className='divider'/>
        <Card.Footer>
          <Row justify='space-between'>
            <Text>{pokemon.name.toLocaleUpperCase()}</Text>
            <Text>{pokemon.id}</Text>
          </Row>
        </Card.Footer>
    </Card>
  </Grid> 
  )
}

export default PokemonCard