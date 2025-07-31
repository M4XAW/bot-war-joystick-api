import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Bot war API");
});

let lastAction = { move: "STAY", action: "NONE" };

app.post("/set-action", (req, res) => {
    const { move, action } = req.body;
    
    if (!move || !action) {
        return res.status(400).send("Move and action are required");
    }
    lastAction = { move, action };
    res.send({ move: move, action: action });
});


app.get("/action", (req, res) => {
    res.json(lastAction);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
