const { Pool } = require('pg');

// Configurações de conexão com o banco de dados Postgres (Supabase)
// IMPORTANTE: No Vercel, use a Connection String do "Transaction Pooler" (porta 6543)
// para evitar exaustão de conexões em ambiente serverless.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para conectar ao Supabase via SSL em alguns ambientes
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