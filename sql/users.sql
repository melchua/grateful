DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(250)
);

INSERT INTO users (username, email, password)
VALUES ('Test User', 'testuser@email.com', 'password123' )
