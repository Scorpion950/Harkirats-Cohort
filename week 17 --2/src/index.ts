import "dotenv/config";
import express from "express";
import { Client } from "pg";

const app = express();

app.use(express.json());

const pgClient = new Client({
    connectionString: process.env.DATABASE_URL,
});

pgClient.connect();

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;

    try {
        // Start transaction
        await pgClient.query("BEGIN;");

        // Insert user
        const insertQuery = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;

        const response = await pgClient.query(insertQuery, [
            username,
            email,
            password,
        ]);

        const userId = response.rows[0].id;

        // Insert address
        const addressInsertQuery = `
            INSERT INTO address (city, country, street, pincode, user_id)
            VALUES ($1, $2, $3, $4, $5);
        `;

        await pgClient.query(addressInsertQuery, [
            city,
            country,
            street,
            pincode,
            userId,
        ]);

        // Commit transaction
        await pgClient.query("COMMIT;");

        res.json({
            message: "You have signed up",
        });
    } catch (e) {
        // Rollback if anything fails
        await pgClient.query("ROLLBACK;");

        console.log(e);

        res.status(500).json({
            message: "Error while signing up",
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});