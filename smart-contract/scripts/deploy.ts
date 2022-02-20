import "@nomiclabs/hardhat-waffle";
import hre from "hardhat";

const MYADDR = "0xBDDC81aD3Ce2398C06ac50c541f31B9F49F89D55";

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
  const nftName0 = "NUTS";
  const nftDesc0 = "a test desc";
  const nftURL0 =
    "https://cdn.buildspace.so/courses/mint-your-own-nft/poster.png";
  const txn0 = await saveAsContract.safeMint(
    deployer.address,
    nftName0,
    nftDesc0,
    nftURL0
  );
  await txn0.wait();
  console.log(txn0);

  const nftName1 = "NUTS";
  const nftDesc1 = "a test desc";
  const nftURL1 =
    "https://cdn.buildspace.so/courses/mint-your-own-nft/poster.png";
  const txn1 = await saveAsContract.safeMint(
    deployer.address,
    nftName1,
    nftDesc1,
    nftURL1
  );
  await txn1.wait();
  console.log(txn1);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
