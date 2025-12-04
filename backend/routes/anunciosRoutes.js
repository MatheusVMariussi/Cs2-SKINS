const router = require('express').Router();
const controller = require('../controllers/anunciosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas PÚBLICAS (Qualquer um vê)
router.get('/', controller.getAllAnuncios);
router.get('/:id', controller.getAnuncioById);

// Rotas PROTEGIDAS (Só logado mexe)
router.post('/', authMiddleware, controller.createAnuncio);
router.put('/:id', authMiddleware, controller.updateAnuncio);
router.delete('/:id', authMiddleware, controller.deleteAnuncio);

module.exports = router;