import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

// Update this
const contractAddress = "0xB1D4844C51DE0c13D12Ce9CeA6825deFffBbDc9D";
const contractABI = abi.abi;

// What if we did some class shit and kept track of ethereum as a class var...?

// Helper to return the wavePortalContract. Used to setup 'webhooks'
const getWaveContract = () => {
  let wavePortalContract = null
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      wavePortalContract = new ethers.Contract(
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
  return wavePortalContract
};

// Input: (string) message of the wave
// Output: error message
const wave = async (_message: string): Promise<string> => {
  let response = ""
  try {
    const { ethereum } = window;

    if (ethereum) {
      const wavePortalContract = getWaveContract()
      if (!wavePortalContract) {
        return "Fetching wavePortalContract failed"
      }

      // wave has signature
      // wave(string: message)
      const waveTxn = await wavePortalContract.wave(_message, {
        gasLimit: 300000,
      });
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
    } else {
      console.log("no etherium object lol");
      response = "no etherium object found, make sure you have metamask installed"
    }
  } catch (error) {
    console.log(error);
    response = "You may only send 1 wave per minute to prevent spamming";
  }
  return response;
};

const getAllWaves = async (): Promise<any> => {
  let allWaves = null;
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      allWaves = await wavePortalContract.getAllWaves();

      /*
       * We only need address, timestamp, and message in our UI so let's
       * pick those out
       */
      let wavesCleaned: any[] = [];
      allWaves.forEach((wave: any) => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        });
      });
      allWaves = wavesCleaned;
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log("HERE");
    console.log(error);
  }
  return allWaves;
};

export { getWaveContract, wave, getAllWaves };
