var express = require('express')
var http = require('http')
var logger = require('morgan')
var formidable = require('formidable')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var url = require('url')

var myBD = "ficheiros.json"

var app = express()

app.use(logger('combined'))

/*
app.all('*', (req, res, next) =>{
    if(req.url != '/w3.css' && req.url.pathname != '/uploaded')
        res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
    next()
})
*/

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
    jsonfile.readFile(myBD, (erro, files) =>{
        if(!erro) res.write(pug.renderFile('form-ficheiro.pug', {lista : files}))
        else res.write(pug.renderFile('erro.pug', {e : erro}))
        res.end()
    })
})

app.get('/w3.css', (req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/css'})
    fs.readFile('stylesheets/w3.css', (erro, dados) => {
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('erro.pug', {e: erro}))
        res.end()
    })
})

app.post('/processaForm', (req, res) =>{
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {
    
    var fenviado = files.ficheiro.path
    var fnovo = './uploaded/'+files.ficheiro.name
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
    fs.rename(fenviado, fnovo, erro => {
        if(!erro) {
            res.write(pug.renderFile('form-recebido.pug', {ficheiro: files.ficheiro.name,
                                            desc : fields.desc,
                                            status: "Sucess!"}))
            res.end()
            }
        else {
            res.write(pug.renderFile('erro.pug', 
                                {e: "Errors occured: " + erro}))
            res.end()
        }
    })

    jsonfile.readFile(myBD, (erro, ficheiros) =>{
        if(!erro){
            ficheiros.push({ficheiro: files.ficheiro.name, desc: fields.desc})
            jsonfile.writeFileSync(myBD, ficheiros)
        }
        else{
            res.write(pug.renderFile('erro.pug', {e: "Errors occured: " + erro}))
        }
    })

    })
})

app.get('/uploaded', (req, res) => {
    var purl = url.parse(req.url, true).query
    var extension = purl.id.split(".");
    
    if(extension[1] == "pdf") res.writeHead(200, {'Content-Type':'application/pdf;charset=utf-8'})
    else res.writeHead(200, {'Content-Type':'image/png;charset=utf-8'})

    fs.readFile("uploaded/" + purl.id, (erro,dados) =>{
        if(!erro){
            res.write(dados)
        } 
        else res.write(pug.renderFile('erro.pug', {e: erro}))
        res.end()
    })
})

http.createServer(app).listen(4007, ()=>{
    console.log("Live on port 4007!")
})