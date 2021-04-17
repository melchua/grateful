DROP TABLE IF EXISTS schedules;

CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  schedule_period VARCHAR(30)
);

