import { ethers } from "ethers";
import Web3 from "web3";
import abi from "../utils/SaveAs.json";
var web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");

const CONTRACT_ADDRESS = "0xC860e3a161300Ef76356Be1523517BAfc8877370";
const contractABI = abi.abi;
const BASE = "https://testnets.opensea.io/assets/";

const returnLink = BASE + CONTRACT_ADDRESS;

// Return the mint contract
const getSaveAsContract = () => {
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

// Get the token id based off transaction id
const getTokenID = async (txnId: string): Promise<number> => {
  let id = 1
  await web3.eth.getTransactionReceipt(txnId).then(function(data: { logs: any; }){
    let transaction = data;
    let logs = data.logs;
    id = web3.utils.hexToNumber(logs[0].topics[3])
  });
  return id
}

// Actually mint the NFT
// Need address + data( name, desc, image )
// Will return the addr
const safeMint = async (
  addr: string,
  name: string,
  desc: string,
  img: string
): Promise<string> => {
  // Outside variable setup: ethereum, mintContract
  const { ethereum } = window;
  if (!ethereum) {
    return "window.ethereum doesn't exist";
  }

  const saveAsContract = getSaveAsContract();
  if (!saveAsContract) {
    return "no mint contract returned...";
  }

  let response = "";
  // Now we are guranteed to have ethereum and saveAsContract
  try {
    console.log("Going to pop wallet now to pay gas...");

    // Params: addr, name, desc, img
    let nftTxn = await saveAsContract.safeMint(addr, name, desc, img);
    // console.log(`nftTxn:`);
    // console.log(nftTxn);

    // console.log("Mining...please wait.");
    const dog = await nftTxn.wait();
    // console.log(`dog:`);
    // console.log(dog);

    // console.log(
    //   `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
    // );
    const id = await getTokenID(nftTxn.hash)
    response = `${returnLink}/${id}`;
    console.log(response);
    
  } catch (error: any) {
    console.log(error);
    response = "";
  }
  return response;
};

export { safeMint };
