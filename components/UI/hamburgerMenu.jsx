import { Box } from "@chakra-ui/react"
import { Turn as Hamburger } from "hamburger-react"

const HamburgerMenu = ({ toggled, toggle }) => (
  <>
    <Box display={{ lg: "none" }}>
      <Hamburger
        hideOutline={false}
        label="hamburger menu"
        size={40}
        color="white"
        toggled={toggled}
        toggle={toggle}
        direction="right"
      />
    </Box>
  </>
)

export default HamburgerMenu
