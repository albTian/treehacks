import { Button, Image, Input, Text, useToast, Link } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
import { Container } from "../components/Container";
import { getAsset, getOverlay, isValidOpensea } from "../api/helpers";
import { safeMint } from "../api/mintAPI";
import Hero from "../components/Hero";

const HTTP = "https://";

const Index = () => {
  // API
  const [currentAccount, setCurrentAccount] = useState("");
  const [asset, setAsset] = useState<any>();
  const [returnLink, setReturnLink] = useState("");

  // Frontend
  const [inputURL, setInputURL] = useState("");
  // const [inputAddr, setInputAddr] = useState("");
  // const [inputID, setInputID] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // const handleAddrChange = (event: any) => setInputAddr(event.target.value);
  // const handleIDChange = (event: any) => {
  //   const val = event.target.value;
  //   if (Number(val)) {
  //     setInputID(Number(val));
  //   } else if (val == "") {
  //     setInputID(val);
  //   }
  // };
  const handleURLChange = (event: any) => setInputURL(event.target.value);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('isValidOpensea(inputURL)');
    console.log(isValidOpensea(inputURL));
    
    if (!isValidOpensea(inputURL)) {
      toast({
        title: "Pls enter valid url...",
        description: "opensea link pls",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const realURL = new URL(inputURL);
    const paths = realURL.pathname.split("/");
    console.log(paths);

    const inputID = Number(paths[paths.length - 1]);
    const inputAddr = paths[paths.length - 2];
    console.log(inputAddr);
    console.log(inputID);
    

    if (!inputAddr || !inputID) {
      toast({
        title: "Not a valid nft page",
        description:
          "Make sure you're on the specific NFT's page, not the collection",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const newAsset = await getAsset(inputAddr, inputID);
    if (currentAccount && newAsset && newAsset.image_url) {
      // MONKE TIME IN HERE
      console.log("newAsset");
      console.log(newAsset);

      const overlayLink = await getOverlay(newAsset.image_url);
      const fullOverlayLink = `${HTTP}${overlayLink}`;

      const responseLink = await safeMint(
        currentAccount,
        `${newAsset.name || newAsset.name || "noname"} SCREENSHOT`,
        `'${newAsset.description || "no desc too bad"}' - clicked save as lol`,
        fullOverlayLink
      );
      if (responseLink) {
        setAsset(newAsset);
        setReturnLink(responseLink);
      }
    } else {
      toast({
        title: "Something went wrong...",
        description: "this NFT may be stored off chain, kinda smart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
          {/* <Input
            value={inputAddr}
            onChange={handleAddrChange}
            placeholder={"address here"}
          />
          <Input
            value={inputID}
            onChange={handleIDChange}
            placeholder={"token id"}
          /> */}
          <Input
            value={inputURL}
            onChange={handleURLChange}
            placeholder={"opensea url"}
          />

          <Button
            width={"100%"}
            type="submit"
            isLoading={isLoading}
            loadingText={"loading ..."}
            onClick={(e) => handleSubmit(e)}
          >
            🦧 monke time 🦧
          </Button>
          {/* <Button
            width={"100%"}
            onClick={() => getOverlay("https://treehacks.s3.us-west-1.amazonaws.com/goejoldberg69", "recursion")}
          >
            🦧 monke test 🦧
          </Button> */}
          {(!isLoading && returnLink) && (
            <Link href={returnLink} isExternal w={"100%"}>
              <Button w={"100%"}>✨ click here for ur new nft: {asset.name || ""} ✨</Button>
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
