create database iSee;
use iSee;

create table Usuarios (
idUsuario int primary key auto_increment,
nomeUsuario varchar (100) not null,
cargoUsuario varchar (30) not null,
emailUsuario varchar (70) unique not null,
cepUsuario char (9),
cpfUsuario char (14) unique,
telefoneUsuario char (15) unique not null,
crmUsuario  char (6),
senhaUsuario varchar (20) not null,
dataNascUsuario date not null,
imagemPerfilUsuario varchar (255),
numeroLocalUsuario varchar (6),
complementoLocalUsuario varchar (25)
);
select * from Usuarios;

create table Maquinas (
idMaquina int primary key,
serialMaquina varchar (100) unique,
nomeMaquina varchar (100) not null,
ramMaquina varchar (10),
processadorMaquina varchar (25),
memoriaMaquina varchar (10),
cepMaquina char (9) unique,
imgMaquina varchar (255) not null,
numeroMaquina varchar (100),
complementoMaquina varchar (50),
pontoDeReferencia varchar (25),
fkUsuario int,
foreign key (fkUsuario)
references Usuarios (idUsuario)
);
select * from Maquinas;

create table Etiqueta (
idEtiqueta int primary key auto_increment,
qualidadeEtiqueta varchar (25),
tempoSemProblema varchar (15),
etiquetacol varchar (30),
fkMaquina int,
foreign key (fkMaquina)
references Maquinas (idMaquina)
);
select * from Etiqueta;

create table Historico (
idHistórico int primary key auto_increment,
usoRamHistorico varchar (50),
usoProcessadorHistorico varchar (50),
dataHoraHistorico varchar (22),
statusHistorico varchar (50),
logHistorico varchar (255),
fkMaquinaHistorico int,
foreign key (fkMaquinaHistorico)
references Maquinas (idMaquina)
);
select * from Historico;

create table Lembrete(
idLembrete int primary key auto_increment,
mensagemLembrete varchar (50),
dataHoraLembrete datetime,
horarioGeradoLembrete datetime,
fkUsuario int,
foreign key (fkUsuario)
references Usuarios (idUsuario)
);
select * from Lembrete;