require("dotenv").config();
const { Client } = require("pg");
const { ethers } = require("hardhat");

async function syncMatches() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();

  const [deployer] = await ethers.getSigners();
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contract = await ethers.getContractAt("ScoreStorage", contractAddress);

  try {
    const res = await client.query(
      "SELECT tournament_id, winner, score FROM game_matchhistory;"
    );

    for (const match of res.rows) {
      console.log(`🔍 Checking match ${match.tournament_id}...`);

      let exists = false;
      try {
        const result = await contract.getMatchResult(match.tournament_id);
        if (result[0] !== "") {
          exists = true;
        }
      } catch (err) {
        // If call fails, it means match doesn't exist
        exists = false;
      }

      if (exists) {
        console.log(`⚠️ Match ${match.tournament_id} already registered.`);
      } else {
        console.log(`🚀 Registering match ${match.tournament_id}...`);
        const tx = await contract.setMatchResult(
          match.tournament_id,
          match.winner,
          match.score
        );
        await tx.wait();
        console.log(`✅ Match ${match.tournament_id} registered: ${tx.hash}`);
      }
    }
  } catch (err) {
    console.error("❌ Error during sync:", err.message);
  } finally {
    await client.end();
  }
}

syncMatches();
