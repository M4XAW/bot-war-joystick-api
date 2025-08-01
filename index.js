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

const allowedMoves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
const allowedActions = ["COLLECT", "ATTACK", "BOMB", "NONE"];
const allowedBombTypes = ["proximity", "timer", "static"];

let lastAction = { move: "STAY", action: "NONE" };

app.post("/set-action", (req, res) => {
    const { move, action, bombType } = req.body;

    if (!move || !allowedMoves.includes(move)) {
        return res.status(400).send("Invalid or missing move");
    }

    if (!action || !allowedActions.includes(action)) {
        return res.status(400).send("Invalid or missing action");
    }

    if (action === "BOMB") {
        if (!bombType || !allowedBombTypes.includes(bombType)) {
            return res.status(400).send("Invalid or missing bomb type");
        }

        lastAction = { move, action, bombType };
        return res.json(lastAction);
    }

    if (bombType) {
        return res.status(400).send("Bomb type should only be specified for BOMB action");
    }

    lastAction = { move, action };
    return res.json(lastAction);
});


app.get("/action", (req, res) => {
    res.json(lastAction);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
