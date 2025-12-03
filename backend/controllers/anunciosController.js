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
      nome_skin, 
      arma, 
      raridade, 
      valor, 
      floatSkin, 
      descricao, 
      imagem_url, 
      vendedor 
    } = req.body;
    
    // Postgres usa RETURNING id para devolver o ID gerado imediatamente
    const { rows } = await db.query(
      `INSERT INTO anuncios 
       (nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, vendedor) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, vendedor]
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
    const { 
      nome_skin, 
      arma, 
      raridade, 
      valor, 
      floatSkin, 
      descricao, 
      imagem_url, 
      vendedor 
    } = req.body;
    
    const { rows } = await db.query(
      'SELECT id FROM anuncios WHERE id = $1',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
    const result = await db.query(
      `UPDATE anuncios SET 
       nome_skin = $1, 
       arma = $2, 
       raridade = $3, 
       valor = $4, 
       floatSkin = $5, 
       descricao = $6, 
       imagem_url = $7, 
       vendedor = $8 
       WHERE id = $9`,
      [nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, vendedor, id]
    );
    
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
    
    const { rowCount } = await db.query(
      'DELETE FROM anuncios WHERE id = $1',
      [id]
    );
    
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
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