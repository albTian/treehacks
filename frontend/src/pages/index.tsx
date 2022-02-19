import { Button, Input, useToast, Image } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
// import { getAllWaves, getWaveContract, wave } from "../api/wavePortalAPI";
import { Container } from "../components/Container";

const BASE = "https://api.opensea.io/api/v1/asset/";

const getLink = (address: string, tokenId: number) => {
  return `${BASE}${address}/${tokenId}`;
};

const Index = () => {
  // Metamast specific
  const [currentAccount, setCurrentAccount] = useState("");

  // Frontend specific
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();
  const [isMining, setIsMining] = useState(false);

  // Will simply monke with any
  const [asset, setAsset] = useState<any>();

  const handleChange = (event: any) => setInputMessage(event.target.value);

  const onConnectWallet = async () => {
    const account = await connectMeta();
    if (account) {
      setCurrentAccount(account);
      // Update info 
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

  const getAsset = () => {
    const link = getLink(inputMessage, 1);

    axios
      .get(link)
      .then(function (response) {
        // handle success
        console.log(response);
        setAsset(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  // Run on load
  useEffect(() => {
    // Can use anything that needs account on startup in onLoad
    const onLoad = async () => {
      const account = await checkMetaConnection();
      if (account && account !== currentAccount) {
        setCurrentAccount(account);
      }
    };

    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Head>
        <title>TREEHACKS</title>
      </Head>
      {/* Only render connect button if not connected */}
      {currentAccount ? (
        <>
          <Input
            value={inputMessage}
            onChange={handleChange}
            placeholder={"link here"}
          />
          <Button
            width={"100%"}
            // type="submit"
            isLoading={isMining}
            loadingText={"mining ..."}
            onClick={() => getAsset()}
          >
            👋 gimme an address to monke
          </Button>
          {asset && (
            <>
              heres da pic
              <Image src={asset.image_original_url} />
            </>
          )}
        </>
      ) : (
        <Button onClick={() => onConnectWallet()}>CONNECT 2 METAMASK</Button>
      )}
    </Container>
  );
};

export default Index;
