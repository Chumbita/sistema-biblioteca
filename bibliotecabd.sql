-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2024 a las 20:27:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bibliotecabd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `ISBN` varchar(13) NOT NULL,
  `numero_estante` int(50) NOT NULL,
  `numero_repisa` int(50) NOT NULL,
  `fk_secciones` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `titulo`, `autor`, `genero`, `ISBN`, `numero_estante`, `numero_repisa`, `fk_secciones`, `imagen`) VALUES
(1, 'La historia sin fin', 'Michael Ende', 'Fantasía', '1234567890123', 1, 1, 1, 'img/la_historia_sin_fin.jpg'),
(2, 'El Hobbit', 'J.R.R. Tolkien', 'Fantasía', '1234567890124', 2, 2, 1, 'img/el_hobbit.jpg'),
(3, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela', '1234567890125', 3, 3, 1, 'img/don_quijote_de_la_mancha.jpg'),
(4, 'Cien años de soledad', 'Gabriel García Márquez', 'Realismo mágico', '1234567890126', 4, 4, 1, 'img/cien_anos_de_soledad.jpg'),
(5, 'Orgullo y prejuicio', 'Jane Austen', 'Romance', '1234567890127', 5, 5, 1, 'img/orgullo_y_prejuicio.jpg'),
(6, 'Sapiens', 'Yuval Noah Harari', 'Historia', '2234567890123', 21, 1, 2, 'img/sapiens.jpg'),
(7, 'Educated', 'Tara Westover', 'Biografía', '2234567890124', 22, 2, 2, 'img/educated.jpg'),
(8, 'Homo Deus', 'Yuval Noah Harari', 'Filosofía', '2234567890125', 23, 3, 2, 'img/homo_deus.jpg'),
(9, 'Pensar rápido, pensar despacio', 'Daniel Kahneman', 'Psicología', '2234567890126', 24, 4, 2, 'img/pensar_rapido_pensar_despacio.jpg'),
(10, 'El poder de los hábitos', 'Charles Duhigg', 'Psicología', '2234567890127', 25, 5, 2, 'img/el_poder_de_los_habitos.jpg'),
(11, 'Breve historia del tiempo', 'Stephen Hawking', 'Ciencia', '3234567890123', 41, 1, 3, 'img/breve_historia_del_tiempo.jpg'),
(12, 'El gen egoísta', 'Richard Dawkins', 'Biología', '3234567890124', 42, 2, 3, 'img/el_gen_egoista.jpg'),
(13, 'Cosmos', 'Carl Sagan', 'Astronomía', '3234567890125', 43, 3, 3, 'img/cosmos.jpg'),
(14, 'Una breve historia de casi todo', 'Bill Bryson', 'Ciencia', '3234567890126', 44, 4, 3, 'img/una_breve_historia_de_casi_todo.jpg'),
(15, 'La teoría del todo', 'Stephen Hawking', 'Física', '3234567890127', 45, 5, 3, 'img/la_teoria_del_todo.jpg'),
(16, 'Clean Code', 'Robert C. Martin', 'Programación', '4234567890123', 61, 1, 4, 'img/clean_code.jpg'),
(17, 'El arte de la programación', 'Donald Knuth', 'Programación', '4234567890124', 62, 2, 4, 'img/el_arte_de_la_programacion.jpg'),
(18, 'Hooked', 'Nir Eyal', 'Tecnología', '4234567890125', 63, 3, 4, 'img/hooked.jpg'),
(19, 'Lean Startup', 'Eric Ries', 'Emprendimiento', '4234567890126', 64, 4, 4, 'img/lean_startup.jpg'),
(20, 'El dilema de los innovadores', 'Clayton M. Christensen', 'Negocios', '4234567890127', 65, 5, 4, 'img/el_dilema_de_los_innovadores.jpg'),
(21, 'Meditaciones', 'Marco Aurelio', 'Filosofía', '5234567890123', 81, 1, 5, 'img/meditaciones.jpg'),
(22, 'La República', 'Platón', 'Filosofía', '5234567890124', 82, 2, 5, 'img/la_republica.jpg'),
(23, 'El contrato social', 'Jean-Jacques Rousseau', 'Política', '5234567890125', 83, 3, 5, 'img/el_contrato_social.jpg'),
(24, 'Así habló Zaratustra', 'Friedrich Nietzsche', 'Filosofía', '5234567890126', 84, 4, 5, 'img/asi_hablo_zaratustra.jpg'),
(25, 'Más allá del bien y del mal', 'Friedrich Nietzsche', 'Filosofía', '5234567890127', 85, 5, 5, 'img/mas_alla_del_bien_y_del_mal.jpg'),
(26, 'La historia del arte', 'E.H. Gombrich', 'Arte', '6234567890123', 101, 1, 6, 'img/la_historia_del_arte.jpg'),
(27, 'El arte de la pintura', 'Leonardo da Vinci', 'Arte', '6234567890124', 102, 2, 6, 'img/el_arte_de_la_pintura.jpg'),
(28, 'La danza de la realidad', 'Alejandro Jodorowsky', 'Cultura', '6234567890125', 103, 3, 6, 'img/la_danza_de_la_realidad.jpg'),
(29, 'El arte de la guerra', 'Sun Tzu', 'Estrategia', '6234567890126', 104, 4, 6, 'img/el_arte_de_la_guerra.jpg'),
(30, 'La imagen', 'Roland Barthes', 'Cultura', '6234567890127', 105, 5, 6, 'img/la_imagen.jpg'),
(31, 'El principito', 'Antoine de Saint-Exupéry', 'Infantil', '7234567890123', 121, 1, 7, 'img/el_principito.jpg'),
(32, 'Alicia en el país de las maravillas', 'Lewis Carroll', 'Fantasía', '7234567890124', 122, 2, 7, 'img/alicia_en_el_pais_de_las_maravillas.jpg'),
(33, 'Matilda', 'Roald Dahl', 'Infantil', '7234567890125', 123, 3, 7, 'img/matilda.jpg'),
(34, 'Donde viven los monstruos', 'Maurice Sendak', 'Infantil', '7234567890126', 124, 4, 7, 'img/donde_viven_los_monstruos.jpg'),
(35, 'Harry Potter y la piedra filosofal', 'J.K. Rowling', 'Fantasía', '7234567890127', 125, 5, 7, 'img/harry_potter_y_la_piedra_filosofal.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `miembros`
--

CREATE TABLE `miembros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `fecha_inicio_membresia` date NOT NULL,
  `fecha_renovacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `miembros`
--

INSERT INTO `miembros` (`id`, `nombre`, `fecha_nacimiento`, `correo_electronico`, `telefono`, `direccion`, `fecha_inicio_membresia`, `fecha_renovacion`) VALUES
(1, 'Lucía Fernández', '1985-06-15', 'lucia.fernandez@example.com', '+54 380 1234567', 'Av. San Francisco 123, La Rioja, Capital, Argentina', '2022-01-10', '2023-01-10'),
(2, 'Mariano Gómez', '1990-04-22', 'mariano.gomez@example.com', '+54 380 2345678', 'Calle Independencia 456, La Rioja, Capital, Argentina', '2022-05-15', '2023-05-15'),
(3, 'Sofía López', '1995-08-10', 'sofia.lopez@example.com', '+54 380 3456789', 'Barrio San Vicente, La Rioja, Capital, Argentina', '2022-07-20', '2023-07-20'),
(4, 'Joaquín Rodríguez', '1988-11-30', 'joaquin.rodriguez@example.com', '+54 380 4567890', 'Av. Rivadavia 789, La Rioja, Capital, Argentina', '2021-12-05', '2022-12-05'),
(5, 'Carolina Torres', '1992-02-14', 'carolina.torres@example.com', '+54 380 5678901', 'Calle Belgrano 101, La Rioja, Capital, Argentina', '2021-09-01', '2022-09-01'),
(6, 'Martín Herrera', '1982-07-25', 'martin.herrera@example.com', '+54 380 6789012', 'Calle Catamarca 202, La Rioja, Capital, Argentina', '2023-02-15', '2024-02-15'),
(7, 'Gabriela Ortiz', '1997-12-12', 'gabriela.ortiz@example.com', '+54 380 7890123', 'Barrio Matadero, La Rioja, Capital, Argentina', '2022-03-30', '2023-03-30'),
(8, 'Juan Pérez', '1983-05-18', 'juan.perez@example.com', '+54 380 8901234', 'Av. 25 de Mayo 303, La Rioja, Capital, Argentina', '2022-11-25', '2023-11-25'),
(9, 'Ana Martínez', '1998-09-09', 'ana.martinez@example.com', '+54 380 9012345', 'Calle Santa Fe 404, La Rioja, Capital, Argentina', '2023-04-10', '2024-04-10'),
(10, 'Pedro Díaz', '1989-03-01', 'pedro.diaz@example.com', '+54 380 1123456', 'Calle Tucumán 505, La Rioja, Capital, Argentina', '2022-06-18', '2023-06-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `id` int(11) NOT NULL,
  `fecha_prestamo` date NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_devolucion` int(11) NOT NULL,
  `fk_miembros` int(11) NOT NULL,
  `fk_libros` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `prestamos`
--

INSERT INTO `prestamos` (`id`, `fecha_prestamo`, `estado`, `fecha_devolucion`, `fk_miembros`, `fk_libros`) VALUES
(1, '2023-01-15', 1, 2023, 1, 1),
(2, '2023-02-20', 0, 0, 2, 2),
(3, '2023-03-05', 1, 2023, 3, 3),
(4, '2023-03-25', 0, 0, 4, 4),
(5, '2023-04-01', 1, 2023, 5, 5),
(6, '2023-04-10', 0, 0, 6, 6),
(7, '2023-05-05', 1, 2023, 7, 7),
(8, '2023-05-18', 0, 0, 8, 8),
(9, '2023-06-01', 1, 2023, 9, 9),
(10, '2023-06-15', 0, 0, 10, 10),
(11, '2023-07-10', 1, 2023, 2, 11),
(12, '2023-08-01', 0, 0, 3, 12),
(13, '2023-08-15', 1, 2023, 4, 13),
(14, '2023-09-05', 0, 0, 5, 14),
(15, '2023-09-20', 1, 2023, 6, 15),
(16, '2023-10-01', 0, 0, 7, 16),
(17, '2023-10-10', 1, 2023, 8, 17),
(18, '2023-10-25', 0, 0, 9, 18),
(19, '2023-11-01', 1, 2023, 10, 19),
(20, '2023-11-15', 0, 0, 1, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secciones`
--

CREATE TABLE `secciones` (
  `id` int(11) NOT NULL,
  `nombre_seccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `secciones`
--

INSERT INTO `secciones` (`id`, `nombre_seccion`) VALUES
(1, 'Ficción'),
(2, 'No Ficción'),
(3, 'Ciencias'),
(4, 'Tecnología'),
(5, 'Humanidades'),
(6, 'Arte y Cultura'),
(7, 'Literatura Infantil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) DEFAULT NULL,
  `usuario` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `miembros`
--
ALTER TABLE `miembros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `secciones`
--
ALTER TABLE `secciones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `miembros`
--
ALTER TABLE `miembros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `secciones`
--
ALTER TABLE `secciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
