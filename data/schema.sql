CREATE DATABASE remedios_naturais;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE metas (
  id_meta INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  agua VARCHAR(10),
  alimentacao TINYINT,
  luz_solar VARCHAR(10),
  temperanca TINYINT,
  ar_livre VARCHAR(10),
  sono VARCHAR(10),
  exercicio VARCHAR(10),
  equilibrio_emocional TINYINT,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
CREATE TABLE progresso_diario (
  id_progresso INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  data DATE NOT NULL,
  agua VARCHAR(10),
  alimentacao TINYINT,
  ar_livre VARCHAR(10),
  luz_solar VARCHAR(10),
  exercicio VARCHAR(10),
  temperanca TINYINT,
  sono VARCHAR(10),
  equilibrio_emocional TINYINT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  UNIQUE (id_usuario, data)
);

CREATE TABLE recomendacoes (
  id_recomendacao INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  categoria ENUM('Água', 'Alimentação', 'Ar Puro', 'Luz Solar', 'Exercício', 'Temperança', 'Descanso', 'Equilíbrio') NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  mensagem TEXT NOT NULL,
  percentual_progresso TINYINT UNSIGNED CHECK (percentual_progresso BETWEEN 0 AND 100),
  data_gerada DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);
