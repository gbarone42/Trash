const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const ScoreStorage = await ethers.getContractFactory("ScoreStorage");
  const contract = await ScoreStorage.deploy();
  await contract.deployed();

  console.log("✅ Contract deployed at:", contract.address);

  // 🔥 Aggiorna .env
  updateEnvFile("CONTRACT_ADDRESS", contract.address);
}

function updateEnvFile(key, value) {
  const envPath = ".env";
  const envFile = fs.readFileSync(envPath, "utf8");
  const regex = new RegExp(`^${key}=.*$`, "m");

  let newEnvFile;
  if (regex.test(envFile)) {
    newEnvFile = envFile.replace(regex, `${key}=${value}`);
  } else {
    newEnvFile = envFile + `\n${key}=${value}`;
  }

  fs.writeFileSync(envPath, newEnvFile);
  console.log(`🔄 .env updated: ${key}=${value}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
