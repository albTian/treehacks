import { Button, Image, Input, Text, useToast, Link } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
import { Container } from "../components/Container";
import { getAsset, getOverlay } from "../api/helpers";
import { safeMint } from "../api/mintAPI";
import Hero from "../components/Hero";

const HTTP = "https://"

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
      const overlayLink = await getOverlay(newAsset.image_original_url, newAsset.name)
      const fullOverlayLink = `${HTTP}${overlayLink}`
      
      const responseLink = await safeMint(
        currentAccount,
        `fuck u ${newAsset.name}`,
        `'${newAsset.description}' - some idiot`,
        fullOverlayLink
      );
      if (responseLink) {
        setAsset(newAsset);
        setReturnLink(responseLink);
      }
    }
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
      <Hero />
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
            🦧 monke time 🦧
          </Button>
          {/* <Button
            width={"100%"}
            onClick={() => getOverlay("https://treehacks.s3.us-west-1.amazonaws.com/goejoldberg69", "recursion")}
          >
            🦧 monke test 🦧
          </Button> */}
          {returnLink && (
            <Link
              href={returnLink}
              isExternal
              w={"100%"}
            >
              <Button w={"100%"}>✨ click here for ur new nft ✨</Button>
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
