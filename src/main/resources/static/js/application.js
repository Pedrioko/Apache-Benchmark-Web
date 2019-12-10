$("#form-evalua").submit(function (event) {
    event.preventDefault();
    $('#mymodal').modal({ backdrop: 'static', keyboard: false })
    var datos = {};
    datos["count"] = parseInt($("#count").val());
    datos["concurrent"] = $("#concurrent").is(":checked") ? parseInt($("#count").val()) : 1;
    datos["url"] = $("#url").val();

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
            $("#value14").html(respuesta.Time_per_request)
            $("#value15").html(respuesta.Transfer_rate)
            $("#connectiontimes  > tbody").empty();
            $("#connectiontimes  > tbody:last-child").append('<tr><td>Connect</td> <td>' + respuesta.Connect[0] + '</td> <td>' + respuesta.Connect[1] + '</td> <td>' + respuesta.Connect[2] + '</td> <td>' + respuesta.Connect[3] + '</td> <td>' + respuesta.Connect[4] + '</td> </tr>')
            $("#connectiontimes  > tbody:last-child").append('<tr><td>Processing</td> <td>' + respuesta.Processing[0] + '</td> <td>' + respuesta.Processing[1] + '</td> <td>' + respuesta.Processing[2] + '</td> <td>' + respuesta.Processing[3] + '</td> <td>' + respuesta.Processing[4] + '</td> </tr>')
            $("#connectiontimes  > tbody:last-child").append('<tr><td>Waiting</td> <td>' + respuesta.Waiting[0] + '</td> <td>' + respuesta.Waiting[1] + '</td> <td>' + respuesta.Waiting[2] + '</td> <td>' + respuesta.Waiting[3] + '</td> <td>' + respuesta.Waiting[4] + '</td> </tr>')
            $("#connectiontimes  > tbody:last-child").append('<tr><td>Total</td> <td>' + respuesta.Total[0] + '</td> <td>' + respuesta.Total[1] + '</td> <td>' + respuesta.Total[2] + '</td> <td>' + respuesta.Total[3] + '</td> <td>' + respuesta.Total[4] + '</td> </tr>')

            $("#porcenajes  > tbody").empty();
            respuesta.tabletime.forEach((item) => {
                $("#porcenajes  > tbody:last-child").append('<tr><td>' + item.porcentaje + '</td><td>' + item.cantidad + '</td></tr>')
            });
            var result = regression.linear(respuesta.tabletime.map(e => [parseFloat(e.cantidad.split("(")[0]), parseFloat(e.cantidad.split("(")[0])]));

            var m = result.equation[0];
            var c = result.equation[1];

            var ctx = document.getElementById('myChart1');
            var lineardata = respuesta.tabletime.map(e => (parseFloat(e.cantidad) * m) + c);
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: respuesta.tabletime.map(e => e.porcentaje),
                    datasets: [{
                        label: 'Percentage of the requests',
                        data: respuesta.tabletime.map(e => parseFloat(e.cantidad.split("(")[0])),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Linear Regression',
                        data: lineardata,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            $('#mymodal').modal('hide')


        },
        error: function (err) {
            console.log(err);
            $('#mymodal').modal('hide')

            alert("No se ha podido obtener la información");
        }
    });
});


$("#download").click(function (event) {
    var quotes = document.getElementsByTagName("body")[0];
    $("html").addClass("hide-scrollbar");
    $("#download").hide()
    $("#ejecutar").hide()
    html2canvas(quotes).then(function (canvas) {

        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF("p", "mm", "tabloid");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(img, 'JPEG', 0, 0, width, height);
        doc.save('informe.pdf');
    });
    $("#ejecutar").show()
    $("#download").show()
    $("html").removeClass("hide-scrollbar");
});
