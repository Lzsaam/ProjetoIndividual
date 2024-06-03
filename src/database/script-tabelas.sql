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



SELECT * FROM usuario
JOIN Resposta ON id = fkUsuario ORDER BY pontos DESC;


SELECT count(idResposta) FROM Resposta WHERE acertos = 0;
SELECT count(idResposta) FROM Resposta WHERE acertos = 1;
SELECT count(idResposta) FROM Resposta WHERE acertos = 2;
SELECT count(idResposta) FROM Resposta WHERE acertos = 3;
SELECT count(idResposta) FROM Resposta WHERE acertos = 4;
SELECT count(idResposta) FROM Resposta WHERE acertos = 5;
SELECT count(idResposta) FROM Resposta WHERE acertos = 6;
SELECT count(idResposta) FROM Resposta WHERE acertos = 7;
SELECT count(idResposta) FROM Resposta WHERE acertos = 8;
SELECT count(idResposta) FROM Resposta WHERE acertos = 9;
SELECT count(idResposta) FROM Resposta WHERE acertos = 10;

SELECT avg(Pontos) FROM Resposta JOIN usuario ON id = fkUsuario;

SELECT acertos, COUNT(idResposta) as count
FROM Resposta
GROUP BY acertos
ORDER BY acertos;

SELECT * FROM Resposta;

CREATE TABLE Classe (
idClasse int primary key auto_increment,
nomeClasse varchar(45),
descClasse varchar(256)
);

insert into Classe values
(default, 'Duelista', 'Especializados em combate direto, buscam eliminar inimigos rapidamente.'),
(default, 'Iniciador', 'Criam oportunidades para a equipe ao desestabilizar os adversários com habilidades.'),
(default, 'Sentinela', 'Fornecem suporte defensivo, protegendo áreas e curando aliados.'),
(default, 'Controlador', 'Controlam o campo de batalha com habilidades que bloqueiam linhas de visão.');

select * from Classe;

CREATE TABLE Agente (
idAgente int primary key auto_increment,
nome varchar(45),
genero varchar(45),
constraint chkGeneroAgente check(genero in ('Masculino', 'Feminino', 'Não binário', 'Queer')),
descricao varchar(1000),
fkClasse int,
foreign key (fkClasse) references Classe (idClasse)
);

