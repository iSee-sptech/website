create database iSee;
use iSee;
create table Usuarios (
idUsuario int primary key auto_increment not null,
nomeUsuario varchar (255),
cargoUsuario varchar (255),
emailUsuario varchar (255),
cepUsuario varchar (80),
cpfUsuario char (140),
telefoneUsuario varchar (255),
crmUsuario  varchar (60),
senhaUsuario varchar (20),
dataNascUsuario date
);
select * from Usuarios;
