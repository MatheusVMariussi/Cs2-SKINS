const { createClient } = require('@supabase/supabase-js');

// Inicializa o cliente Supabase apenas para validação
// Você precisa adicionar SUPABASE_URL e SUPABASE_KEY no seu .env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const authMiddleware = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }

    req.user = user;
    
    console.log(`Usuário autenticado: ${user.email} (${user.id})`);
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).json({ message: 'Erro interno na validação de token' });
  }
};

module.exports = authMiddleware;