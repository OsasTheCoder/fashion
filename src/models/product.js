module.exports = {
    CREATE_TABLE: `CREATE TABLE IF NOT EXISTS products(
            id serial PRIMARY KEY,
            ownerId INT NOT NULL,
            name VARCHAR(150) NOT NULL,
            category VARCHAR(150) DEFAULT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ownerId)
                REFERENCES users (userId),
        )
        `
    };