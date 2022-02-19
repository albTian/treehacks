import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { Keypair } from "@solana/web3.js";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { checkSolanaConnection, connectSolana } from "../api/walletAPI";
import CandyMachine from "../components/CandyMachine";
import { Container } from "../components/Container";
import theme from "../theme";

const Sol = () => {
  // API specific
  const [walletAddress, setWalletAddress] = useState<Keypair>();

  // Frontend specific
  const toast = useToast();

  const onConnectWallet = async () => {
    const address = await connectSolana();
    if (address) {
      setWalletAddress(address);
      // updateAllWaves();
    } else {
      toast({
        title: "Make sure you have phantom wallet!",
        description: "Get the chrome extension to connect your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      const address = await checkSolanaConnection();
      if (address) {
        setWalletAddress(address);
      }
    };
    onLoad()

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <Container>
      <Head>
        <title>solana experiment</title>
      </Head>
      <Box bgGradient={theme.colors.gradient} bgClip="text">
        <Heading fontSize={[30, 45, 60]}>{"solana experiment"}</Heading>
        <Text>
          mint a handwritten letter! Only supports Phantom wallet with Solana at the moment. This is a hello world type project for
          solana/metaplex nft drops using the cady machine protocol.
        </Text>
        <Button variant={"link"} mt={8}>
          <NextLink href={"/"}>go back</NextLink>
        </Button>
      </Box>
      {walletAddress ? (
        <CandyMachine walletAddress={walletAddress} />
      ) : (
        <Button onClick={onConnectWallet}>👻 Connect Phantom wallet</Button>
      )}
    </Container>
  );
};

export default Sol;
