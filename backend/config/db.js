const mysql = require('mysql2/promise');

// Configurações de conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Atualiza a configuração SSL para incluir o CA
  ssl: {
    ca: process.env.DB_SSL_CA,
    rejectUnauthorized: true 
  }
});

// Testar conexão ao inicializar
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
})();

module.exports = pool;
