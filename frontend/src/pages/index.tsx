import { Button, Image, Input, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
import { Container } from "../components/Container";
import { getAsset } from "../utils/helpers";

const Index = () => {
  // Metamast specific
  const [currentAccount, setCurrentAccount] = useState("");

  // Frontend specific
  const [inputAddr, setInputAddr] = useState("");
  const [inputID, setInputID] = useState(1);

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Will simply monke with any
  const [asset, setAsset] = useState<any>();

  const handleAddrChange = (event: any) => setInputAddr(event.target.value);
  const handleIDChange = (event: any) => {
    const val = event.target.value;
    if (Number(val)) {
      setInputID(Number(val));
    } else if (val == "") {
      setInputID(val);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    const asset = await getAsset(inputAddr, inputID)
    if (asset) {
      // MONKE TIME IN HERE
      setAsset(asset)
    }
    console.log('RETURNED ASSET')
    console.log(asset)
    setIsLoading(false)
  }

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
      <Text>Gimme address of nft and its token id to troll</Text>
      {currentAccount ? (
        <>
          <Input
            value={inputAddr}
            onChange={handleAddrChange}
            placeholder={"address here"}
          />
          <Input
            value={inputID}
            onChange={handleIDChange}
            placeholder={"token id"}
          />
          <Button
            width={"100%"}
            // type="submit"
            isLoading={isLoading}
            loadingText={"loading ..."}
            onClick={() => handleSubmit()}
          >
            🦧 monke time
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
