const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
//const { urlencoded } = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html")  
})

app.post("/",(req,res)=>{
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const APIkey = "6fac279418ec884ffc154f1af66ae2de" ;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+APIkey+"&units="+unit;
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data)
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            console.log(desc);
            res.write("<h2>The weather is currently "+desc+"</h2>")
            res.write("<h1>The temperature in "+query+" is : "+temp+" degree Celcius</h1>")
            res.write("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
            res.send();
        })
    })
    
})







app.listen(3000,(e)=>{
    console.log("Server is running on port 3000");
})

