const { ethers } = require("ethers");
const { Client } = require("pg");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, require("../artifacts/contracts/ScoreStorage.sol/ScoreStorage.json").abi, wallet);

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function sendMatchToBlockchain(matchId) {
  await db.connect();
  const res = await db.query("SELECT id_partita, id_squadra_vincente, punteggio FROM matches WHERE id_partita = $1", [matchId]);
  await db.end();

  if (res.rows.length > 0) {
    const matchData = res.rows[0];
    const tx = await contract.setMatchResult(matchData.id_partita, matchData.id_squadra_vincente, matchData.punteggio);
    await tx.wait();
    console.log("✅ Match data stored on blockchain:", tx.hash);
  } else {
    console.log("❌ No match found.");
  }
}

sendMatchToBlockchain("42");
