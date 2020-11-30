var pg = require("pg");
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || "4000";

const pool = new pg.Pool({
  user: "gqwcowoh",
  host: "suleiman.db.elephantsql.com",
  database: "gqwcowoh",
  password: "2345678",
  port: 5432,
});

// pool.query(`CREATE TABLE Tasks
//     (
//         id SERIAL,
//         title VARCHAR(100),
//         body TEXT,
//         img TEXT,
//         created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
//     )
// `);

// middleware to log all requests
app.use(morgan("common"));
// middleware to convert all body streams into usable JSON
app.use(express.json());

app
  .route("/api/tasks")
  .get(async (req, res) => {
    const results = await pool.query("SELECT * from Tasks");
    res.send({ success: true, results });
  })
  .post(async (req, res) => {
    const { title, body, img } = req.body;
    const text =
      "INSERT INTO Tasks(title, body, img) VALUES($1, $2, $3) RETURNING *";
    const values = [title, body, img];
    const result = await pool.query(text, values);
    res.json({ success: true, docId: result.rows.map((r) => r.id) });
  });

app
  .route("/api/tasks/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await pool.query("SELECT * from Tasks WHERE id=$1", [id]);
    res.json({ success: true, result });
  })
  .put(async (req, res) => {
    const { title, body, img } = req.body;
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE Tasks 
        SET 
        title=$2,
        body=$3,
        img=$4
        WHERE id=$1`,
      [id, title, body, img]
    );
    res.json({ success: true, result });
  })
  .delete((req, res) => {
    const { id } = req.params;
    pool.query("DELETE FROM Tasks Where id=$1", [id]);
    res.status("204").send();
  });

app.listen(PORT, () => {
  console.log(`server successfully running on PORT ${PORT}`);
});
