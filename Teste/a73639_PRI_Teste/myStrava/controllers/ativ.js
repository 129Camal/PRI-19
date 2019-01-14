var Atividade = require('../models/ativ')

module.exports.allAtiv = ()=>{
    return Atividade
        .find({},{_id:false})
        .exec()
}

module.exports.allAtivTipo = tipo => {
    return Atividade
        .find({type:tipo},{_id : false})
        .exec()
}

module.exports.AtivMaisLonga = () => {
    return Atividade
        .find({},{_id:false})
        .sort({distance: -1})
        .limit(1)
        .exec()
}

module.exports.AtivTipoMaior = tipo => {
    return Atividade
        .find({type:tipo},{_id : false})
        .sort({distance: -1})
        .limit(1)
        .exec()
}