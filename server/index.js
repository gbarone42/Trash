require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const app = express();
app.use(express.json());

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ABI = require("../artifacts/contracts/ScoreStorage.sol/ScoreStorage.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

app.post("/record", async (req, res) => {
  const { tournamentId, winner, score } = req.body;

  try {
    const tx = await contract.setTournamentResult(tournamentId, winner, score);
    await tx.wait();
    res.json({ status: "success", txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("🚀 Server listening on port 3001"));
