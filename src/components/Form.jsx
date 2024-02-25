import { Flex } from "@chakra-ui/layout"
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Box,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { FcSimCardChip } from "react-icons/fc"
import { BsBank } from "react-icons/bs"

import Tilt from "react-parallax-tilt"
import InputMask from "react-input-mask"
import "./card.css"

import visaLogo from "../assets/rounded/visa.svg"
import mastercardLogo from "../assets/rounded/mastercard.svg"
import amexLogo from "../assets/rounded/amex.svg"
import jcbLogo from "../assets/rounded/jcb.svg"
import discoverLogo from "../assets/rounded/discover.svg"
import { motion } from "framer-motion"

// import autoAnimate from "@formkit/auto-animate"

const logos = {
  default: "",
  visa: visaLogo,
  mastercard: mastercardLogo,
  amex: amexLogo,
  jcb: jcbLogo,
  discover: discoverLogo,
}

const color = {
  default: "linear(to-tr, gray.900 0%, gray.600 90%)",
  visa: "linear(to-br, orange.300 0%, blue.600 50%,gray.600 80%)",
  mastercard: "linear(to-br, orange.900 0%, gray.400 90%)",
  amex: "linear(to-br, gray.200 0%, blue.300 40%, blue.600 80%)",
  jcb: "linear(to-br, blue.400, red.300, green.400)",
  discover: "linear(to-br, orange.500 0%, purple.800 90%)",
}

function detectCreditCardType(cardNumber) {
  // Remove white spaces from the card number
  const cleanedCardNumber = cardNumber.replace(/\s/g, "")

  if (/^4/.test(cleanedCardNumber)) {
    return "visa"
  } else if (/^(5[1-5]|6(?:011|5[0-9]{2}|4[4-9]|22))/.test(cleanedCardNumber)) {
    return "mastercard"
  } else if (/^3[47]/.test(cleanedCardNumber)) {
    return "amex"
  } else if (/^6(?:011|5[0-9]{2}|4[4-9]|22)/.test(cleanedCardNumber)) {
    return "discover"
  } else if (/^(?:2131|1800|35)/.test(cleanedCardNumber)) {
    return "jcb"
  } else if (/^(?:5[06789]|6)/.test(cleanedCardNumber)) {
    return "mastercard" // Maestro merged with Mastercard
  } else if (/^220[5]/.test(cleanedCardNumber)) {
    return "mir"
  } else {
    return "default"
  }
}

// Example usage:
const cardNumber = "1234 5678 9012 3456" // Replace with your credit card number
const cardType = detectCreditCardType(cardNumber)
console.log("Credit Card Type:", cardType)

const Character = ({ char }) => {
  return (
    <motion.span
      initial={{ translateY: 30, opacity: 0 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.07, type: "spring", bounce: 100 }}
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  )
}

const Form = (props) => {
  const [key, setKey] = useState(0)
  const [cardColor, setCardColor] = useState(color.default)
  const [card, setCard] = useState({
    number: "0000  0000  0000  0000",
    name: "CARDHOLDER",
    exp: "MM/YY",
    cvv: "●●●",
    type: "",
  })

  console.log(props.order.items)
  useEffect(() => {
    let type = detectCreditCardType(card.number)
    setCard({ ...card, type: type })
    setCardColor(color[type])
    console.log(type)
  }, [card.number])

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
    setKey(key + 1)
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
              flipHorizontally={isCvvFocused}
              transitionSpeed={1200}
            >
              <Flex
                borderColor={"green"}
                border={"1px"}
                height={"220px"}
                width={"350px"}
                // mt='-240px'
                bgGradient={cardColor}
                // backgroundImage={'https://source.unsplash.com/random/350x220/?dark,abstract'}
                borderRadius={20}
                flexDirection={"column"}
                shadow={"dark-lg"}
                hidden={isCvvFocused}
                backdropBrightness={0}
              >
                <Flex
                  pr={8}
                  pt={2}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  gap={4}
                  // border={'2px'}
                  //   borderColor={'green'}
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

                <Flex justifyContent={"center"}>
                  <Flex
                    textAlign={"center"}
                    color={"white"}
                    fontSize={26}
                    fontFamily={"numbers"}
                    whiteSpace={"preserve"}
                    textShadow='2px 2px black'
                  >
                    {/* {card.number} */}
                    <motion.div>
                      {card.number.split("").map((char, index) => (
                        <Character key={index} char={char} />
                      ))}
                    </motion.div>
                  </Flex>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Flex flexDirection={"column"} flex={1}>
                    <Flex justifyContent={"right"} pr={6}>
                      <Flex alignItems={"center"} gap={2}>
                        <Text color={"white"} fontSize={8}>
                          Valid Thru
                        </Text>
                        <Text
                          color={"white"}
                          fontFamily={"numbers"}
                          textShadow='1px 2px black'
                        >
                          {card.exp}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex pl={9}>
                      <Text
                        color={"white"}
                        fontFamily={"numbers"}
                        textShadow='1px 2px black'
                      >
                        {card.name}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    m={0}
                    p={0}
                    w={"78px"}
                    mr={6}
                    alignItems={"center"}
                    justifyItems={"start"}
                  >
                    <Image
                      width={"100%"}
                      maxH={"70px"}
                      src={logos[card.type]}
                    ></Image>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                borderColor={"green"}
                border={"1px"}
                height={"220px"}
                width={"350px"}
                bgGradient='linear(to-tr, gray.900 0%, gray.600 90%)'
                borderRadius={20}
                flexDirection={"column"}
                shadow={"dark-lg"}
                hidden={showCardFront}
                pt={6}
                className='card-back'
              >
                <Flex h={"40px"} backgroundColor={"black"}></Flex>

                <Flex
                  backgroundColor={"beige"}
                  h={"40px"}
                  ml={10}
                  mr={20}
                  mt={6}
                  pr={4}
                  justifyContent={"right"}
                  alignItems={"center"}
                >
                  <Text textAlign={"end"}>{card.cvv}</Text>
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
          gap={3}
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
          <Accordion allowToggle mt={3} borderColor={"white"}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  rounded={5}
                  border={"1px"}
                  borderColor={"gray.200"}
                >
                  <Box as='span' flex='1' textAlign='left'>
                    Order Summery
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2}>
                <Flex flexDirection={"column"} gap={2}>
                  {props.order.items.map((orderItem) => {
                    return (
                      <Flex
                        key={orderItem.name}
                        flexDirection={"column"}
                        borderBottom={"2px"}
                        borderColor={"gray.200"}
                      >
                        <Flex justifyContent={"space-between"}>
                          <Text fontWeight={600}>{orderItem.name}</Text>
                          <Flex alignItems={"center"}>
                            <Text fontSize={"sm"}>Qty: {orderItem.qty}</Text>
                          </Flex>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                          <Flex alignItems={"center"}>
                            <Text fontSize={"sm"}>
                              Price: ${orderItem.price}
                            </Text>
                          </Flex>
                          <Flex alignItems={"center"}>
                            <Text fontWeight={600}>
                              Total: ${orderItem.itemTotal}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    )
                  })}
                  <Flex
                    justifyContent={"space-between"}
                    fontSize={"lg"}
                    fontWeight={600}
                    mt={2}
                  >
                    <Text>Order Total:</Text>
                    <Text>${props.order.orderTotal}</Text>
                  </Flex>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Flex
            justifyContent={"space-evenly"}
            mt={3}
            flexDirection={"column"}
            gap={4}
          >
            <Button colorScheme='green' size={"lg"}>
              Pay ${props.order.orderTotal}
            </Button>
            <Button size={"sm"}>Back to Cart</Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Form
