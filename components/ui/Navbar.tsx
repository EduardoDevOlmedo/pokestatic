import { Spacer, useTheme, } from "@nextui-org/react"
import styles from "./Navbar.module.css"
import { Text } from "@nextui-org/react"
import Image from "next/image"
import NextLink from "next/link"
import NavHomeLink from "../NavHomeLink"

export const Navbar = () => {
  
  const {theme} = useTheme()

  return (
    <div className={styles.navContainer} 
          style={{
            backgroundColor: theme?.colors.gray900.value
          }}>
      
      <NavHomeLink>
         <Image  
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Icono de la App" width={70} height={70}
         />  
      </NavHomeLink>
        

       <NavHomeLink>
             <Text color="white" h2>P</Text>
             <Text color="white" h3>okemon</Text>
       </NavHomeLink>
        
  
        
        <Spacer css={{flex: 1}} />
        <NavHomeLink href="/favorites">
         <Text color="white" >Favoritos</Text>
        </NavHomeLink>
    </div>
  )
}
