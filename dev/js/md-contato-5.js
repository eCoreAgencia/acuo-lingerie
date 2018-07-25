function formContato(){
    var jsonSaveDadosUser = {
        "nome": $("#co_nome").val(),
        "email": $("#co_email").val(),
        "mensagem": $("#co_mensagem").val()
    };

    var urlSaveDadosUser = 'https://acuo.vtexcommercestable.com.br/api/dataentities/FC/documents/';

    $.ajax({
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(jsonSaveDadosUser),
        type: 'POST',
        url: urlSaveDadosUser,
        success: function (data) {
          console.log(data);
          $("div#messageSuccess").removeClass("hide");
          $("#co_nome").val();
          $("#co_email").val();
          window.alert('Sua mensagem foi enviada com sucesso. Em breve, entraremos em contato.');
        },
        error: function (data) {
          console.log(data);
          window.alert('Ocorreu um erro ao enviar sua mensagem. Pode tentar de novo daqui alguns minutos?');
        }
    });
}