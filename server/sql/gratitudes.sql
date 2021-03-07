DROP TABLE IF EXISTS gratitudes;

CREATE TABLE gratitudes (
  id SERIAL PRIMARY KEY,
  description VARCHAR(250),
  user_id INTEGER, 
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
      REFERENCES users(id)
        ON DELETE CASCADE
);

INSERT INTO gratitudes (description, user_id)
VALUES ('Test', 1 )

