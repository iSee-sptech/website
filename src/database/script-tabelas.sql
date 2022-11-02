create database iSee;
use iSee;

create table Usuarios (
idUsuario int primary key auto_increment,
nomeUsuario varchar (100),
cargoUsuario varchar (30),
emailUsuario varchar (70) unique,
cepUsuario char (9),
cpfUsuario char (14) unique not null,
telefoneUsuario char (15) unique,
crmUsuario  char (6),
senhaUsuario varchar (20) not null,
dataNascUsuario date,
imagemPerfilUsuario varchar (255),
numeroLocalUsuario varchar (6),
complementoLocalUsuario varchar (25)
);
select * from usuarios;

create table Maquinas (
idMaquina int primary key auto_increment,
serialMaquina varchar(25),
sistemaOperacionalMaquina varchar(25),
fabricanteMaquina varchar(25),
arquiteturaMaquina varchar(25),
tempoDeAtividade long,
nomeMaquina varchar (100),
discoMaquina varchar(100),
ramMaquina varchar(100),
processadorMaquina varchar(100),
cepMaquina char (9),
imgMaquina varchar (255),
complementoMaquina varchar (50),
pontoReferenciaMaquina varchar (25),
numeroMaquina int,
fkUsuario int,
foreign key (fkUsuario)
references Usuarios (idUsuario)
);
select * from maquinas;

create table Etiqueta (
idEtiqueta int primary key auto_increment,
qualidadeEtiqueta varchar (25),
tempoSemProblema varchar (15),
etiquetacol varchar (30),
fkMaquina int,
foreign key (fkMaquina)
references Maquinas (idMaquina)
);
select * from etiqueta;

create table Historico (
idHistorico int primary key auto_increment,
usoRamHistorico long,
usoProcessadorHistorico long,
usoDiscoHistorico long,
dataHoraHistorico datetime default current_timestamp,
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