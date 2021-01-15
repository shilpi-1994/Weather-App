$(document).ready(function () {
    //Get the weather related information about a city
    getWeatherInformation();

    function getWeatherInformation() {
        var getDataBtn = $('#getWeatherData');
        var clearDataBtn = $('#clearWeatherData');
        getDataBtn.click(function (e) {
            if($('#cityName').val() === '') {
                $("#errorMessage").html('Please enter a city name first!');
            } else {
                $.ajax({
                    type: "GET",
                    url: "http://api.openweathermap.org/data/2.5/weather?q="+ $('#cityName').val() +"&APPID=542f2b00d721914ae10dcd354b9cbbfa",
                    dataType: "json",
                    success: function (data) {
                        var table = $("<table><tr><th>Weather Information</th></tr>");
                        
                        table.append("<tr><td>City:</td><td>" + data.name + "</td></tr>");
                        table.append("<tr><td>Country:</td><td>" + data.sys.country + "</td></tr>");
                        table.append("<tr><td>Current Temperature:</td><td>" + data.main.temp + "°C</td></tr>");
                        table.append("<tr><td>Humidity:</td><td>" + data.main.humidity + "</td></tr>");
                        table.append("<tr><td>Weather:</td><td>" + data.weather[0].description + "</td></tr>");
                        $("#weatherData").html(table);
                        $("#errorMessage").html('');
                    },
                    error: function (xhr, status, error) {
                        console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                    }
                });
            }
        });

        clearDataBtn.click(function () {
            $('#cityName').val('');
            $("#weatherData").html('');
        });
    }    
});