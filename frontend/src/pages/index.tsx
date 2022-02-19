import { Button, Input, useToast, Image } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
// import { checkMetaConnection, connectMeta } from "../api/walletAPI";
// import { getAllWaves, getWaveContract, wave } from "../api/wavePortalAPI";
import { Container } from "../components/Container";

const BASE = "https://api.opensea.io/api/v1/asset/";

const getLink = (address: string, tokenId: number) => {
  return `${BASE}${address}/${tokenId}`;
};

const Index = () => {
  // Frontend specific
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();
  const [isMining, setIsMining] = useState(false);

  // Will simply monke with any
  const [asset, setAsset] = useState<any>();

  const handleChange = (event: any) => setInputMessage(event.target.value);

  const getAsset = () => {
    const coin = "0x42dce91f8d7aa15d707e2598dd9dcdb114e58a21";
    const link = getLink(inputMessage, 1);
    console.log("HERES THE LINK:", link);

    const options = { method: "GET" };

    axios
      .get(link)
      .then(function (response) {
        // handle success
        console.log(response);
        setAsset(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <Container>
      <Head>
        <title>TREEHACKS</title>
      </Head>
      {/* Conditionally render connect button */}
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
      </>
      {asset && 
      <>
        heres da pic
        <Image src={asset.image_original_url}/>
      </>
      }
    </Container>
  );
};

export default Index;
