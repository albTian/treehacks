import { Keypair, PublicKey } from "@solana/web3.js";

// Used to check if we have metamask installed. Returns
const checkMetaConnection = async (): Promise<any> => {
  let account = null;
  try {
    // To check if we actually have metamask
    const { ethereum } = window;
    if (!ethereum) {
      return null;
    }

    // Check if we have authorization
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // Get first account (?)
    if (accounts.length !== 0) {
      account = accounts[0];
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {
    console.log(error);
  }
  return account;
};

// Returns first account
const connectMeta = async (): Promise<any> => {
  let account = null;
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }

    // Actual request to connect metamask account
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    account = accounts[0];
    console.log(`Connected to: ${account}`);
  } catch (error) {
    console.log(error);
  }
  return account;
};

// Check if we have an existing solana account. Passive request
// TODO: GET RID OF ANY
const checkSolanaConnection = async (): Promise<Keypair> => {
  let address: unknown = null;
  try {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log("Phantom wallet found!");

        /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "Connected with Public Key:",
          response.publicKey.toString()
        );
        address = response;
      }
    } else {
      console.log("No phantom wallet");
    }
  } catch (error) {
    console.error(error);
  }
  return address as Keypair;
};

// Connect to the wallet. Will make an active request and prompt the user
// TODO: GET RID OF ANY
const connectSolana = async (): Promise<Keypair> => {
  let address: unknown = null;
  const { solana } = window;

  if (solana) {
    // The response will be a KeyPair...?
    const response = await solana.connect();
    console.log("Connected with Public Key:", response.publicKey.toString());
    // setWalletAddress(response.publicKey.toString());
    address = response;
  }
  return address as Keypair;
};

export { checkMetaConnection, connectMeta, checkSolanaConnection, connectSolana };
