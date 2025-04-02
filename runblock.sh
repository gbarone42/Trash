#!/bin/bash

LOGFILE="runblock.log"

# Optional clean
if [ "$1" == "--clean" ]; then
  echo "🧹 Cleaning previous build files..." | tee -a $LOGFILE
  npx hardhat clean
fi

echo "🚀 Installing dependencies..." | tee -a $LOGFILE
npm install >> $LOGFILE 2>&1

echo "🔨 Compiling smart contract..." | tee -a $LOGFILE
npx hardhat compile >> $LOGFILE 2>&1

echo "📄 Deploying contract to Sepolia..." | tee -a $LOGFILE
npm run deploy >> $LOGFILE 2>&1

echo "🔄 Starting sync loop..." | tee -a $LOGFILE
npm run sync | tee -a $LOGFILE
