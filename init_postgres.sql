CREATE DATABASE blockchain_test;

\c blockchain_test

CREATE TABLE game_matchhistory (
    id SERIAL PRIMARY KEY,
    tournament_id VARCHAR(50),
    winner VARCHAR(50),
    score VARCHAR(20)
);

INSERT INTO game_matchhistory (tournament_id, winner, score)
VALUES ('T123', 'pongKing', '100 - 1');
