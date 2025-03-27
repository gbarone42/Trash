─────────────────────────────────────────────
readmd.md
─────────────────────────────────────────────

Welcome to the Blockchain Score Recorder Guide! 🎉

This guide will help you record tournament or match results on the Ethereum blockchain using a smart contract deployed on the Sepolia testnet. Let’s get started on this exciting journey! 🚀

─────────────────────────────────────────────
Project Overview
─────────────────────────────────────────────

🏆 Blockchain Score Recorder (Ethereum Sepolia Testnet)

This project lets you record tournament or match results on the Ethereum blockchain. It accepts match data as JSON input, making it easy to simulate and store scores securely.

─────────────────────────────────────────────
Project Features
─────────────────────────────────────────────

• Solidity Smart Contract for score storage ✅
• Hardhat deployment on Sepolia ✅
• JSON input via script (simulate.js) ✅
• Contract address stored in .env ✅
• Ready to receive API calls (optional via Express) ✅

─────────────────────────────────────────────
Prerequisites
─────────────────────────────────────────────

Before you begin, please ensure you have:

Node.js (v16 or higher)

npm

An Alchemy account with a Sepolia RPC URL

A funded Sepolia wallet (get ETH from a faucet)

─────────────────────────────────────────────
Getting Started
─────────────────────────────────────────────

Step 1: Clone the Repository 📥
Copy and run these commands in your terminal:

git clone your-repo-url
cd blockchain-score

Step 2: Install Dependencies 📦
Install all necessary packages:

npm install

Step 3: Create and Configure the .env File 🛠️
Rename .env.example to .env.

Open the .env file and add your details:

SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
CONTRACT_ADDRESS=0x (Leave this empty until after deployment)

Step 4: Generate a Wallet (Optional) 💳
If you don’t have a wallet yet, you can create one with:

node generate-wallet.js

After generating, fund your wallet with Sepolia ETH via: • Alchemy Faucet
• Infura Faucet

Step 5: Compile the Smart Contract 🔨
Compile your contract with:

npx hardhat compile

Step 6: Deploy to Sepolia 🚀
Deploy the contract using:

npx hardhat run scripts/deploy.js --network sepolia

After deployment, copy the contract address and paste it into your .env file under CONTRACT_ADDRESS.

Step 7: Simulate Match Data Insertion 🏀
Make sure the file scripts/match-data.json exists and contains sample content like:

{ "id_partita": "partita_topolino", "id_squadra": "squadra_pippo", "id_punteggio": "100 - 1" }

Run the following command to simulate inserting match data:

npx hardhat run scripts/simulate.js --network sepolia

You’ll receive a transaction hash confirming that the data was recorded on the blockchain!

─────────────────────────────────────────────
View Your Transactions 🔍
─────────────────────────────────────────────

To verify the transaction, visit: https://sepolia.etherscan.io/

Paste your contract address or transaction hash in the search bar.

─────────────────────────────────────────────
Future Ideas & Enhancements 🧱
─────────────────────────────────────────────

• Expose an API endpoint (/record) to accept POST requests.
• Add contract event logging (emit events).
• Verify the contract on Etherscan for better readability.

─────────────────────────────────────────────
License 📄
─────────────────────────────────────────────

This project is licensed under the MIT License – feel free to use, copy, or modify it!

─────────────────────────────────────────────
Enjoy recording your scores on the blockchain and happy coding! 🎉
─────────────────────────────────────────────


npx hardhat node
npx hardhat node
npx hardhat node



Account #19: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 (10000 ETH)
Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e