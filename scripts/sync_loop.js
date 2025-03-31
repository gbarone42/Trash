require("dotenv").config();
const { Client } = require("pg");
const { ethers } = require("hardhat");
const fs = require("fs");

const SYNCED_FILE = __dirname + "/synced.json";

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

  let synced = [];
  if (fs.existsSync(SYNCED_FILE)) {
    synced = JSON.parse(fs.readFileSync(SYNCED_FILE, "utf8"));
  }

  try {
    const res = await client.query(
      "SELECT tournament_id, winner, score FROM game_matchhistory;"
    );

    let newMatches = res.rows.filter(
      (match) => !synced.includes(match.tournament_id)
    );

    if (newMatches.length === 0) {
      console.log("✅ No new matches to sync.");
    }

    for (const match of newMatches) {
      console.log(`🚀 Registering new match ${match.tournament_id}...`);
      try {
        const tx = await contract.setMatchResult(
          match.tournament_id,
          match.winner,
          match.score
        );
        await tx.wait();
        console.log(`✅ Match ${match.tournament_id} registered: ${tx.hash}`);
        synced.push(match.tournament_id);
        fs.writeFileSync(SYNCED_FILE, JSON.stringify(synced, null, 2));
      } catch (err) {
        console.error(`❌ Error recording match ${match.tournament_id}:`, err.message);
      }
    }
  } catch (err) {
    console.error("❌ Error during sync:", err.message);
  } finally {
    await client.end();
  }
}

console.log("🔄 Sync loop started. Checking every 60 seconds...");

setInterval(() => {
  console.log("\n⏰ Running sync...");
  syncMatches();
}, 60000);

syncMatches();
