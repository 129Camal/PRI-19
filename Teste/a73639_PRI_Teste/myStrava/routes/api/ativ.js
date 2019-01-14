var express = require('express')
var router = express.Router()
var Ativ = require('../../controllers/ativ')
var url = require('url')

router.get('/', function(req, res) {
    var purl = url.parse(req.url, true)
    var q = purl.query
    if(q.filtro=="maislonga"){
        Ativ.AtivMaisLonga()
        .then(data =>{
            res.jsonp(data)
        })
        .catch(error =>{
            res.status(500).send("Error trying to list the longest ativiti: " + error)
        })
    } else{
        Ativ.allAtiv()
        .then(data =>{
            res.jsonp(data)
        })
        .catch(error =>{
            res.status(500).send("Error trying to list all the Ativicties: " + error)
        })
    }
});

router.get('/:tipo', function(req, res) {
    var purl = url.parse(req.url, true)
    var q = purl.query
    if(q.filtro == "maislonga"){
        Ativ.AtivTipoMaior(req.params.tipo)
        .then(data =>{
            res.jsonp(data)
        })
        .catch(error =>{
            res.status(500).send("Error trying to find ativities with type "+ req.params.id)
        })
    } else {
        Ativ.allAtivTipo(req.params.tipo)
        .then(data =>{
            res.jsonp(data)
        })
        .catch(error =>{
            res.status(500).send("Error trying to find ativities with type "+ req.params.id)
        })
    }
});

module.exports = router;