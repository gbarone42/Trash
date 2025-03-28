const { ethers } = require("hardhat");

async function main() {
  const ScoreStorage = await ethers.getContractFactory("ScoreStorage");
  const contract = await ScoreStorage.deploy();
  await contract.deployed();
  console.log("✅ Contract deployed at:", contract.address);
}

main().catch(console.error);
