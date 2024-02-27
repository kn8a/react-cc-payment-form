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

 -  **clone** or **fork** this repository.
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
}
order.orderTotal =  order.items.reduce((total, item) =>  total  +  item.itemTotal, 0);
```

- All other parameters are within the ``<Form>`` component.
- Logos can be changed in: 
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
```
## ``<Form>`` Props
|Prop| Value | 
|--|--|
|cardGlare|true/false (default = true)  |
| cardTilt |true/false (default = true)  |
| issuer | string (default = "Bank") | 
| payButtonColor | string (gray, red, orange, yellow, green, teal, blue, cyan, purple, pink) (default = "green") |
| backButtonColor | string (gray, red, orange, yellow, green, teal, blue, cyan, purple, pink) (default = "gray") |

### Card Face Gradient props [[Additional info on gradients](https://chakra-ui.com/docs/styled-system/gradient)]

|Prop| Value | 
|--|--|
|defaultCardColor|string (default = "linear(to-tr, gray.900 0%, gray.600 90%)")  |
| visaColor |string (default = "linear(to-br, cyan.500 0%, blue.600 30%,black 90%)")  |
| mastercardColor| string (default = "linear(to-br, red.800 20%, yellow.700 70%,)") | 
|amexColor | string (default = "linear(to-br, gray.200 0%, blue.300 40%, blue.600 80%)") |
| jcbColor | string (default = "linear(to-br, blue.800 20%, red.800, green.800 80%)") |
| discoverColor | string (default = "linear(to-br, orange.500 0%, purple.800 90%)") |
| mirColor | string (default = "linear(to-br, blue.500 15%, green.600 50%, gray.700 90%)") |

