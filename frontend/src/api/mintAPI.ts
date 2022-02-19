import { ethers } from "ethers";
import abi from "../utils/NFTContract.json";

const CONTRACT_ADDRESS = "0x39a0ccf3252a144b0618c07b6c538c6a64e75fc0";
const contractABI = abi.abi;


// Return the mint contract
const getMintContract = () => {
  // Outside variable setup: ethereum
  const { ethereum } = window;
  if (!ethereum) {
    console.log("ethereum doesn't exist");
    return null;
  }

  let mintContract = null;
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    mintContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  } catch (error) {
    console.log(error);
  }
  return mintContract;
};

// Actually mint the NFT
// Return an error message if failed
const mintNFT = async (): Promise<string> => {
  // Outside variable setup: ethereum, mintContract
  const { ethereum } = window;
  if (!ethereum) {
    return "window.ethereum doesn't exist";
  }

  const mintContract = getMintContract();
  if (!mintContract) {
    return "no mint contract returned...";
  }

  let response = "";
  // Now we are guranteed to have ethereum and mintContract
  try {
    console.log("Going to pop wallet now to pay gas...");
    let nftTxn = await mintContract.mint();

    console.log("Mining...please wait.");
    await nftTxn.wait();

    console.log(
      `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
    );
  } catch (error: any) {
    console.log(error);
    response = error.message;
  }
  return response;
};

export { mintNFT };
