import { Spacer, Switch, useTheme, } from "@nextui-org/react"
import styles from "./Navbar.module.css"
import { Text } from "@nextui-org/react"
import Image from "next/image"
import NavHomeLink from "../NavHomeLink"
import useDarkMode from "use-dark-mode"

export const Navbar = () => {
  
  const {theme} = useTheme()
  const darkMode = useDarkMode()
  const {type, isDark} = useTheme()

  return (
    <div  className={styles.navContainer} 
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
      <Switch 
        checked={darkMode.value}
        onChange={() => darkMode.toggle()}
       />   
      <Spacer />  

      <NavHomeLink href="/search">
          <Text color="white">Search</Text>
      </NavHomeLink>
          
        
        <NavHomeLink href="/favorites">
      <Spacer />  
         <Text color="white" >Favoritos</Text>
        </NavHomeLink>
    </div>
  )
}
