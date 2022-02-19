import {
  Box, BoxProps, FlexProps, Grid,
  VStack
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Container = (props: BoxProps) => {
  return (
    <Box textAlign="center" fontSize="xl" {...props}>
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        {/* The entire center stack */}
        <VStack
          spacing={8}
          mt={"15vh"}
          mb={"10vh"}
          mx={"auto"}
          width={[325, 450, 600]}
          as={"form"}
        >
          {props.children}
        </VStack>
      </Grid>
    </Box>
  );
};
