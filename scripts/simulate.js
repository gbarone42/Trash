const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// 🔥 Legge l'indirizzo dal file .contract.json
const contractData = JSON.parse(fs.readFileSync(".contract.json"));
const contractAddress = contractData.address;
const abi = require("../artifacts/contracts/ScoreStorage.sol/ScoreStorage.json").abi;
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function simulateMatch() {
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
    console.error("❌ Error sending match data:", error.message);
  }
}

simulateMatch();
