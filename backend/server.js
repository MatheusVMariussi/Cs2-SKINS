require('dotenv').config();
const express = require('express');
const cors = require('cors');
const anunciosRoutes = require('./routes/anunciosRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste (Importante para verificar se a API subiu)
app.get('/', (req, res) => {
  res.send({ 
    message: 'API MinhasSkins rodando!', 
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/api/anuncios', anunciosRoutes);

// Tratamento de erros para rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Só abre a porta se estiver rodando localmente (npm run dev)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;