insert into Agente values 
(default, 'Jett', 'Feminino', 'Representando a Coreia do Sul, sua terra natal, Jett tem um estilo de luta ágil e evasivo que permite que ela assuma riscos como ninguém. Ela corre em meio a qualquer confronto, cortando os inimigos antes mesmo que eles percebam quem ou o que os atingiu', 1),
(default, 'Brimstone', 'Masculino', 'Vindo diretamente dos EUA, o arsenal orbital do Brimstone garante que o esquadrão dele sempre esteja em vantagem. Sua capacidade de oferecer utilitários com precisão e segurança faz dele um comandante inigualável na linha de frente.', 4),
(default, 'Phoenix', 'Masculino', 'Chegando com tudo diretamente do Reino Unido, o poder estelar de Phoenix reluz em seu estilo de luta, incendiando o campo de batalha com luz e estilo. Tendo ajuda ou não, ele entra na luta como e quando achar que deve.', 1),
(default, 'Sage', 'Feminino', 'Como uma verdadeira fortaleza chinesa, Sage traz segurança para si mesma e para a equipe aonde quer que vá. Capaz de reviver aliados e rechaçar investidas agressivas, ela oferece um centro de calmaria em meio ao caos da batalha.', 3),
(default, 'Sova', 'Masculino', 'Nascido sob o eterno inverno das tundras russas, Sova rastreia, encontra e elimina inimigos com eficiência e precisão implacáveis. Seu arco personalizado e suas habilidades inigualáveis de reconhecimento garantem que nenhuma presa escape.', 2),
(default, 'Viper', 'Feminino', 'Viper, a química dos Estados Unidos, emprega uma variedade de dispositivos químicos venenosos para controlar o campo de batalha e prejudicar a visão do inimigo. Se as toxinas não matarem a presa, seus jogos mentais certamente o farão.', 4),
(default, 'Cypher', 'Masculino', 'Cypher, um vendedor de informações do Marrocos, é uma verdadeira rede de vigilância de um homem só que fica de olho em cada movimento dos inimigos. Nenhum segredo está a salvo. Nenhuma manobra passa despercebida. Cypher está sempre vigiando.', 3),
(default, 'Reyna', 'Feminino', 'Criada no coração do México, Reyna domina o combate individual, destacando-se a cada abate efetuado. Sua capacidade só é limitada por sua própria perícia, tornando-a bastante dependente de desempenho.', 1),
(default, 'Killjoy', 'Queer', 'Killjoy, uma alemã genial, defende posições-chave no campo de batalha facilmente com seu arsenal de invenções. Se o dano causado por seu equipamento não der cabo dos inimigos, os efeitos negativos de seus queridos robôs darão conta do recado.', 3),
(default, 'Breach', 'Masculino', 'Breach, o homem-biônico sueco, dispara poderosos jatos cinéticos para forçar a abertura de um caminho pelo território inimigo. O dano e a interrupção que ele causa garantem que nenhuma luta seja justa.', 2),
(default, 'Omen', 'Masculino', 'Omen, uma lembrança fantasmagórica, caça nas sombras. Ele cega os inimigos, teleporta-se pelo campo e deixa a paranoia assumir o controle enquanto o adversário tenta descobrir de onde virá seu próximo ataque.', 4),
(default, 'Raze', 'Feminino', 'Raze chega do Brasil com uma explosão de carisma e armas enormes. Com seu estilo de jogo "porradeiro", ela é craque em desentocar inimigos entrincheirados e limpar espaços apertados com uma bela dose de BUUUM!', 1),
(default, 'Skye', 'Feminino', 'Mandando um salve direto da Austrália, Skye e sua equipe de feras desbravam territórios hostis. Com seus poderes de cura e suas criações que partem pra cima dos inimigos, qualquer equipe ficará mais forte e mais segura tendo Skye como aliada.', 2),
(default, 'Yoru', 'Masculino', 'Yoru, nativo do Japão, abre fendas na realidade para infiltrar as linhas inimigas sem ser visto. Ele usa tanto artimanhas quanto táticas agressivas, e os alvos são abatidos sem saber de onde o ataque veio.', 1),
(default, 'Astra', 'Feminino', 'Astra, a Agente ganense, utiliza energias cósmicas para moldar o campo de batalha a seu bel-prazer. Com total domínio da sua forma astral e um talento estratégico nato, ela está sempre anos-luz à frente dos inimigos.', 4),
(default, 'Clove', 'Não binário', 'Clove, ume encrenqueire da Escócia, vai desorientar os inimigos tanto no calor do combate quanto no frio da morte. Jovem e imortal, elu mantém os inimigos confusos até do além-túmulo: momentos após a morte, elu retorna à vida.', 4),
(default, 'Kay/o', 'Masculino', 'KAY/O é uma máquina de guerra construída com um único propósito: neutralizar Radiantes. Ele é capaz de Suprimir habilidades inimigas, anulando a capacidade de contra-ataque dos adversários e dando a si e a seus aliados uma vantagem essencial em combate.', 2),
(default, 'Chamber', 'Masculino', 'Bem-vestido e armado até os dentes, o criador de armas francês Chamber coloca os inimigos para correr com precisão mortal. Use e abuse do arsenal personalizado dele para segurar posições e abater inimigos de longe, criando a defesa perfeita para qualquer plano', 3),
(default, 'Neon', 'Feminino', 'Neon, nossa Agente filipina, avança em velocidades incríveis, descarregando surtos de radiância bioelétrica tão rapidamente quanto seu corpo consegue gerá-los. Ela corre à frente para pegar os inimigos de surpresa, abatendo-os mais rápido do que um raio.', 1),
(default, 'Fade', 'Feminino', 'Fade, uma caçadora de recompensas turca, usa o poder dos pesadelos para capturar os segredos dos inimigos. Personificando o próprio terror, ela persegue os alvos e revela seus medos mais profundos para, depois, destruí-los na escuridão.', 2),
(default, 'Harbor', 'Masculino', 'Vindo do litoral indiano, Harbor entra em campo com a força da tormenta, empunhando tecnologia ancestral com domínio sobre a água. Ele libera corredeiras espumantes e ondas esmagadoras para proteger seus aliados ou atacar aqueles que se opõem a ele.', 4),
(default, 'Gekko', 'Masculino', 'Gekko, de Los Angeles, lidera um grupo muito unido de criaturas caóticas. Seus amigos atropelam tudo, tirando os inimigos do caminho. Depois, Gekko corre atrás deles para reagrupá-los e reiniciar o processo.', 2),
(default, 'DeadLock', 'Feminino', 'A agente norueguesa Deadlock posiciona uma gama de nanofios de alta tecnologia para proteger o campo de batalha até mesmo do ataque mais letal. Ninguém escapa do seu olhar vigilante. Ninguém sobrevive à sua ferocidade implacável.', 3),
(default, 'Iso', 'Masculino', 'Iso é um mercenário chinês que entra em estado de fluxo para desmantelar os oponentes. Ele reconfigura a energia do ambiente para se proteger de balas e avança totalmente focado em direção ao próximo duelo até a morte.', 1);

select * from Agente;

select * from Agente join Classe on fkClasse = idClasse;

select idAgente as Agente, Agente.nome as Nome, fkClasse as Numero,
idClasse as Classe, Classe.nomeClasse as Tipo from Agente
join Classe on fkClasse = idClasse;








