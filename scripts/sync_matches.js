require("dotenv").config();
const fs = require("fs");
const { Client } = require("pg");
const { ethers } = require("hardhat");

async function getMatchesFromDB() {
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  await client.connect();
  try {
    const res = await client.query(
      "SELECT tournament_id, winner, score FROM game_matchhistory;"
    );
    return res.rows;
  } catch (err) {
    console.error("❌ Error querying DB:", err.message);
    return [];
  } finally {
    await client.end();
  }
}

async function syncMatches() {
  const [deployer] = await ethers.getSigners();
  const contractJson = JSON.parse(fs.readFileSync("./.contract.json", "utf8"));
  const contractAddress = contractJson.address;
  const contract = await ethers.getContractAt("ScoreStorage", contractAddress);

  console.log("🚀 Syncing matches from DB every 30s...");

  setInterval(async () => {
    console.log("🔄 Checking for new matches...");
    const matches = await getMatchesFromDB();

    for (const match of matches) {
      try {
        const tx = await contract.setMatchResult(
          match.tournament_id,
          match.winner,
          match.score
        );
        await tx.wait();
        console.log(`✅ Match ${match.tournament_id} recorded: ${tx.hash}`);
      } catch (err) {
        if (err.error && err.error.message.includes("Match already registered")) {
          console.log(`⚠️ Match ${match.tournament_id} already registered. Skipping.`);
        } else {
          console.error(`❌ Error recording match ${match.tournament_id}:`, err.message);
        }
      }
    }
  }, 100000); // ogni 30 secondi
}

syncMatches();