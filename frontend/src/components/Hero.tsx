import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";

const title = "🌴 SaveAs 🌴";

interface HeroProps {
  desc: string,
}

const Hero = (props: HeroProps) => (
  <VStack
    justifyContent="center"
    alignItems="center"
    bgGradient={theme.colors.gradient}
    bgClip="text"
  >
    <Heading fontSize={[30, 45, 60]}>{title}</Heading>
    {/* To get around some weird <br /> tag nonesense ... */}
    {props.desc ? (
      <Text>{props.desc}</Text>
    ) : (
      <Text>
        Give us an nft to mint a screenshot of it! To try,
        <br />
        <br />
        1. Get the Metamask chrome extension
        <br />
        2. Switch network to the Rinkeby testnet
        <br />
        3. Get some test eth (I like faucet.paradigm.xyz)
        <br />
        4. Paste ur opensea link in and send it
        <br />
      </Text>
    )}
  </VStack>
);

export default Hero;
