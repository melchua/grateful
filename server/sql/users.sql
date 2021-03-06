DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  sub VARCHAR(70) NOT NULL UNIQUE,
  phone VARCHAR(20),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at timestamptz NOT NULL DEFAULT now(),
  schedule_id INTEGER,
  CONSTRAINT fk_schedule
    FOREIGN KEY(schedule_id) 
      REFERENCES schedules(id)
        ON DELETE CASCADE
);

INSERT INTO users (sub)
VALUES ('first-sub-test')
