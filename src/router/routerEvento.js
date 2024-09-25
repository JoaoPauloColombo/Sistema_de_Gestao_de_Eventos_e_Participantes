const {Router} = require ("express");
const EventoController = require("../controller/EventoController");
const { validateEvento, validateEventoId } = require("../middlewares/ValidateEvento");

const router = Router();

router.post('/',validateEvento,(req,res) =>{
    EventoController.create(req,res)
});
router.put('/',validateEvento,validateEventoId,(req,res) => {
    EventoController.update(req,res)
});
router.get('/',(req,res) => {
    EventoController.getAll(req,res)
});
router.get('/:id',validateEventoId,(req,res) => {
    EventoController.getOne(req,res)
});
router.delete('/:id',validateEventoId,(req,res) => {
    EventoController.delete(req,res)
});
router.get('/participante/:id',validateEventoId,(req,res) => {
    EventoController.getParticipante(req,res)
});

module.exports = router;