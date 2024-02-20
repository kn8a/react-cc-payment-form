import { Flex } from "@chakra-ui/layout"
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Box,
} from "@chakra-ui/react"
import { useState } from "react"

// import { FaCcVisa } from "react-icons/fa6"
// import { FaCcMastercard } from "react-icons/fa6"
// import { FaCcDiscover } from "react-icons/fa6"
// import { FaCcAmex } from "react-icons/fa6"
// import { FaCcJcb } from "react-icons/fa6"
// import { FaHashtag } from "react-icons/fa6"
// import { FaCreditCard } from "react-icons/fa6"
// import { FaCalendarCheck } from "react-icons/fa6"
// import { FaBasketShopping } from "react-icons/fa6"
import { FcSimCardChip } from "react-icons/fc"
import { BsBank } from "react-icons/bs"

import Tilt from "react-parallax-tilt"
import InputMask from "react-input-mask"
import "./card.css"

// import autoAnimate from "@formkit/auto-animate"

const Form = () => {
  const [card, setCard] = useState({
    number: "0000  0000  0000  0000",
    name: "CARDHOLDER",
    exp: "MM/YY",
    cvv: "●●●",
    type: "",
  })

  const onChange = (e) => {
    if (e.target.name == "number" && !e.target.value) {
      setCard({
        ...card,
        [e.target.name]: "0000  0000  0000  0000",
      })
    } else if (e.target.name == "name" && !e.target.value) {
      setCard({
        ...card,
        [e.target.name]: "CARDHOLDER",
      })
    } else if (e.target.name == "exp" && !e.target.value) {
      setCard({
        ...card,
        [e.target.name]: "MM/YY",
      })
    } else if (e.target.name == "cvv" && !e.target.value) {
      setCard({
        ...card,
        [e.target.name]: "●●●",
      })
    } else {
      setCard({
        ...card,
        [e.target.name]: e.target.value.toUpperCase(),
      })
    }
  }

  const [isCvvFocused, setIsCvvFocused] = useState(false)
  const [showCardFront, setShowCardFront] = useState(true)

  const handleCvvFocus = () => {
    setIsCvvFocused(true)
    setShowCardFront(false)
  }

  const handleCvvBlur = () => {
    setIsCvvFocused(false)
    setShowCardFront(true)
  }

  return (
    <Box>
      <Flex
        fontFamily={"main"}
        flexDirection={"column"}
        // border={"1px"}

        padding={8}
        rounded={30}
        gap={20}
      >
        <Flex justifyContent='center'>
          <Flex>
            <Tilt
              tiltEnable={true}
              trackOnWindow={true}
              tiltReverse={false}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor='white'
              glareReverse={false}
              glarePosition='all'
              glareBorderRadius='20px'
              tiltMaxAngleY={2}
              tiltMaxAngleX={5}
              className={isCvvFocused ? "flip" : ""}
              flipHorizontally={isCvvFocused}
              transitionSpeed={1200}
              
            >
              <Flex
              
                borderColor={"green"}
                border={"1px"}
                height={"220px"}
                width={"350px"}
                // mt='-240px'
                bgGradient='linear(to-tr, gray.900 0%, gray.600 90%)'
                borderRadius={20}
                flexDirection={"column"}
                shadow={"dark-lg"}
                hidden={isCvvFocused}
              >
                <Flex
                  pr={8}
                  pt={2}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  gap={4}
                >
                  <Text color={"white"} fontSize={30} fontWeight={600}>
                    Bank{" "}
                  </Text>
                  <BsBank size={30} color='white' />
                </Flex>
                <Flex pt={4} pb={2}>
                  <Flex pl={9} pt={2}>
                    <Tilt
                      tiltEnable={false}
                      trackOnWindow={true}
                      tiltReverse={false}
                      glareEnable={true}
                      glareMaxOpacity={1}
                      glareColor='yellow'
                      glareReverse={false}
                      glarePosition='all'
                      glareBorderRadius='5px'
                      tiltMaxAngleY={4}
                      tiltMaxAngleX={8}
                      
                    >
                      <Flex p={0} my={-2} mx={-1}>
                        <FcSimCardChip size={50} />
                      </Flex>
                    </Tilt>
                  </Flex>
                </Flex>

                <Flex justifyContent={'center'}>
                  <Text
                    textAlign={"center"}
                    color={"white"}
                    fontSize={26}
                    fontFamily={"numbers"}
                    whiteSpace={"preserve"}
                    textShadow='2px 2px black'
                  >
                    {card.number}
                  </Text>
                </Flex>
                <Flex justifyContent={"center"}>
                  <Flex alignItems={"center"} gap={2}>
                    <Text color={"white"} fontSize={8}>
                      Valid Thru
                    </Text>
                    <Text
                      color={"white"}
                      fontFamily={"numbers"}
                      textShadow='2px 2px black'
                    >
                      {card.exp}
                    </Text>
                  </Flex>
                </Flex>
                <Flex pl={8}>
                  <Text
                    color={"white"}
                    fontFamily={"numbers"}
                    textShadow='2px 2px black'
                  >
                    {card.name}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                borderColor={"green"}
                border={"1px"}
                height={"220px"}
                width={"350px"}
                // mt='-240px'
                bgGradient='linear(to-tr, gray.900 0%, gray.600 90%)'
                borderRadius={20}
                flexDirection={"column"}
                shadow={"dark-lg"}
                hidden={showCardFront}
                pt={6}
                className="card-back"
              >
                <Flex h={"40px"} backgroundColor={"black"}></Flex>
                
                  <Flex backgroundColor={"beige"} h={"40px"} ml={10} mr={20} mt={6} pr={4} justifyContent={'right'} alignItems={'center'} >
                    <Text textAlign={'end'}>{card.cvv}</Text>
                  </Flex>
                

                
              </Flex>
            </Tilt>
          </Flex>
        </Flex>

        {/* <Flex justifyContent={'space-around'}>
      <FaCcVisa size={50}/>
      <FaCcMastercard size={50}/>
      <FaCcDiscover size={50}/>
      <FaCcAmex size={50}/>
      <FaCcJcb size={50}/>

      </Flex> */}
        <Flex
          flexDirection={"column"}
          shadow={"md"}
          p={10}
          pt={16}
          mt={"-100px"}
          gap={4}
          backgroundColor={"white"}
          rounded={15}
        >
          <Flex flexDir={"column"} gap={4}>
            <FormControl>
              <FormLabel m={0} p={0} pl={4} fontSize={"sm"}>
                {"Cardholder's Name"}
              </FormLabel>
              <Input
                type='text'
                name='name'
                onChange={onChange}
                placeholder='Joe Doe'
              />
              {/* <FormHelperText>{`We'll never share your email.`}</FormHelperText> */}
            </FormControl>
          </Flex>

          <Flex>
            <FormControl>
              <FormLabel m={0} p={0} pl={4} fontSize={"sm"}>
                Card Number
              </FormLabel>
              <Input
                as={InputMask}
                mask='9999  9999  9999  9999'
                maskChar={null}
                name='number'
                onChange={onChange}
                placeholder='●●●●  ●●●●  ●●●●  ●●●●'
                htmlSize={20}
                width='auto'
              />
              {/* <FormHelperText>{`We'll never share your email.`}</FormHelperText> */}
            </FormControl>
            <FormControl>
              <FormLabel m={0} p={0} fontSize={"sm"} textAlign={"center"}>
                Expiration
              </FormLabel>
              <Input
                as={InputMask}
                mask='99/99'
                maskChar={null}
                name='exp'
                onChange={onChange}
                placeholder='MM/YY'
                htmlSize={4}
                width='auto'
              />
              {/* <FormHelperText>{`We'll never share your email.`}</FormHelperText> */}
            </FormControl>
            <FormControl>
              <FormLabel m={0} p={0} fontSize={"sm"} textAlign={"center"}>
                CVV
              </FormLabel>
              <Input
                onFocus={handleCvvFocus}
                onBlur={handleCvvBlur}
                as={InputMask}
                mask='999'
                maskChar={null}
                name='cvv'
                onChange={onChange}
                placeholder='●●●'
                width='16'
              />
              {/* <FormHelperText>{`We'll never share your email.`}</FormHelperText> */}
            </FormControl>
          </Flex>
          <Flex
            justifyContent={"space-evenly"}
            mt={10}
            flexDirection={"column"}
            gap={4}
          >
            <Button colorScheme='blue' size={"lg"}>
              Process Payment
            </Button>
            <Button size={"sm"}>Back to Cart</Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Form
