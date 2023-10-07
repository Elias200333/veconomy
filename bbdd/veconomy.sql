CREATE DATABASE IF NOT EXISTS VEconomy;
USE VEconomy;

CREATE TABLE Rols (
  nameRole VARCHAR(255) PRIMARY KEY,
  Lvl INT UNIQUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Areas (
  Name VARCHAR(255) PRIMARY KEY,
  Description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users (
  ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Surname VARCHAR(50) NOT NULL,
  Email VARCHAR(100) UNIQUE NOT NULL,
  Rol_User VARCHAR(50) NOT NULL,
  KYC_Verified BOOLEAN,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (Rol_User) REFERENCES Rols (nameRole)
);

CREATE TABLE Projects (
  ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Description TEXT,
  Objective_Quantity DECIMAL(18, 2) NOT NULL,
  Multimedy BLOB,
  ID_User INT UNSIGNED,
  ID_Area VARCHAR(255), -- Agregar columna para vincular con el área
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ID_User) REFERENCES Users (ID),
  FOREIGN KEY (ID_Area) REFERENCES Areas (Name) -- Add foreign key constraint for ID_Area
);

CREATE INDEX idx_projects_user ON Projects (ID_User);

CREATE TABLE Inversions (
  ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ID_Project INT UNSIGNED,
  Quantity_Invested DECIMAL(18, 2),
  ID_User INT UNSIGNED,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ID_Project) REFERENCES Projects (ID),
  FOREIGN KEY (ID_User) REFERENCES Users (ID)
);

CREATE TABLE Likes (
  ID_User INT UNSIGNED,
  ID_Project INT UNSIGNED,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID_User, ID_Project),
  FOREIGN KEY (ID_User) REFERENCES Users (ID) ON DELETE CASCADE,
  FOREIGN KEY (ID_Project) REFERENCES Projects (ID) ON DELETE CASCADE
);

CREATE INDEX idx_likes_user_project ON Likes (ID_User, ID_Project);

DROP USER IF EXISTS 'AdminVEconomy'@'localhost';
CREATE USER 'AdminVEconomy'@'localhost' IDENTIFIED BY '1234';
GRANT SELECT, INSERT, UPDATE, DELETE ON VEconomy.projects TO 'AdminVEconomy'@'localhost';
FLUSH PRIVILEGES;

DELIMITER //

CREATE FUNCTION GetTotalLikesForProject(projectID INT) RETURNS INT
BEGIN
  DECLARE totalLikes INT;
  SELECT COUNT(*) INTO totalLikes FROM Likes WHERE ID_Project = projectID;
  RETURN totalLikes;
END;
//

CREATE TRIGGER SetKYCVerifiedOnInsert BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
  SET NEW.KYC_Verified = false; -- Set to true by default
END;
//

CREATE EVENT DailyProjectsBackup
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
  -- Replace 'backup_location' with the desired backup directory
  SET @sql = CONCAT('SELECT * INTO OUTFILE ''./projects_', DATE_FORMAT(NOW(), '%Y%m%d_%H%i%s'), '.csv'' FROM Projects;');
  PREPARE stmt FROM @sql;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END;
//

CREATE FUNCTION GetTotalInvestmentForProject(projectID INT) RETURNS DECIMAL(18, 2)
BEGIN
  DECLARE totalInvestment DECIMAL(18, 2);
  SELECT COALESCE(SUM(Quantity_Invested), 0) INTO totalInvestment FROM Inversions WHERE ID_Project = projectID;
  RETURN totalInvestment;
END;
//

CREATE TRIGGER UpdateObjectiveQuantityOnInvestment BEFORE INSERT ON Inversions
FOR EACH ROW
BEGIN
  -- Declara variable para almacenar el valor de Objective_Quantity
  DECLARE objectiveQuantity DECIMAL(18, 2);

  -- Obtiene el Objective_Quantity del proyecto actual
  SELECT Objective_Quantity INTO objectiveQuantity FROM Projects WHERE ID = NEW.ID_Project;

  -- Obtiene el monto total de inversiones para el proyecto actual
  SET @totalInvestment := (SELECT COALESCE(SUM(Quantity_Invested), 0) FROM Inversions WHERE ID_Project = NEW.ID_Project);

  -- Verifica si el monto total de inversiones supera el objetivo
  IF (@totalInvestment + NEW.Quantity_Invested) > objectiveQuantity THEN
    -- Si la inversión supera el objetivo, no permite la inserción
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La inversión supera el objetivo del proyecto. No se permiten inversiones adicionales.';
  END IF;
END;
//

CREATE PROCEDURE GetProjectsByArea(IN areaName VARCHAR(255))
BEGIN
  SELECT p.ID, p.Name, p.Description, p.Objective_Quantity, p.Multimedy, p.ID_User
  FROM Projects p
  JOIN Areas a ON p.ID_Area = a.Name
  WHERE a.Name = areaName;
END;
//

DELIMITER ;

-- Insert data into Rols table
INSERT INTO Rols (nameRole, Lvl)
VALUES ('Administrator', 1),
       ('Entrepreneur', 2),
       ('Investor', 3);

       
-- Insert data into Areas table
INSERT INTO Areas (Name, Description)
VALUES ('Technology', 'Area related to technology and innovation'),
       ('Environment', 'Area focused on environmental sustainability'),
       ('Healthcare', 'Area dedicated to healthcare and medical advancements');

-- Insert data into Users table
INSERT INTO Users (Name, Surname, Email, Rol_User, KYC_Verified)
VALUES ('John', 'Doe', 'johndoe@example.com', 'Administrator', true),
       ('Jane', 'Smith', 'janesmith@example.com', 'Entrepreneur', true),
       ('Michael', 'Johnson', 'michaeljohnson@example.com', 'Investor', true);

-- Insert data into Projects table
INSERT INTO Projects (Name, Description, Objective_Quantity, Multimedy, ID_User, ID_Area)
VALUES ('Project A', 'Description of Project A', 10000.00, NULL, 2, 'Technology'),
       ('Project B', 'Description of Project B', 5000.00, NULL, 2, 'Environment'),
       ('Project C', 'Description of Project C', 15000.00, NULL, 3, 'Healthcare');

-- Insert data into Inversions table
INSERT INTO Inversions (ID_Project, Quantity_Invested, ID_User)
VALUES (1, 5000.00, 3),
       (1, 3000.00, 1),
       (2, 2000.00, 3),
       (3, 10000.00, 2),
       (3, 1000.00, 1),
       (3, 2000.00, 2);

-- Insert data into Likes table
INSERT INTO Likes (ID_User, ID_Project)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (2, 3),
       (3, 2),
       (3, 3);