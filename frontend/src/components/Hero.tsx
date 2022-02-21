import {
    Heading, Text, VStack
} from "@chakra-ui/react";
import React from "react";
import theme from "../theme";

const title = "🌴 SaveAs 🌴";
const description =
  "give us nft to mint screenshot of it! to try, \
  1. get the Metamask chrome extension, \
  2. switch network to the Rinkeby testnet, \
  3. get some test eth (I like faucet.paradigm.xyz) \
  4. paste ur opensea link in and send it 😎";

interface HoverEmojiProps {
  emoji: StaticImageData;
  title: string;
  description: string;
  href: string;
  external: boolean;
}

const Hero = () => (
  <VStack
    justifyContent="center"
    alignItems="center"
    bgGradient={theme.colors.gradient}
    bgClip="text"
  >
    <Heading fontSize={[30, 45, 60]}>{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);

export default Hero;
