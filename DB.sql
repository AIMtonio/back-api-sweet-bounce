create database SweetBounce;
use SweetBounce;

show tables;

CREATE TABLE Categoria (
    CategoriaID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(20) NOT NULL,
    Descripcion VARCHAR(30),
    UsuarioAlta VARCHAR(20),
    FechaAlta DATE,
    UsuarioModificacion VARCHAR(20),
    FechaModificacion DATE,
    Activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE CatFormaPago (
    CatFormaPagoID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(20) NOT NULL,
    UsuarioAlta VARCHAR(20),
    FechaAlta DATE,
    UsuarioModificacion VARCHAR(20),
    FechaModificacion DATE,
    Activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE Usuario (
    UsuarioID INT(5) PRIMARY KEY AUTO_INCREMENT,
    UsuarioUUID VARCHAR(36) NOT NULL UNIQUE,
    Nombre VARCHAR(50),
    Apellidos VARCHAR(50),
    CorreoElectronico VARCHAR(100),
    FechaNacimiento DATE,
    Telefono VARCHAR(15),
    UsuarioEstatus ENUM('A', 'I', 'C') DEFAULT 'A',
    UsuarioAlta VARCHAR(20),
    FechaAlta DATE,
    UsuarioModificacion VARCHAR(20),
    FechaModificacion DATE,
    Activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE Producto (
    ProductoID INT(5) PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(30) NOT NULL,
    Descripcion VARCHAR(30),
    Precio DECIMAL(10,2) NOT NULL,
    CantidadStock INT(5) DEFAULT 0,
    CategoriaID INT(5),
    ImagenURL VARCHAR(100),
    UsuarioAlta VARCHAR(20),
    FechaAlta DATE,
    UsuarioModificacion VARCHAR(20),
    FechaModificacion DATE,
    Activo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (CategoriaID)
        REFERENCES Categoria(CategoriaID)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE Carrito (
    CarritoID INT(5) PRIMARY KEY AUTO_INCREMENT,
    UsuarioUUID VARCHAR(36) NOT NULL,
    ProductoID INT(5) NOT NULL,
    Cantidad INT(5) DEFAULT 1,
    UsuarioAlta VARCHAR(20),
    FechaAlta DATE,
    UsuarioModificacion VARCHAR(20),
    FechaModificacion DATE,
    Activo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_carrito_usuario FOREIGN KEY (UsuarioUUID)
        REFERENCES Usuario(UsuarioUUID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_carrito_producto FOREIGN KEY (ProductoID)
        REFERENCES Producto(ProductoID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE Pedido (
    PedidoID INT(5) PRIMARY KEY AUTO_INCREMENT,
    CarritoID INT(5) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    EstadoPago CHAR(1) DEFAULT 'P', -- P = Pendiente, P = Pagado, C = Cancelado (ajústalo según tus estados)
    UsuarioUUID VARCHAR(36) NOT NULL,
    CatFormaPagoID INT(5),
    UsuarioAlta VARCHAR(20),
    FechaAlta DATE,
    UsuarioModificacion VARCHAR(20),
    FechaModificacion DATE,
    Activo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_pedido_carrito FOREIGN KEY (CarritoID)
        REFERENCES Carrito(CarritoID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (UsuarioUUID)
        REFERENCES Usuario(UsuarioUUID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_pedido_formapago FOREIGN KEY (CatFormaPagoID)
        REFERENCES CatFormaPago(CatFormaPagoID)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);