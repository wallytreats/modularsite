$(document).ready(function(){



    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = mm+'/'+dd+'/'+yyyy;
    $("#todaysDate").html(today);

  ///////////////////-------API's--------\\\\\\\\\\\\\\\\\\\

  //Yahoo Weather API
    var city = "Atlanta";
    var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='f'"
    //change city variable dynamically as required
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").done(function(data){
     console.log(data);
     //change to innerHTML as to not have to write html tags in js
     $('#temp').html("<h1>"+data.query.results.channel.item.condition.temp + "°F"+"</h1>");
     $('#conText').html(data.query.results.channel.item.condition.text);
    });

    //NewsAPI ==> https://newsapi.org/docs


    setInterval(function getNatNews(){
      $.getJSON("https://newsapi.org/v2/top-headlines?sources=usa-today&apiKey=a2671ef4131647a5b7887e8fb708dcd1").done(function(data){
        console.log(data);
        var number = Math.floor(Math.random() * Math.floor(10))
        //change to innerHTML as to not have to write html tags in js
        $('#natNewsTitle').html("<h2><u>"+data.articles[number].title + "</u></h2>");
        $('#natNewsDesc').html(data.articles[number].description + "<br /><div>Source: " + data.articles[number].source.name + "</div>");
      });
    }, 10000);




    //end of doc.ready
});
