const {Router} = require("express");
const eventoRoutes = require("./routerEvento");
const participanteRoutes = require("./routerParticipante");

const router = Router();

router.use('/evento', eventoRoutes);
router.use('/participante', participanteRoutes);

module.exports  = router;