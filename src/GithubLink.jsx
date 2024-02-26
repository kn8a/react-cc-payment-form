import { IconButton } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"

export const GithubLink = ({ ...props }) => {
  // Handle onClick event to open URL in a new tab
  const handleClick = () => {
    window.open("https://github.com/kn8a/react-payment-form", "_blank") // Open link in new tab
  }

  return (
    <IconButton
      size='lg'
      fontSize='x-large'
      aria-label='Open GitHub repository'
      // Removed outline for clear icon view
      icon={<FaGithub />}
      onClick={handleClick}
      {...props}
    />
  )
}
