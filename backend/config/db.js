const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Testar conexão ao inicializar
(async () => {
  try {
    const client = await pool.connect();
    console.log('Conexão com o PostgreSQL (Supabase) estabelecida com sucesso!');
    client.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
})();

module.exports = pool;