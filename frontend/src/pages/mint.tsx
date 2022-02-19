import { Box, Heading, Button, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import CandyMachine from "../components/CandyMachine";
import { Container } from "../components/Container";
import NextLink from "next/link";
import theme from "../theme";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
import { mintNFT } from "../api/mintAPI";

const Mint = () => {
  // API specific
  const [currentAccount, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState<any[]>([]);

  // Frontend specific
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();
  const [isMining, setIsMining] = useState(false);

  const onConnectWallet = async () => {
    const account = await connectMeta();
    if (account) {
      setCurrentAccount(account);
      //   updateAllWaves();
    } else {
      toast({
        title: "Make sure you have metamask!",
        description: "Get the chrome extension to connect your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onMintNFT = async () => {
    setIsMining(true);
    const response = await mintNFT();
    if (response) {
      toast({
        title: "Minting went wrong...",
        description: response,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsMining(false);
  };

  // Run on load
  useEffect(() => {
    // Can use anything that needs account on startup in onLoad
    const onLoad = async () => {
      const account = await checkMetaConnection();
      if (account && account !== currentAccount) {
        setCurrentAccount(account);
        // updateAllWaves();
      }
    };

    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Head>
        <title>ethereum mint experiment</title>
      </Head>
      <Box bgGradient={theme.colors.gradient} bgClip="text">
        <Heading fontSize={[30, 45, 60]}>{"ethereum mint experiment"}</Heading>
        <Text>another experiment lol</Text>
        <Button variant={"link"} mt={8}>
          <NextLink href={"/"}>go back</NextLink>
        </Button>
      </Box>
      {currentAccount ? (
        <Button onClick={onMintNFT} isLoading={isMining}>
          mint NFT
        </Button>
      ) : (
        <Button onClick={onConnectWallet}>Connect Metamask</Button>
      )}
    </Container>
  );
};

export default Mint;
