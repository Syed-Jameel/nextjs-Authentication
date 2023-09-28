const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

// Connect to the database and perform a query
pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL database");

    // Perform a simple query
    return client.query("SELECT * FROM users");
  })
  .then((result) => {
    console.log("Query result:", result.rows);
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
  })
  .finally(() => {
    // Release the client back to the pool
    pool.end;
  });

module.exports = pool;

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
