import {
    Heading, Text, VStack
} from "@chakra-ui/react";
import React from "react";
import theme from "../theme";

const title = "🌴 SaveAs 🌴";
const description =
  "give us nft to mint screenshot of it. Make sure ur on RINKEBY TESTNET";

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
