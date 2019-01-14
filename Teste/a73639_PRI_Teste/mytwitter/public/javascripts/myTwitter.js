$(()=>{

    $('#posts').load('http://localhost:3000/posts')

    $('#adicionar').click(e => {
        e.preventDefault()
        $('#posts').append('<tr><td>' + $('#texto').val() + '</td><td>' + $('#autor').val() + '</td><td>' + $('#hash').val() + '</td><td>'+ '<button id="like">0</button></td></tr>')
        ajaxPost()
    })

    function ajaxPost(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/post/guardar",
            data: JSON.stringify({texto: $('#texto').val(), autor: $('#autor').val(), hash: $('#hash').val(), likes: 0}),
            success: p => alert('Parágrafo gravado com sucesso: ' + JSON.stringify(p)),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: ' + e)
            }
        })
        $('#texto').val('')
        $('#autor').val('')
        $('#hash').val('')
    }
    
})