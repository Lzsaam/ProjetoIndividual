-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE ProjetoIndividual;

USE ProjetoIndividual;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

select * from usuario;

CREATE TABLE Resposta (
	idResposta INT PRIMARY KEY AUTO_INCREMENT,
    pontos INT,
    acertos INT,
	fkUsuario int, 
	foreign key (fkUsuario) REFERENCES usuario (id)
);

SELECT * FROM USUARIO
JOIN Resposta ON id = fkUsuario ORDER BY pontos;

SELECT * FROM Resposta;


create table resposta_certa(
idRespostaCerta int primary key auto_increment,
correta varchar(45)
);

create table questoes(
idRanking int  auto_increment,
fkResposta int,
	foreign key (fkresposta)
		references resposta (idResposta),
fkUsuario int, 
	foreign key (fkUsuario)
		references usuario(id),
primary key(idRanking, fkResposta, fkUsuario),
score int,
acerto varchar(45)
);


create table ranking (
idRaNKING int primary key auto_increment,
fkUsuario int,
foreign key (fkUsuario) references usuario(id),
score int,
acertos int
);

select * from usuario;	


SELECT * FROM RANKING ORDER BY SCORE;




