import { Button, Input, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { checkMetaConnection, connectMeta } from "../api/walletAPI";
import { getAllWaves, getWaveContract, wave } from "../api/wavePortalAPI";
import { Container } from "../components/Container";

const Index = () => {

  // Frontend specific
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();
  const [isMining, setIsMining] = useState(false);

  const handleChange = (event: any) => setInputMessage(event.target.value);

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
            type="submit"
            isLoading={isMining}
            loadingText={"mining ..."}
            // onClick={() => onWave(inputMessage)}
          >
            👋 gimme an opensea link to monke
          </Button>
        </>
    </Container>
  );
};

export default Index;
