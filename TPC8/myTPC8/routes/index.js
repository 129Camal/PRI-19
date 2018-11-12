var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var fs = require('fs')


var myBD = __dirname + "/files.json"
console.log('BD in: ' + __dirname)

/* GET home page. */
router.get('/', (req, res) => res.render('index'))

router.get('/files', (req,res) => {
  jsonfile.readFile(myBD, (erro, files) => {
    if(!erro) res.render('lista', {lista: files})
    else res.json(erro)
  })
})

router.post('/file/guardar', (req,res) => {
  jsonfile.readFile(myBD, (erro, files) => {
    if(!erro){
      files.push(req.body)
      console.dir(files)
      jsonfile.writeFile(myBD, files, erro2 => {
        if(!erro2) console.log('Registo gravado com sucesso')
        else console.log('Erro: ' + erro2)
      })
    }
    else console.log('Erro: ' + erro)
  })
  res.send(req.body)
})

module.exports = router;
