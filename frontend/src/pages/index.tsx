import { Button, Input, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
import { getAllWaves, getWaveContract, wave } from "../api/wavePortalAPI";
import { Container } from "../components/Container";
import Hero from "../components/Hero";
import Waves from "../components/Waves";

const Index = () => {
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
      updateAllWaves();
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

  const updateAllWaves = async () => {
    const newWaves = await getAllWaves();
    if (newWaves) {
      setWaves(newWaves);
    } else {
      console.log(`waves is empty or some shit went wrong`);
    }
  };

  const onWave = async (_message: string) => {
    setIsMining(true);
    const response = await wave(_message);
    if (response) {
      toast({
        title: "Something went wrong...",
        description: response,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    updateAllWaves();
    setIsMining(false);
  };

  const handleChange = (event: any) => setInputMessage(event.target.value);
  
  // Run on load
  useEffect(() => {
    // Can use anything that needs account on startup in onLoad
    const onLoad = async () => {
      const account = await checkMetaConnection();
      if (account && account !== currentAccount) {
        setCurrentAccount(account);
        updateAllWaves();
      }
    };

    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Listen in for emitter events!
  //  */
  useEffect(() => {
    const wavePortalContract = getWaveContract();
    if (wavePortalContract) {
      wavePortalContract.on("NewWave", updateAllWaves);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", updateAllWaves);
      }
    };
  }, []);

  return (
    <Container>
      <Head>
        <title>web3 playground</title>
      </Head>
      <Hero />
      {/* Conditionally render connect button */}
      {currentAccount ? (
        <>
          <Input
            value={inputMessage}
            onChange={handleChange}
            placeholder={"Send me a message to show it below"}
          />
          <Button
            width={"100%"}
            type="submit"
            isLoading={isMining}
            loadingText={"mining ..."}
            onClick={() => onWave(inputMessage)}
          >
            👋 wave at me!
          </Button>
          <Waves waves={waves} />
        </>
      ) : (
        <Button onClick={onConnectWallet}>Connect Metamask</Button>
      )}
    </Container>
  );
};

export default Index;
