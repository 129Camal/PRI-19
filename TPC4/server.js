var http = require('http')
var fs = require('fs')
var url = require('url')

var server = http.createServer((req, res)=>{
    var u = url.parse(req.url,true)
    var path = u.pathname

    if (path == "/"){
        fs.readFile('./website/index.html', (erro, dados)=>{
            res.writeHead(200,{'Content-Type': 'text/html'})
            if(!erro){
                res.write(dados)
            }else{
                res.write(erro)
            }
            res.end()   
        })
    }else{
        var q = u.query
        var result = "./website/html/obra"+ q.id +".html"
        fs.readFile(result, (erro, dados)=>{
            res.writeHead(200,{'Content-Type': 'text/html'})
            if(!erro){
                res.write(dados)
            }else{
                res.write(erro)
            }   
            res.end()
            ;
        })
    }
    }).listen((4002), () => {
        console.log('Servidor está à escuta na porta 4002!')
    })