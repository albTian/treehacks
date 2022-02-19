import { Text } from "@chakra-ui/react";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";

const Stuff = () => {
  const { firstName } = useUser();
  return (
    <>
      <Text>Logged in as {firstName}</Text>
      <UserButton />
    </>
  );
};

const ClerkPage = () => {
  return (
    <>
      <SignedIn>
        <Stuff />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ClerkPage;
