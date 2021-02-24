CREATE DATABASE Rei CHARACTER SET UTF8mb4 COLLATE utf8mb4_bin;
CREATE TABLE Search
(word VARCHAR(255) NOT NULL PRIMARY KEY, 
search_date date
);

CREATE TABLE Word
(idWord INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
word VARCHAR(255) NOT NULL,
times_Searched INT,
word_Type VARCHAR(255),
CONSTRAINT FK_Word FOREIGN KEY (word) REFERENCES Search (word)
);

CREATE TABLE Resource
(idResource INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
link TEXT
);

CREATE TABLE Examples 
(idExample INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
idResource INT NOT NULL,
sentence TEXT,
CONSTRAINT FK_Resource FOREIGN KEY (idResource) REFERENCES Resource (idResource)
)