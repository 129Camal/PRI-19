var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var fs = require('fs')

var myBD = __dirname + "/posts.json"
console.log('BD in: ' + __dirname)

/* GET home page. */
router.get('/', (req, res) => res.render('form'))

router.get('/posts', (req,res) => {
  jsonfile.readFile(myBD, (erro, texto) => {
    if(!erro) res.render('lista', {lista: texto})
    else res.json(erro)
  })
})

router.post('/post/guardar', (req,res) => {
  jsonfile.readFile(myBD, (erro, information) => {
    if(!erro){
      information.push(req.body)
      jsonfile.writeFile(myBD, information, erro2 => {
        if(!erro2) console.log('Registo gravado com sucesso')
        else console.log('Erro: ' + erro2)
      })
    }
    else console.log('Erro: ' + erro)
  })
  res.send(req.body)
})

module.exports = router;
