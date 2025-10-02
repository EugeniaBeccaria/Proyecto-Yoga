import express from "express";
import cors from "cors";
/*import pool from "./config/db";*/

const app = express();

app.use(cors());
app.use(express.json());

/*app.get("/rooms", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM rooms");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el salón" });
    }
});*/

const PORT = 4000;
app.listen (PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


