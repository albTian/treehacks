import { Button, Input, Link, useToast, Image } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { isValidOpensea } from "../api/helpers";
import { safeMint } from "../api/mintAPI";
import { getAsset, getOverlay } from "../api/restAPI";
import {
  checkMetaConnection,
  connectMeta,
  isRinkebyConnection,
} from "../api/walletAPI";
import { Container } from "../components/Container";
import Hero from "../components/Hero";

const Index = () => {
  // API
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentAsset, setCurrentAsset] = useState<any>();
  const [returnLink, setReturnLink] = useState("");
  const [screenshotLink, setScreenshotLink] = useState("");

  // Frontend
  const [inputURL, setInputURL] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleURLChange = (event: any) => setInputURL(event.target.value);
  const handleAssetNameChange = (event: any) =>
    setCurrentAsset({ ...currentAsset, name: event.target.value });
  const handleAssetDescChange = (event: any) =>
    setCurrentAsset({ ...currentAsset, description: event.target.value });

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
        description:
          "Go to your Metamask chrome extension and select Rinkeby Test Network",
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
    // Stop the chain here and modify newAsset lmao
    console.log("Grabbed from opensea:");
    console.log(newAsset);
    // Hard reset the description to prevent special chars lol
    setCurrentAsset({ ...newAsset, description: "nft description" });
    setScreenshotLink(overlayLink);
    setIsLoading(false);
  };

  const handleMint = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(currentAsset);
    console.log("Response from our rest API:");
    console.log(screenshotLink);

    // Call to our Smart Contract
    // TOO BAD NO MORE DESCRIPTIONS LOL
    const nameOrId = currentAsset.name || currentAsset.tokenId || "noname";
    const responseLink = await safeMint(
      currentAccount,
      nameOrId,
      currentAsset.description,
      screenshotLink
    );

    // Reset
    setCurrentAsset(null);
    setIsLoading(false);
    setReturnLink(responseLink);
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
      <Hero
        desc={
          currentAccount && currentAsset
            ? "Would you like to add a custom name or description?"
            : ""
        }
      />
      {currentAccount ? (
        !currentAsset ? (
          // Get the asset from OpenSea
          // Get screenshotted version
          // Set currentAsset to the OpenSea
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
                  ✨ click here for ur new nft! ✨
                </Button>
              </Link>
            )}
          </>
        ) : (
          // Actually mint the changed stuff
          <>
            <Input
              value={currentAsset.name || ""}
              onChange={handleAssetNameChange}
              placeholder={"NFT name"}
            />
            <Input
              value={currentAsset.description || ""}
              onChange={handleAssetDescChange}
              placeholder={"NFT description"}
            />
            <Button
              width={"100%"}
              type="submit"
              isLoading={isLoading}
              loadingText={"loading ..."}
              onClick={(e) => handleMint(e)}
            >
              🦧 monke time 2 🦧
            </Button>
            <Image src={screenshotLink} alt={"NFT screenshot image"} />
          </>
        )
      ) : (
        <Button onClick={() => onConnectWallet()}>CONNECT 2 METAMASK</Button>
      )}
    </Container>
  );
};

export default Index;
