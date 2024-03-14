-- Create Database
CREATE DATABASE IF NOT EXISTS jokesdb;

-- Use the created Database
USE jokesdb;

-- Create table for storing joke types
CREATE TABLE IF NOT EXISTS joke_types (
    id      INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    type    VARCHAR(255) NOT NULL
);

-- Create table for storing jokes
CREATE TABLE IF NOT EXISTS jokes (
    id          INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    type_id     INT NOT NULL,
    setup       TEXT NOT NULL,
    punchline   TEXT NOT NULL,
    FOREIGN KEY (type_id) REFERENCES joke_types(id)
);

-- Insert joke types into the 'joke_type' table
INSERT INTO joke_types (type) VALUES
    ('general'),
    ('dad'),
    ('programming'),
    ('food');

-- Insert jokes into the 'jokes' table
INSERT INTO jokes (type_id, setup, punchline) VALUES
    -- For 'general' type
    (1, 'Why did the scarecrow win an award?', 'Because he was outstanding in his field.'),
    (1, 'What do you call fake spaghetti?', 'An impasta.'),
    (1, 'Why don''t skeletons fight each other?', 'They don''t have the guts.'),
    (1, 'Why couldn''t the bicycle stand up by itself?', 'It was two tired.'),
    (1, 'What do you get when you cross a snowman and a vampire?', 'Frostbite.'),
    -- For 'dad' type
    (2, 'What time did the man go to the dentist?', 'Tooth hurt-y.'),
    (2, 'How does a penguin build its house?', 'Igloos it together.'),
    (2, 'Did you hear about the kidnapping at the park?', 'They woke up.'),
    (2, 'Why did the math book look sad?', 'Because it had too many problems.'),
    (2, 'How do you organize a space party?', 'You planet.'),
    -- For 'programming' type
    (3, 'Why do programmers prefer dark mode?', 'Because light attracts bugs.'),
    (3, 'Why do programmers always mix up Christmas and Halloween?', 'Because Oct 31 equals Dec 25.'),
    (3, 'What did the router say to the doctor?', 'It hurts when IP.'),
    (3, 'Why did the developer go broke?', 'Because he used up all his cache.'),
    (3, 'Why don''t programmers like nature?', 'It has too many bugs.'),
    -- For 'food' type
    (4, 'What do you call cheese that isn''t yours?', 'Nacho cheese.'),
    (4, 'Why don''t eggs tell jokes?', 'Because they''d crack each other up.'),
    (4, 'What do you call a fake noodle?', 'An impasta.'),
    (4, 'Why did the tomato turn red?', 'Because it saw the salad dressing.'),
    (4, 'What do you call a belt made out of watches?', 'A waist of time.');
