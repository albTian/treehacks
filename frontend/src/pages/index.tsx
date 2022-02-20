import { Button, Image, Input, Text, useToast, Link } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
import { Container } from "../components/Container";
import { getAsset } from "../api/helpers";
import { getTokenID, safeMint } from "../api/mintAPI";

const Index = () => {
  // API
  const [currentAccount, setCurrentAccount] = useState("");
  const [asset, setAsset] = useState<any>();
  const [returnLink, setReturnLink] = useState("");

  // Frontend
  const [inputAddr, setInputAddr] = useState("");
  const [inputID, setInputID] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const newAsset = await getAsset(inputAddr, inputID);
    if (newAsset && currentAccount) {
      // MONKE TIME IN HERE
      const response = await safeMint(
        currentAccount,
        `fuck u ${newAsset.name}`,
        `'${newAsset.description}' - some idiot`,
        newAsset.image_original_url
      );
      if (response) {
        setAsset(newAsset);
        setReturnLink(response);
      }
    }
    console.log("RETURNED ASSET");
    console.log(newAsset);
    setIsLoading(false);
  };

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
            type="submit"
            isLoading={isLoading}
            loadingText={"loading ..."}
            onClick={() => handleSubmit()}
          >
            🦧 monke time
          </Button>
          {returnLink && (
            <Link href={returnLink} isExternal>
              click here for ur new nft
            </Link>
          )}
        </>
      ) : (
        <Button onClick={() => onConnectWallet()}>CONNECT 2 METAMASK</Button>
      )}
    </Container>
  );
};

export default Index;
