import { Button, Text, useToast, Image, SimpleGrid } from "@chakra-ui/react";
import { Keypair } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { getMints, mintToken } from "../../api/candyAPI";
// import Image from "next/image";

interface CandyMachineProps {
  walletAddress: Keypair;
}

const sizing = ["75px", "100px", "120px"];

const CandyMachine = ({ walletAddress }: CandyMachineProps) => {
  // API specific
  const [mints, setMints] = useState([]);

  // Frontend specific
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isLoadingMints, setIsLoadingMints] = useState<boolean>(true);
  const toast = useToast();

  const handleMint = async () => {
    if (walletAddress) {
      setIsMinting(true);
      // Try window.solana
      const response = await mintToken(walletAddress);
      if (response) {
        toast({
          title: "Minting failed...",
          description: response,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsMinting(false);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      setIsLoadingMints(true);
      await getMints(mints, setMints);
      setIsLoadingMints(false);
    };

    onLoad();
  }, []);

  return (
    <>
      <Button
        width={"100%"}
        onClick={handleMint}
        isLoading={isMinting}
        loadingText={"minting ..."}
      >
        ✨ mint NFT
      </Button>
      {isLoadingMints ? (
        <Button
          isLoading={isLoadingMints}
          loadingText="loading previous mints..."
        ></Button>
      ) : (
        <>
          <Text>Already minted:</Text>
          <SimpleGrid columns={{ base: 1, sm: 3, md: 5}} spacing={12}>
            {mints.map((mint) => (
              <Image
                key={mint}
                src={mint}
                alt={`Minted NFT ${mint}`}
                w={sizing}
                h={sizing}
                objectFit={"contain"}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default CandyMachine;
