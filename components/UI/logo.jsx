import NextLink from "next/link"
import Image from 'next/image'
import bautista from '../../images/bautista2.png'

const Logo = () => (
  <>
    <NextLink href="/" passHref >
      <Image 
        src={bautista} 
        height={450}
        width={450}
      />
    </NextLink>
  </>
)

export default Logo