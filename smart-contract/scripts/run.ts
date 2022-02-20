import "@nomiclabs/hardhat-waffle";
import hre from "hardhat";

const ZERO = "0x0000000000000000000000000000000000000000"

const main = async () => {
  const ethers = hre.ethers;
  const [deployer] = await ethers.getSigners();
  const saveAsFactory = await ethers.getContractFactory("SaveAs");

  // Constructor called here
  const saveAsContract = await saveAsFactory.deploy();
  await saveAsContract.deployed();
  console.log("Contract deployed to:", saveAsContract.address);

  // Must use owner's address or some shit
  // name, desc, img
  const nftName = "NUTS";
  const nftDesc = "a test desc";
  const nftURL =
    "https://cdn.buildspace.so/courses/mint-your-own-nft/poster.png";
  const txn = await saveAsContract.safeMint(deployer.address, nftName, nftDesc, nftURL);
  await txn.wait();
  console.log(txn);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
