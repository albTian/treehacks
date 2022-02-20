import { ethers } from "ethers";
// CHANGE THIS
import abi from "../utils/WavePortal.json";

// CHANGE THESE
const contractAddress = "0xB1D4844C51DE0c13D12Ce9CeA6825deFffBbDc9D";
const contractABI = abi.abi;

const getSaveAsContract = () => {
  let saveAsContract = null;
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      saveAsContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log(error);
  }
  return saveAsContract;
};

const createChild = async (_url: string): Promise<string> => {
  let response = "";
  try {
    const { ethereum } = window;

    if (ethereum) {
      const wavePortalContract = getSaveAsContract();
      if (!wavePortalContract) {
        return "Fetching wavePortalContract failed";
      }

      // wave has signature
      // wave(string: message)
      const waveTxn = await wavePortalContract.wave(_url, {
        gasLimit: 300000,
      });
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
    } else {
      console.log("no etherium object lol");
      response =
        "no etherium object found, make sure you have metamask installed";
    }
  } catch (error) {
    console.log(error);
    response = "You may only send 1 wave per minute to prevent spamming";
  }
  return response;
};

export {};
