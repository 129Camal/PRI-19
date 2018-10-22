var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')

fs.readdir('./data/', (erro, files)=>{
    arr = []
    var jsonObj = {"index" : arr}
    files.forEach((file) =>{
        fs.readFile('./data/' + file, (err, dados)=>{
            if(!erro){
                var mx = JSON.parse(dados)
                arr.push({ "titulo": mx.titulo, "ficheiro": file })

                fs.writeFile("./data/index.json", JSON.stringify(jsonObj), (err) => {
                    if (err) {
                        console.error("Erro na Escrita: " + err);
                        return;
                    };
                })
            }
            else
                console.log("Erro de Read: " + err)
        })
    })
})

var estilo = /w3\.css/
var index = /index/
var musicas = /musicas/

http.createServer((req,res)=>{
    var purl = url.parse(req.url, true)

    console.log("Recebi um pedido: " + purl.pathname)

    if(index.test(purl.pathname) || purl.pathname=="/"){
        res.writeHead(200, {'Content-Type':'text/html'})
        fs.readFile('data/index.json', (erro, dados)=>{
            if(!erro){
                var myObj = JSON.parse(dados)
                res.write(pug.renderFile('index.pug', {ind: myObj}))
            }
            else
                res.write('<p><b>ERRO: </b> ' + erro + '</p>')
            res.end()
        })
    }
    else if(estilo.test(purl.pathname)){
        res.writeHead(200, {'Content-Type':'text/css'})
        fs.readFile('estilo/w3.css', (erro, dados)=>{
            if(!erro){
                res.write(dados)
            }
            else
                res.write('<p><b>ERRO: </b> ' + erro + '</p>')
            res.end()
        })
    }
    else if(musicas.test(purl.pathname)){
        var ficheiro = purl.pathname.split('/')[2]
        console.log('Lendo o ficheiro: '+ ficheiro)

        res.writeHead(200, {'Content-Type':'text/html'})
        fs.readFile('data/' + ficheiro, (erro, dados)=>{
            if(!erro){
                var myObj = JSON.parse(dados)
                res.write(pug.renderFile('template.pug', {arq: myObj}))
            }
            else
                res.write('<p><b>ERRO: </b> ' + erro + '</p>')
            res.end()
        })
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html'})
        res.write('<p><b>ERRO: </b> ' + purl.pathname + '</p>')
        res.write('<p>Rota Desconhecida...</p>')
        res.end()

    }
}).listen(5000, ()=>{
    console.log("Servidor à escuta na porta 5000!")
})