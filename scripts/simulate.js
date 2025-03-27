const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, require("../artifacts/contracts/ScoreStorage.sol/ScoreStorage.json").abi, wallet);

async function simulateMatch() {
  // Read match data from JSON file
  const rawData = fs.readFileSync(__dirname + "/match-data.json");
  const matchData = JSON.parse(rawData);

  console.log("📄 Sending match data to blockchain:", matchData);

  try {
    const tx = await contract.setMatchResult(
      matchData.id_partita,
      matchData.id_squadra,
      matchData.id_punteggio
    );
    await tx.wait();
    console.log("✅ Simulated match recorded on blockchain:", tx.hash);
  } catch (error) {
    console.error("❌ Error sending match data:", error);
  }
}

simulateMatch();
