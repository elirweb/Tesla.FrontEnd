
var RetornarProduto = function(parameter)
{
    var elemento = OptionSelect(parameter);
    $.ajax({
        url: elemento,
        type: 'GET',
        dataType: 'json',

    })
    .done(function(data) {
       var html = "";
       $(data).each(function(index,value){
         var valorFormatado =  value.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
         var priceParcelado = value.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$','');
        
         var parcelado = priceParcelado.replace(',','.') / 5.00;
         parcelado = Math.ceil(parcelado)-1;
         html += "<div class=\"col\">" +
                "<a class=\"card h-100\" href=\"product.html?prod="+value.id+"\">"+
           "<img src=\"https://tcm-assets-dev.s3-sa-east-1.amazonaws.com/prova/product/img/main/"+value.photo+"\" class=\"card-img-top\" alt=\"\">"+
           "<div class=\"card-body\">" +
             "<small class=\"card-subtitle text-muted\"></small>"+
             "<h5 class=\"card-title\">"+value.nameProduto+"</h5>"+
             "<p class=\"card-text mb-0\">"+valorFormatado+"</p>"+
             "<small class=\"card-text\">em até "+parcelado+"x de R$ "+ (priceParcelado.replace(',','.') /parcelado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })  +"</small>"+
             "</div>" +
         "</a>"+
     "</div>";
       })
       $("#listProducts").html(html);
    })
    .fail(function() {
       alert('deu erro')
    })
}

var OptionSelect = function(parameter)
{
    var option = "";
    switch(parameter){
        case "Nome (A-Z)":
            option = "https://localhost:44373/getAll/asc";
            break;
            case "Nome (Z-A)":
                option = "https://localhost:44373/getAll/desc";
            break;
            case "Menor Preço":
            option = "https://localhost:44373/getProductParameter/(select Min(Price) from Products)";
                break;
            case "Maior Preço":
            option = "https://localhost:44373/getProductParameter/(select Max(Price) from Products)";
                break;
                case "Mais Vendidos":
            option = "https://localhost:44373/bestSaller";
                break;
                default:
                    break;
   }

    return option;
}


var DetailsProducts = function(id){
    $.ajax({
        url: 'https://localhost:44373/getById/'+id,
        type: 'GET',
        dataType: 'json',

    })
    .done(function(data) {
        var html = "";
        $(data).each(function(index,value){
          var valorFormatado =  value.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          var priceParcelado = value.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$','');
         
          var parcelado = priceParcelado.replace(',','.') / 5.00;
          parcelado = Math.ceil(parcelado)-1;
       
          $("#imgProd").html("<img src=\"https://tcm-assets-dev.s3-sa-east-1.amazonaws.com/prova/product/img/main/prod-"+value.id+".png\" class=\"img-fluid\" alt=\"\" />");
         $("#infoParcelado").html("<small>ou em até "+parcelado+"x de </small><br /> <span class=\"h4 text-danger\"> R$ "+ (priceParcelado.replace(',','.') /parcelado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$','')  +"</span>");
        })
        $("#listProducts").html(html);
     })
     .fail(function() {
        alert('deu erro')
     })
}

var GetFreightTables = function(){

$.ajax({
    url: 'https://localhost:44373/getFreight/'+$('#zipcode').val()+'/'+$('#zipcode').val(),
    type: 'GET',
    dataType: 'json',

})
.done(function(data) {
    var price = data.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$','');
    if(data.deliveryTime != ""){
        $("#msgFreight").html("Entrega em "+data.deliveryTime+" dias úteis no valor de <strong>R$ "+price+"</strong>");
    }else {
        $("#msgFreight").html("Frete não disponivel");
        
    }
})
 .fail(function() {
    alert('deu erro')
 })
}

