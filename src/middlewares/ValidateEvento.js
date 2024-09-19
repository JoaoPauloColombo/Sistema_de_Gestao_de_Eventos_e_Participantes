const validateEvento = (req,res,next) => {
    const{nome, data, localizacao} = req.body;

    if(!nome || !data || !localizacao){
        return res.status(400).json({
            msg:"Campos Invalidos",
        });
    }

    return next();
}

const validateEventoId = (req,res,next) => {
    const{id} = req.params;
    if(!id) {
        return res.status(400).json({
            msg:"Parametro faltando"
        });
    }
    return next();
}

module.exports = {validateEvento,validateEventoId};