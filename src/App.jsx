import "./App.css"
import { Flex } from "@chakra-ui/layout"
import { useColorModeValue } from "@chakra-ui/react"
import Form from "./components/Form"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { GithubLink } from "./GithubLink"


const order = {
  items: [
    {
      name: "Teal T-Shirt",
      qty: 2,
      price: 12.98,
      itemTotal: 25.96,
    },
    {
      name: "White Sneakers",
      qty: 1,
      price: 44.98,
      itemTotal: 44.98,
    },
    {
      name: "Sunglasses",
      qty: 1,
      price: 29.98,
      itemTotal: 29.98,
    },
  ],
  orderTotal: 100.92,
}

function App() {
  const bgGradient = useColorModeValue(
    "linear(to-tr, blue.100 , green.50, pink.100 )",
    "linear(to-tr, blue.900, black , gray.700)"
  )

  return (
    <Flex flexDirection={'column'} bgGradient={bgGradient} height={"100vh"}>
      <Flex gap={2} justifyContent={'flex-end'} p={2} >
        <GithubLink/>
      <ColorModeSwitcher/>
      </Flex>
      <Flex
      justifyContent={"center"}
      pt={"5%"}
      
      

    >
      
      
      <Form order={order} />
    </Flex>
    </Flex>
    
    
  )
}

export default App
