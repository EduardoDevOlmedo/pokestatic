import { Link } from "@nextui-org/react"
import NextLink from "next/link"

interface Props {
    children: JSX.Element|JSX.Element[],
    href?: string;
}

const NavHomeLink: React.FC<Props> = ({children, href = "/"}) => {
  return (
    <NextLink href={href} passHref>
          <Link>
            {children}
         </Link>
    </NextLink>
  )
}

export default NavHomeLink