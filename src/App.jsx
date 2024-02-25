
import './App.css'
import { Flex } from '@chakra-ui/layout'
import Form from './components/Form'

const order = {
  items: [
    {
      name: 'Teal T-shit',
      qty: 2,
      price: 12.98,
      itemTotal: 25.96
    },
    {
      name: 'White Sneakers (pair)',
      qty: 1,
      price: 44.98,
      itemTotal: 44.98
    },
    {
      name: 'Sunglasses',
      qty: 1,
      price: 29.98,
      itemTotal: 29.98
    },
  
  ],
  orderTotal: 100.92,
}

function App() {


  return (
    <Flex justifyContent={'center'} pt={'5%'} height={'100vh'} bgGradient='linear(to-tr, blue.100 , green.50, pink.100 )'>
      <Form order={order}/>
    </Flex>
  )
}

export default App
