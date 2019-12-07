
    var datos = {};
    datos["count"] = 10;
    datos["concurrent"] = 10;
    datos["url"] = 'http://www.facebook.com/';

    $.ajax({
      url: '/ab',
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(datos),
      success: function (respuesta) {
        console.log(respuesta);
        console.log(JSON.parse(respuesta));


        respuesta = JSON.parse(respuesta);
        $("#value1").html(respuesta.Server_Software)
        $("#value2").html(respuesta.Server_Hostname)
        $("#value3").html(respuesta.Server_Port)
        $("#value4").html(respuesta.Document_Path)
        $("#value5").html(respuesta.Document_Length)
        $("#value6").html(respuesta.Concurrency_Level)
        $("#value7").html(respuesta.Time_taken_for_tests)
        $("#value8").html(respuesta.Complete_requests)
        $("#value9").html(respuesta.Failed_requests)
        $("#value10").html(respuesta["Non-2xx_responses"])
        $("#value11").html(respuesta.Total_transferred)
        $("#value12").html(respuesta.HTML_transferred)
        $("#value13").html(respuesta.Requests_per_second)
        $("#value1grac4").html(respuesta.Time_per_request)
        $("#value15").html(respuesta.Transfer_rate)

        $("#connectiontimes  > tbody:last-child").append('<tr><td>Connect</td> <td>'+respuesta.Connect[0]+'</td> <td>'+respuesta.Connect[1]+'</td> <td>'+respuesta.Connect[2]+'</td> <td>'+respuesta.Connect[3]+'</td> <td>'+respuesta.Connect[4]+'</td> </tr>')
        $("#connectiontimes  > tbody:last-child").append('<tr><td>Processing</td> <td>'+respuesta.Processing[0]+'</td> <td>'+respuesta.Processing[1]+'</td> <td>'+respuesta.Processing[2]+'</td> <td>'+respuesta.Processing[3]+'</td> <td>'+respuesta.Processing[4]+'</td> </tr>')
        $("#connectiontimes  > tbody:last-child").append('<tr><td>Waiting</td> <td>'+respuesta.Waiting[0]+'</td> <td>'+respuesta.Waiting[1]+'</td> <td>'+respuesta.Waiting[2]+'</td> <td>'+respuesta.Waiting[3]+'</td> <td>'+respuesta.Waiting[4]+'</td> </tr>')
        $("#connectiontimes  > tbody:last-child").append('<tr><td>Total</td> <td>'+respuesta.Total[0]+'</td> <td>'+respuesta.Total[1]+'</td> <td>'+respuesta.Total[2]+'</td> <td>'+respuesta.Total[3]+'</td> <td>'+respuesta.Total[4]+'</td> </tr>')


        respuesta.tabletime.forEach((item)=>{
        $("#porcenajes  > tbody:last-child").append('<tr><td>'+item.porcentaje+'</td><td>'+item.cantidad+'</td></tr>')
        });

      },
      error: function (err) {
        console.log(err);
        console.log("No se ha podido obtener la información");
      }
    });