# react-payment-form

Reusable Credit Card Payment (checkout) Form with changing colors/logos for different card types and support for light/dark modes.
## [Demo](https://kn8a.github.io/react-payment-form/)

![card payment form](https://github.com/kn8a/react-payment-form/assets/88045655/faf1f885-683f-472a-8ba1-4107e3558dc8)

## Features:

 - Light/Dark modes
 - Card flips on CVV entry
 - Animated digits
 - Card tilts with glare on mounse movement
 - Card logo and background change with type
 - Order summary accordion
 - Easy to customize and add card faces and logos
 - Built with Chakra UI

## Usage:

 - You can **clone** or **fork** this repository to include the React Payment Form component in your React application.
	```git clone https://github.com/kn8a/react-payment-form.git```
 - **Install dependencies:** Run the following command
	``npm install``
 - **Start the development server:** Execute the following command:
	``npm run dev``

## **Libraries used:**

 - chakra-ui
 - framer-motion
 - react-icons
 - react-parallax-tilt

## Additional usage info
Sample order is passed to ``<Form/>`` in the following format:
```
const  order  = {
	items: [{
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
	},],
	orderTotal: 100.92,
}
```

- All other parameters are within the ``<Form>`` component.
- Logos and cards face gradient colors can be changed in: 
```
const  logos  = {
default: "",
visa: visaLogo,
mastercard: mastercardLogo,
amex: amexLogo,
jcb: jcbLogo,
discover: discoverLogo,
mir: mirLogo,
}

const  color  = {
default: "linear(to-tr, gray.900 0%, gray.600 90%)",
visa: "linear(to-br, cyan.500 0%, blue.600 30%,black 90%)",
mastercard: "linear(to-br, red.800 20%, yellow.700 70%,)",
amex: "linear(to-br, gray.200 0%, blue.300 40%, blue.600 80%)",
jcb: "linear(to-br, blue.800 20%, red.800, green.800 80%)",
discover: "linear(to-br, orange.500 0%, purple.800 90%)",
mir: "linear(to-br, blue.500 15%, green.600 50%, gray.700 90%)",
}
```
[Additional info on gradients](https://chakra-ui.com/docs/styled-system/gradient)
