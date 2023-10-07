CREATE DATABASE IF NOT EXISTS Library;
USE Library;

-- Crear la tabla Librerias
CREATE TABLE Librerias (
    libreria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    email VARCHAR(255),
    sitio_web VARCHAR(255)
);

-- Crear la tabla Libros
CREATE TABLE Libros (
    libro_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    editorial VARCHAR(255),
    ano_publicacion INT,
    ISBN VARCHAR(13) UNIQUE,
    precio DECIMAL(10, 2),
    cantidad_disponible INT,
    libreria_id INT,
    FOREIGN KEY (libreria_id) REFERENCES Librerias(libreria_id)
);

-- Crear la tabla Productos
CREATE TABLE Productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2),
    cantidad_disponible INT,
    libreria_id INT,
    FOREIGN KEY (libreria_id) REFERENCES Librerias(libreria_id)
);

-- Crear un evento para actualizar automáticamente el precio de los libros
DELIMITER //
CREATE EVENT ActualizarPreciosLibros
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    UPDATE Libros
    SET precio = precio * 0.95; -- Reducción del 5% en el precio diariamente
END;
//
DELIMITER ;

-- Crear una función para calcular el total de ventas de una librería en un período determinado
DELIMITER //
CREATE FUNCTION CalcularTotalVentas(libreria_id INT, fecha_inicio DATE, fecha_fin DATE)
RETURNS DECIMAL(10, 2)
BEGIN
    DECLARE total DECIMAL(10, 2);
    SELECT SUM(precio) INTO total
    FROM Libros
    WHERE libreria_id = libreria_id
    AND fecha_venta BETWEEN fecha_inicio AND fecha_fin;
    RETURN total;
END;
//
DELIMITER ;

-- TEST DATA --

-- Insertar datos ficticios en la tabla Librerias
INSERT INTO Librerias (nombre, direccion, telefono, email, sitio_web)
VALUES
    ('Librería A', 'Calle 123, Ciudad A', '+123456789', 'info@libreriaa.com', 'www.libreriaa.com'),
    ('Librería B', 'Avenida XYZ, Ciudad B', '+987654321', 'info@libreriab.com', 'www.libreriab.com');

-- Insertar datos ficticios en la tabla Libros
INSERT INTO Libros (titulo, autor, editorial, ano_publicacion, ISBN, precio, cantidad_disponible, libreria_id)
VALUES
    ('Libro 1', 'Autor 1', 'Editorial X', 2020, '1234567890123', 19.99, 100, 1),
    ('Libro 2', 'Autor 2', 'Editorial Y', 2019, '9876543210987', 24.99, 75, 1),
    ('Libro 3', 'Autor 3', 'Editorial Z', 2021, '5432109876543', 29.99, 50, 2);

-- Insertar datos ficticios en la tabla Productos
INSERT INTO Productos (nombre, descripcion, precio, cantidad_disponible, libreria_id)
VALUES
    ('Producto 1', 'Descripción del producto 1', 9.99, 200, 1),
    ('Producto 2', 'Descripción del producto 2', 14.99, 150, 2);
