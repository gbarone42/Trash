const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const ScoreStorage = await ethers.getContractFactory("ScoreStorage");
  const contract = await ScoreStorage.deploy();
  await contract.deployed();

  console.log("✅ Contract deployed at:", contract.address);

  // 🔥 Scrive l'address su .contract.json
  const data = {
    address: contract.address,
  };
  fs.writeFileSync(".contract.json", JSON.stringify(data, null, 2));
  console.log("📝 Contract address saved in .contract.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
