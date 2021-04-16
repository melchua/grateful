DROP TABLE IF EXISTS schedule;

CREATE TABLE schedule (
  id SERIAL PRIMARY KEY,
  schedule_period VARCHAR(30)
);

