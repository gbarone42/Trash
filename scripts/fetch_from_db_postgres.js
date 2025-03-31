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
      "SELECT tournament_id, winner, score FROM game_matchhistory;"
    );

    if (res.rows.length > 0) {
      fs.writeFileSync(
        __dirname + "/match-data.json",
        JSON.stringify(res.rows, null, 2)
      );
      console.log(`✅ Exported ${res.rows.length} match(es) to match-data.json`);
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
