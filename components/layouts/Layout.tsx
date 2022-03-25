import Head from "next/head"
import { Navbar } from "../ui"

interface Props {
    title: string,
    children?: JSX.Element|JSX.Element[];
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: React.FC<Props> = ({title, children}) => {
    
    
    
    return (
        <>  
            <Head>
                <title>{title || "PokeApp"}</title>
                <meta name="author" content="Eduardo olmedo"></meta>
                <meta name="description1" content="Info about the Pokemon XXX"></meta>
                <meta name="keywords" content={`${title}, pokemon, pokedev`}></meta>

                <meta property="og:title" content={`Información sobre ${title}`} />
                <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
                <meta property="og:image" content={`${origin}/image/banner.png`} />
            </Head>
            <Navbar />
            <main style={{padding: "0 20px"}}>
                {children}
            </main>
        </>
    )
}