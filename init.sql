CREATE TABLE IF NOT EXISTS users(
          userId serial PRIMARY KEY,
          firstname VARCHAR(150) NOT NULL,
          lastname VARCHAR(150) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );


CREATE TABLE IF NOT EXISTS products(
        id serial PRIMARY KEY,
        ownerId INT NOT NULL,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(150) DEFAULT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ownerId)
            REFERENCES users (userId)
    );

