
import './App.css'
import { Flex } from '@chakra-ui/layout'
import Form from './components/Form'

function App() {


  return (
    <Flex justifyContent={'center'} pt={'5%'} height={'100vh'} bgGradient='linear(to-tr, blue.100 , pink.100 )'>
      <Form/>
    </Flex>
  )
}

export default App
