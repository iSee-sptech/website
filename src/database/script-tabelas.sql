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

select * from Usuarios;

create table Maquinas (
idMaquina int primary key auto_increment,
serialMaquina varchar(25),
sistemaOperacionalMaquina varchar(25),
fabricanteMaquina varchar(25),
arquiteturaMaquina varchar(25),
tempoDeAtividade long,
nomeMaquina varchar (100),
discoMaquina varchar(10),
ramMaquina varchar(10),
processadorMaquina varchar(10),
cepMaquina char (9) unique,
numeroMaquina varchar (6),
pontoDeReferencia varchar (25), 
imgMaquina varchar (255),
complementoMaquina varchar (50),
fkUsuario int,
foreign key (fkUsuario)
references Usuarios (idUsuario)
);

insert into Maquinas values (1, '11111', 'Windows', 'Microsoft', '64', '100000', 'Caixa 1', '100', '16', '4', '08164050', '777', 'casinha do zé', 'fegfwege', null, 1),
(2, '113111', 'Windows', 'Microsoft', '64', '100000', 'Caixa 2', '100', '16', '4', '08164052', '777', 'casinha do zé', 'fegfwege', null, 1), 
(3, '121111', 'Windows', 'Microsoft', '64', '100000', 'Caixa 3', '100', '16', '4', '08164051', '777', 'casinha do zé', 'fegfwege', null, 1),
(4, '1411', 'Windows', 'Microsoft', '64', '100000', 'Caixa 4', '200', '8', '4', '08164053', '777', 'casinha do zé', 'fegfwege', null, 1),
(5, '15111', 'Windows', 'Microsoft', '64', '100000', 'Caixa 5', '200', '8', '4', '08164054', '777', 'casinha do zé', 'fegfwege', null, 1);

create table Etiqueta (
idEtiqueta int primary key auto_increment,
fkMaquina int,
nomeEtiqueta varchar(50),
datahoraEtiqueta datetime,
foreign key (fkMaquina)
references Maquinas (idMaquina)
);

create table Historico (
idHistorico int primary key auto_increment,
usoRamHistorico varchar(10),
usoProcessadorHistorico varchar(10),
usoDiscoHistorico varchar(10),
dataHoraHistorico datetime default current_timestamp,
statusHistorico varchar (50),
logHistorico varchar (255),
fkMaquinaHistorico int,
foreign key (fkMaquinaHistorico)
references Maquinas (idMaquina)
);

select * from Historico;

update Historico set dataHoraHistorico = '2022-11-12 00:00:00' where idHistorico = 12;

insert into Historico (usoRamHistorico, usoProcessadorHistorico, usoDiscoHistorico, fkMaquinaHistorico) values ('10', '3', '100', 1);


-- Eficiencia global --
select round(((((usoRamHistorico * 100) / ramMaquina)) + (((usoProcessadorHistorico * 100) / processadorMaquina)) + (((usoDiscoHistorico * 100) / discoMaquina))) / 3) as "eficienciaGlobal", nomeMaquina as "nomeMaquina"
from Historico join Maquinas on Historico.fkMaquinaHistorico = Maquinas.idMaquina where dataHoraHistorico like '%2022-11-12%' order by idHistorico desc limit 4;



create table Lembrete(
idLembrete int primary key auto_increment,
mensagemLembrete varchar (50),
dataHoraLembrete datetime,
horarioGeradoLembrete datetime,
fkUsuario int,
foreign key (fkUsuario)
references Usuarios (idUsuario)
);

create table Alerta (
idAlerta int primary key auto_increment,
fkMaquina int,
componente varchar(10),
nivelAlerta varchar(10),
dado varchar(10),
datahoraAlerta datetime,
foreign key (fkMaquina)
references Maquinas (idMaquina)
);