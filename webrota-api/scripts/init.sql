CREATE TABLE markers (
  id SERIAL PRIMARY KEY,
  date_time TIMESTAMP,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


INSERT INTO markers (date_time, latitude, longitude) VALUES
('2019-02-12 10:57:36', -18.92406700, -48.28214200),
('2019-02-12 10:57:06', -18.92376500, -48.28210800),
('2019-02-12 10:56:36', -18.92213500, -48.28205200),
('2019-02-12 10:56:06', -18.92082200, -48.28132800),
('2019-02-12 10:55:36', -18.91951300, -48.28033200),
('2019-02-12 10:55:06', -18.91966300, -48.27849800),
('2019-02-12 10:54:36', -18.92081800, -48.27682200),
('2019-02-12 10:54:06', -18.92195000, -48.27513200),
('2019-02-12 10:53:36', -18.92298100, -48.27350800),
('2019-02-12 10:53:06', -18.92313700, -48.27337200),
('2019-02-12 10:52:36', -18.92372200, -48.27213800),
('2019-02-12 10:52:06', -18.92295000, -48.27078200),
('2019-02-12 10:51:36', -18.91990800, -48.26785500),
('2019-02-12 10:51:06', -18.91765300, -48.26528000),
('2019-02-12 10:50:36', -18.91815100, -48.26453900),
('2019-02-12 10:50:06', -18.91814500, -48.26453700);


INSERT INTO users (username, password) VALUES ('webrota@gmail.com', 'teste');
