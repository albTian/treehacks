import {
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import theme from "../theme";

// TODO: Create a wave interface
const Wave = ({
  message,
  address,
  timestamp,
  isLarge,
}: {
  message: string;
  address: string;
  timestamp: Date;
  isLarge: boolean;
}) => (
  <HStack
    justifyContent="space-between"
    alignItems="top"
    bgGradient={theme.colors.gradient}
    bgClip="text"
    width={"100%"}
    borderRadius="5px"
  >
    <Text textAlign={isLarge ? "left" : "center"} w={isLarge ? "50%" : "100%"}>
      {message}
    </Text>
    {isLarge && (
      <>
        <Text textAlign="left">{timestamp.toDateString()}</Text>
        <Text isTruncated w={"15%"}>
          {address}
        </Text>
      </>
    )}
  </HStack>
);

const Waves = ({ waves }: { waves: any[] }) => {
  const color = useColorModeValue(theme.colors.purple, theme.colors.pink);
  const isLarge = useBreakpointValue({ base: false, sm: true });
  const isEmpty = waves.length == 0;

  return (
    <VStack fontSize={"sm"} textAlign={"left"} color={color}>
      {!isEmpty ? (
        <>
          <HStack
            justifyContent="space-between"
            w={"100%"}
            borderBottom={`1px solid ${color}`}
          >
            <Text
              w={isLarge ? "40%" : "100%"}
              textAlign={isLarge ? "left" : "center"}
            >
              {`✨ message${isLarge ? "" : "s"}`}
            </Text>
            {isLarge && (
              <>
                <Text>⌛ timestamp</Text>
                <Text>🏠 address</Text>
              </>
            )}
          </HStack>
          {waves
            .slice()
            .reverse()
            .map((wave: any) => (
              <Wave
                message={wave.message}
                address={wave.address}
                key={wave.timestamp}
                timestamp={new Date(wave.timestamp)}
                isLarge={isLarge || false}
              />
            ))}
        </>
      ) : (
        <Text>no waves yet! make sure you&apos;re on the rinkeby testnet</Text>
      )}
    </VStack>
  );
};

export default Waves;
