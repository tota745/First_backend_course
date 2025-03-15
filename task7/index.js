const express = require("express");
const mysql = require("mysql2");
const { urlencoded } = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(urlencoded({ extended: true }));

const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    database: process.env.DATABASE
}).promise();

// Submit a Score
app.post("/scores", async (req, res) => {
    try {
        const { player_name, score } = req.body;
        if (!player_name || !score) return res.status(400).send({ message: "You should pass both player_name and score" });
        await pool.execute("INSERT INTO scores (player_name, score) VALUES (?, ?)", [player_name, score]);
        res.status(201).send({ message: "Score submitted successfully" });
    } catch (err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

// View the Leaderboard
app.get("/scores", async (req, res) => {
    try {
        const [data] = await pool.execute("SELECT * FROM scores ORDER BY score DESC");
        if (data.length === 0) return res.status(404).send({ message: "No scores found" });
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

// Delete a Score
app.delete("/scores/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute("DELETE FROM scores WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).send({ message: "Score not found" });
        res.status(200).send({ message: "Score deleted successfully" });
    } catch (err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log("Running on port number: " + port);
});