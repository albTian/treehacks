import { Button, Input, Link, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { isValidOpensea } from "../api/helpers";
import { safeMint } from "../api/mintAPI";
import { getAsset, getOverlay } from "../api/restAPI";
import {
  checkMetaConnection,
  connectMeta,
  isRinkebyConnection
} from "../api/walletAPI";
import { Container } from "../components/Container";
import Hero from "../components/Hero";

const Index = () => {
  // API
  const [currentAccount, setCurrentAccount] = useState("");
  const [asset, setAsset] = useState<any>();
  const [returnLink, setReturnLink] = useState("");

  // Frontend
  const [inputURL, setInputURL] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleURLChange = (event: any) => setInputURL(event.target.value);

  // Where the magic happens
  // Pattern:
  //    API call or check
  //    Guard clause (with toast)
  const handleSubmit = async (event: any) => {
    event.preventDefault();


    
    // Must be valid url AND opensea url
    // Can add more support for sites here
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

    if (!isRinkebyConnection()) {
      toast({
        title: "Make sure you're on the rinkeby testnet",
        description: "Go to your Metamask chrome extension and select Rinkeby Test Network",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Parse url
    const realURL = new URL(inputURL);
    const paths = realURL.pathname.split("/");

    const inputID = Number(paths[paths.length - 1]);
    const inputAddr = paths[paths.length - 2];

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
    if (!(currentAccount && newAsset && newAsset.image_url)) {
      toast({
        title: "Something went wrong...",
        description:
          "Make sure you're on the specific NFT's page, not the collection",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    console.log(newAsset, "newAsset");

    // Call to our API
    const overlayLink = await getOverlay(newAsset.image_url);
    if (!overlayLink) {
      toast({
        title: "Couldn't saveas...",
        description: "this NFT may be stored off chain, kinda smart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    // Call to our Smart Contract
    const responseLink = await safeMint(
      currentAccount,
      `${
        newAsset.name || newAsset.name || newAsset.token_id || "noname"
      } SCREENSHOT`,
      `'${newAsset.description || "no desc too bad"}' - clicked save as lol`,
      overlayLink
    );
    if (responseLink) {
      setAsset(newAsset);
      setReturnLink(responseLink);
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
        description:
          "Get the chrome extension to connect your wallet. If you have it, try manually logging in with the extension",
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
          {!isLoading && returnLink && (
            <Link href={returnLink} isExternal w={"100%"}>
              <Button w={"100%"}>
                ✨ click here for ur new nft: {asset.name || ""} ✨
              </Button>
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
