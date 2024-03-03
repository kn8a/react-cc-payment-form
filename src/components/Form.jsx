/* eslint-disable react/prop-types */
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
  useColorModeValue,
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
import mirLogo from "../assets/rounded/mir.svg"
import { motion } from "framer-motion"

const logos = {
  default: "",
  visa: visaLogo,
  mastercard: mastercardLogo,
  amex: amexLogo,
  jcb: jcbLogo,
  discover: discoverLogo,
  mir: mirLogo,
}

function detectCreditCardType(cardNumber) {
  // Remove white spaces from the card number
  const cleanedCardNumber = cardNumber.replace(/\s/g, "")

  if (/^4/.test(cleanedCardNumber)) {
    return "visa"
  } else if (/^5[1-5]/.test(cleanedCardNumber)) {
    return "mastercard"
  } else if (/^3[47]/.test(cleanedCardNumber)) {
    return "amex"
  } else if (/^6(?:011|5[0-9]{2}|4[4-9]|22)/.test(cleanedCardNumber)) {
    return "discover"
  } else if (/^(?:2131|1800|35)/.test(cleanedCardNumber)) {
    return "jcb"
  } else if (/^(5[06789]|6)/.test(cleanedCardNumber)) {
    return "mastercard" // Maestro merged with Mastercard
  } else if (/^220[5]/.test(cleanedCardNumber)) {
    return "mir"
  } else {
    return "default"
  }
}

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
  const {
    defaultCardColor,
    visaColor,
    mastercardColor,
    amexColor,
    jcbColor,
    discoverColor,
    mirColor,
    cardGlare = true,
    payButtonColor = "green",
    backButtonColor = "gray",
    issuer = "Bank",
    cardTilt = true,
  } = props

  const color = {
    default: defaultCardColor || "linear(to-tr, gray.900 0%, gray.600 90%)",
    visa: visaColor || "linear(to-br, cyan.500 0%, blue.600 30%,black 90%)",
    mastercard:
      mastercardColor || "linear(to-br, red.800 20%, yellow.700 70%,)",
    amex: amexColor || "linear(to-br, gray.200 0%, blue.300 40%, blue.600 80%)",
    jcb: jcbColor || "linear(to-br, blue.800 20%, red.800, green.800 80%)",
    discover: discoverColor || "linear(to-br, orange.500 0%, purple.800 90%)",
    mir: mirColor || "linear(to-br, blue.500 15%, green.600 50%, gray.700 90%)",
  }

  const [key, setKey] = useState(0)
  const [cardColor, setCardColor] = useState(color.default)
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const [isNotAmex, setIsNotAmex] = useState(true)

  const [card, setCard] = useState({
    number: "0000  0000  0000  0000",
    name: "CARDHOLDER",
    exp: "MM/YY",
    cvv: "●●●",
    type: "",
  })

  useEffect(() => {
    let type = detectCreditCardType(card.number)
    setCard({ ...card, type: type })
    setCardColor(color[type])
    if (type == "amex") {
      setIsNotAmex(false)
    } else {
      setIsNotAmex(true)
    }
  }, [card.type])

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
    if (isNotAmex == true) {
      setIsCvvFocused(true)
      setShowCardFront(false)
    }
  }

  const handleCvvBlur = () => {
    if (isNotAmex == true) {
      setIsCvvFocused(false)
      setShowCardFront(true)
    }
  }

  return (
    <Box fontFamily={"main"}>
      <Flex flexDirection={"column"} padding={0} rounded={30} gap={20}>
        <Flex justifyContent='center'>
          <Flex>
            <Tilt
              tiltEnable={cardTilt}
              trackOnWindow={true}
              tiltReverse={false}
              glareEnable={cardGlare}
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
                height={"220px"}
                width={"350px"}
                bgGradient={cardColor}
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
                    {issuer}{" "}
                  </Text>
                  <BsBank size={30} color='white' />
                </Flex>
                <Flex pt={4} pb={2} justifyContent={"space-between"} pr={4}>
                  <Flex pl={9} pt={2}>
                    <Tilt
                      tiltEnable={false}
                      trackOnWindow={true}
                      tiltReverse={false}
                      glareEnable={cardGlare}
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
                  <Flex alignItems={"end"} hidden={isNotAmex}>
                    <Text color={"gray.900"}>{card.cvv}</Text>
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
                    <Flex pl={9} maxW={"240px"}>
                      <Text
                        color={"white"}
                        fontFamily={"numbers"}
                        textShadow='1px 2px black'
                        textOverflow={"clip"}
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
                  <Text textAlign={"end"} color={"gray.900"}>
                    {card.cvv}
                  </Text>
                </Flex>

                <Flex alignItems={"center"} pt={6} pl={10}>
                  <Flex m={0} p={0} w={"84px"} alignItems={"center"}>
                    <Image width={"100%"} src={logos[card.type]}></Image>
                  </Flex>
                </Flex>
              </Flex>
            </Tilt>
          </Flex>
        </Flex>
        <Flex
          flexDirection={"column"}
          shadow={"md"}
          px={{ base: "2", md: "2", lg: "8" }}
          pt={16}
          pb={4}
          mt={"-100px"}
          gap={3}
          backgroundColor={bgColor}
          rounded={15}
        >
          <Flex flexDir={"column"} gap={4}>
            <FormControl>
              <FormLabel m={0} p={0} pl={4} fontSize={"sm"}>
                {"Cardholder's Name"}
              </FormLabel>
              <Input
                maxLength={22}
                type='text'
                name='name'
                onChange={onChange}
                placeholder='Joe Doe'
              />
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
            </FormControl>
          </Flex>
          <Accordion allowToggle mt={3} borderColor={bgColor}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  rounded={5}
                  border={"1px"}
                  borderColor={borderColor}
                >
                  <Box as='span' flex='1' textAlign='left'>
                    View Order Summary
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
                        borderBottom={"1px"}
                        borderColor={"gray.200"}
                      >
                        <Flex justifyContent={"space-between"}>
                          <Text fontWeight={600} fontSize={"sm"}>
                            {orderItem.name}
                          </Text>
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
                            <Text fontWeight={600} fontSize={"sm"}>
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
            <Button colorScheme={payButtonColor} size={"lg"}>
              Pay ${props.order.orderTotal}
            </Button>
            <Button colorScheme={backButtonColor} size={"sm"}>
              Back to Cart
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Form
