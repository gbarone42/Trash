require("dotenv").config();
const fs = require("fs");
const { ethers } = require("hardhat");

async function simulateMatch() {
  const matchData = JSON.parse(fs.readFileSync(__dirname + "/match-data.json", "utf8"));

  const [deployer] = await ethers.getSigners();
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contract = await ethers.getContractAt("ScoreStorage", contractAddress);

  if (!Array.isArray(matchData)) {
    console.error("❌ match-data.json is not an array");
    return;
  }

  console.log("📄 Sending match data to blockchain:", matchData);

  for (const match of matchData) {
    try {
      const tx = await contract.setMatchResult(
        match.tournament_id,
        match.winner,
        match.score
      );      
      await tx.wait();
      console.log(`✅ Match ${match.tournament_id} recorded: ${tx.hash}`);
    } catch (err) {
      console.error(`❌ Error recording match ${match.tournament_id}:`, err.message);
    }
  }
}

simulateMatch();
