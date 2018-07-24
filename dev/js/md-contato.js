function formContato(){
    var jsonSaveDadosUser = {
        "contatoClientName": $("#co_nome").val(),
        "contatoClientEmail": $("#co_email").val(),
        "contatoClientMensagem": $("#co_mensagem").val()
    };

    var urlSaveDadosUser = 'http://api.vtexcrm.com.br/acuo/dataentities/FC/documents/';

    $.ajax({
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(jsonSaveDadosUser),
        type: 'PATCH',
        url: urlSaveDadosUser,
        success: function (data) {
          console.log(data);
          $("div#messageSuccess").removeClass("hide");
          $("#co_nome").val();
          $("#co_email").val();
          $("#co_mensagem").val();
          window.alert('Sua mensagem foi enviada com sucesso. Em breve, entraremos em contato.');
        },
        error: function (data) {
          console.log(data);
          window.alert('Ocorreu um erro ao enviar sua mensagem. Pode tentar de novo daqui alguns minutos?');
        }
    });
}