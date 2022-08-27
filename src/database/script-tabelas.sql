create database immuncold;
use immuncold;

create table empresa (
id_empresa int not null primary key auto_increment,
nome varchar(255) not null,
representante varchar(255) not null,
cnpj varchar(25) not null unique,
endereco varchar(150),
telefone varchar(14) not null unique,
email varchar(100) not null unique,
senha varchar(25)not null) auto_increment = 1000;


#inserir primeiros dados no banco tabela Empresa
insert into empresa values (null, 'Pfizer', 'Mauro', '09876432145234', '09241010', '11932324231', 'pfizer@gmail.com', '123456');


create table usuario (
id_usuario int not null primary key auto_increment,
nome_usuario varchar (255) not null,
telefone_usuario varchar(16),
email_usuario varchar (255) unique not null,
senha_usuario varchar (25),
fk_empresa int,
foreign key (fk_empresa) references empresa (id_empresa)
);

drop table usuario;

create table localidade (
id_localidade int not null primary key auto_increment,
tipo varchar(13) not null,
check (tipo = 'Transporte' or tipo = 'Armazenamento'),
endereco_localidade varchar(150) not null,
identificador varchar(25) not null);


#inserir primeiros dados no banco tabela localidade
insert into localidade values (null, 'Armazenamento', 'ASDJKASDHASDKASDA', '1A');
insert into localidade values (null, 'Armazenamento', 'askjdasdhajk', 'A');


create table parametro (
id_parametro int not null primary key auto_increment,
nome_vacina varchar(50),
temp_max int not null,
temp_min int not null);

create table sensor (
id_sensor int not null primary key auto_increment,
fk_empresa int not null,
foreign key (fk_empresa)
references empresa(id_empresa),
fk_localidade int,
foreign key (fk_localidade)
references localidade(id_localidade),
fk_parametro int,
foreign key (fk_parametro)
references parametro(id_parametro));

insert into sensor (id_sensor, fk_empresa) values 
(null, 1000),
(null, 1000),
(null, 1000),
(null, 1000);

create table hist_medicao (
id_hist int not null primary key auto_increment,
lm35 decimal(10,2),
data_horario datetime default current_timestamp not null,
fk_sensor int not null,
foreign key (fk_sensor)
references sensor(id_sensor));

#inserir primeiros dados no banco tabela hist_medicao
insert into hist_medicao (lm35, fk_sensor) values ('30', 1),
('29', 1),
('20', 1),
('15', 1),
('30', 1),
('23', 1),
('34', 1),
('25', 1),
('10', 1),
('50', 1),
('40', 1);


# inserir dados com diferentes ID de Sensores
insert into hist_medicao (lm35, fk_sensor) values ('70', 3);
insert into hist_medicao (lm35, fk_sensor) values ('1', 5);
insert into hist_medicao (lm35, fk_sensor) values ('20', 6);
insert into hist_medicao (lm35, fk_sensor) values ('5', 1);

# Select Que faz a busca no Banco
select * from hist_medicao order by data_horario desc limit 1;


# select's
select * from usuario;
select * from parametros;
select * from localidade;
select * from hist_medicao;
select * from sensor;
select * from empresa;