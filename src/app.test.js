describe("Bot war api", () => {
    test("GET /", async () => {
        const response = await fetch(`${process.env.API_URL}/`);
        expect(response.status).toBe(200);
        const text = await response.text();
        expect(text).toBe("Bot war API");
    });

    test("GET /action", async () => {
        const response = await fetch(`${process.env.API_URL}/action`);
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("move");
        expect(data).toHaveProperty("action");
    });

    test("POST /set-action with valid data", async () => {
        const payload = {
            move: "UP",
            action: "COLLECT"
        };
        const response = await fetch(`${process.env.API_URL}/set-action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toEqual({ move: "UP", action: "COLLECT" });
    });

    test("POST /set-action with invalid move", async () => {
        const payload = {
            move: "INVALID",
            action: "COLLECT"
        };
        const response = await fetch(`${process.env.API_URL}/set-action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        expect(response.status).toBe(400);
        const text = await response.text();
        expect(text).toBe("Invalid or missing move");
    });

    test("POST /set-action with missing move", async () => {
        const payload = {
            action: "COLLECT"
        };
        const response = await fetch(`${process.env.API_URL}/set-action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        expect(response.status).toBe(400);
        const text = await response.text();
        expect(text).toBe("Invalid or missing move");
    });

    test("POST /set-action with BOMB but missing bombType", async () => {
        const payload = {
            move: "UP",
            action: "BOMB"
        };
        const response = await fetch(`${process.env.API_URL}/set-action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        expect(response.status).toBe(400);
        const text = await response.text();
        expect(text).toBe("Invalid or missing bomb type");
    });
});
