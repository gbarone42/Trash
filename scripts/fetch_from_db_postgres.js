require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");

async function fetchData() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();

  try {
    const res = await client.query(
      "SELECT tournament_id, winner, score FROM game_matchhistory LIMIT 1;"
    );

    if (res.rows.length > 0) {
      const match = res.rows[0];
      const jsonData = {
        id_partita: match.tournament_id,
        id_squadra: match.winner,
        id_punteggio: match.score,
      };

      fs.writeFileSync(
        __dirname + "/match-data.json",
        JSON.stringify(jsonData, null, 2)
      );
      console.log("✅ Match data exported to match-data.json:", jsonData);
    } else {
      console.log("⚠️ No match data found in DB.");
    }
  } catch (err) {
    console.error("❌ Error querying DB:", err.message);
  } finally {
    await client.end();
  }
}

fetchData();
