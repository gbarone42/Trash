const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("db.sqlite3"); // path al tuo db

const query = `SELECT id_partita, id_squadra, id_punteggio FROM partite LIMIT 1;`;

db.get(query, (err, row) => {
  if (err) {
    console.error("❌ Error reading from DB:", err.message);
    return;
  }

  if (row) {
    const jsonData = {
      id_partita: row.id_partita,
      id_squadra: row.id_squadra,
      id_punteggio: row.id_punteggio,
    };

    fs.writeFileSync(__dirname + "/match-data.json", JSON.stringify(jsonData, null, 2));
    console.log("✅ Match data exported to match-data.json:", jsonData);
  } else {
    console.log("⚠️ No match data found in DB.");
  }

  db.close();
});
