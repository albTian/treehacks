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

// Check for rinkeby connection
const isRinkebyConnection = (): boolean => {
  // window.ethereum.networkVersion
  // Rinkeby is == 4
  let networkVersion = -1;
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return false;
    }
    networkVersion = window.ethereum.networkVersion
  } catch (error) {
    console.log(error);
  }
  return networkVersion == 4;
}

export { checkMetaConnection, connectMeta, isRinkebyConnection };
