require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const app = express();
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, require("../artifacts/contracts/ScoreStorage.sol/ScoreStorage.json").abi, wallet);

app.post("/record", async (req, res) => {
  const { matchId, team, score } = req.body;
  try {
    const tx = await contract.setMatchResult(matchId, team, score);
    await tx.wait();
    res.json({ status: "success", txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("🚀 Server running on port 3001"));
