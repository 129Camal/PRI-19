$(()=>{
    //var xhr = new XMLHttpRequest();
    
    var formData = new FormData()

    $('#ficheiros').load('http://localhost:4008/files')

    $('#add').click(e=>{
        
        e.preventDefault()
        var fich = $('#fich')

        var item = fich[0].files[0]
        
        $('#ficheiros').append('<tr><td><a href="http://localhost:4008/open/' + item.name + '">' + item.name + '</a></td><td>' + $('#texto').val() + '</td></tr>')
        
        formData.append('file', item)
        
        //xhr.open("POST", '/savefile', true);
        //xhr.send(formData)

        console.log(formData.get('file'))
        
        ajaxPostBD(item.name)
        ajaxPostFile(formData)
    })


    function ajaxPostBD(name){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:4008/file/guardar",
            data: JSON.stringify({desc: $('#texto').val(), filename: name}),
            success: p => alert('Ficheiro carregado com sucesso: ' + p.filename),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: ' + e)
            }
        })
        $('#texto').val('')
    }

    function ajaxPostFile(fich){
        $.ajax({
            type:"POST",
            contentType: "json",
            async: false,
            cache: false,
            processData: false,
            enctype:'multipart/form-data',
            url:"http://localhost:4008/savefile",
            data: fich,
            success: ()=>{console.log("Enviei: " + data)},
            error: e =>{console.log('ERRO: ' + JSON.stringify(e))}
        })
        $('#fich').val('')
    }
    
})