const db = require('../config/db');

const getAllAnuncios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    
    const conditions = [];
    const params = [];
    let paramIndex = 1;
    
    if (req.query.arma && req.query.arma !== '') {
      conditions.push(`arma = $${paramIndex++}`);
      params.push(req.query.arma);
    }
    
    if (req.query.raridade && req.query.raridade !== '') {
      conditions.push(`raridade = $${paramIndex++}`);
      params.push(req.query.raridade);
    }
    
    if (req.query.minPrice && req.query.minPrice !== '') {
      conditions.push(`valor >= $${paramIndex++}`);
      params.push(parseFloat(req.query.minPrice));
    }
    
    if (req.query.maxPrice && req.query.maxPrice !== '') {
      conditions.push(`valor <= $${paramIndex++}`);
      params.push(parseFloat(req.query.maxPrice));
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // Consultar total de registros (para paginação)
    const countResult = await db.query(
      `SELECT COUNT(*) as total FROM anuncios ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);
    
    // Consultar registros com paginação
    // Postgres sintaxe: LIMIT $limit OFFSET $offset
    const query = `SELECT * FROM anuncios ${whereClause} ORDER BY data_anuncio DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);
    
    const { rows: anuncios } = await db.query(query, params);
    
    res.status(200).json({
      anuncios,
      page,
      limit,
      total,
      totalPages
    });
  } catch (error) {
    console.error('Erro ao listar anúncios:', error);
    res.status(500).json({ message: 'Erro ao listar anúncios' });
  }
};

// Buscar um anúncio pelo ID
const getAnuncioById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { rows } = await db.query(
      'SELECT * FROM anuncios WHERE id = $1',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar anúncio:', error);
    res.status(500).json({ message: 'Erro ao buscar anúncio' });
  }
};

// Criar um novo anúncio
const createAnuncio = async (req, res) => {
  try {
    const { 
      nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url 
    } = req.body;
    
    const userId = req.user.id;
    const userEmail = req.user.email;
    
    const { rows } = await db.query(
      `INSERT INTO anuncios 
       (nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, vendedor, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, userEmail, userId]
    );
    
    res.status(201).json({ 
      message: 'Anúncio criado com sucesso',
      id: rows[0].id
    });
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    res.status(500).json({ message: 'Erro ao criar anúncio' });
  }
};

// Atualizar um anúncio existente
const updateAnuncio = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const { 
      nome_skin, 
      arma, 
      raridade, 
      valor, 
      floatSkin, 
      descricao, 
      imagem_url 
    } = req.body;
    
    // Verificar se o anúncio existe e PERTENCE ao usuário
    const { rows } = await db.query(
      'SELECT user_id FROM anuncios WHERE id = $1',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
    // Se o dono do anúncio for diferente do usuário logado: CAI FORA.
    if (rows[0].user_id !== userId) {
      return res.status(403).json({ message: 'Você não tem permissão para alterar este anúncio' });
    }
    
    // Atualizar (Sintaxe Postgres $1, $2...)
    const result = await db.query(
      `UPDATE anuncios SET 
       nome_skin = $1, 
       arma = $2, 
       raridade = $3, 
       valor = $4, 
       floatSkin = $5, 
       descricao = $6, 
       imagem_url = $7
       WHERE id = $8`,
      [nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, id]
    );
    
    // No Postgres, result.rowCount diz quantas linhas foram afetadas
    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'Falha ao atualizar anúncio' });
    }
    
    res.status(200).json({ message: 'Anúncio atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar anúncio:', error);
    res.status(500).json({ message: 'Erro ao atualizar anúncio' });
  }
};

// Excluir um anúncio
const deleteAnuncio = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Primeiro verifica se o anúncio pertence ao usuário
    const { rows } = await db.query(
      'SELECT user_id FROM anuncios WHERE id = $1',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
    if (rows[0].user_id !== userId) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir este anúncio' });
    }
    
    // Se passou, deleta
    await db.query('DELETE FROM anuncios WHERE id = $1', [id]);
    
    res.status(200).json({ message: 'Anúncio excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir anúncio:', error);
    res.status(500).json({ message: 'Erro ao excluir anúncio' });
  }
};

module.exports = {
  getAllAnuncios,
  getAnuncioById,
  createAnuncio,
  updateAnuncio,
  deleteAnuncio
};