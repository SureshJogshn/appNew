const express =  require("express"); // express js
const https  =   require("https");  // https means weather etc live server checking
const bodyParser = require("body-parser"); // bodyParser means text display to body
const app =  express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html"); // html file linked
})

app.post("/",function(req,res){
  // console.log(req.body.CityName);
  const CityName = req.body.CityName;
  const Appid = "540924d34cf716fd2bcc57ee51655b0a";
  const Units = "metric";

  const url =  "https://api.openweathermap.org/data/2.5/weather?q="+CityName+"&appid="+Appid+"&units="+Units+"";

  https.get(url,function(response){
  console.log(response);

  response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const wethers = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const icons = weatherData.weather[0].icon;
    const imgURL = "http://openweathermap.org/img/wn/"+icons+"@2x.png";
    res.write("The Tempresor in city is "+ CityName + " " + temp + " Degree selies");
    // res.write("<img src="+ imgURL +">");
    res.send();
    })
  })
})

app.listen(3000, function(){
  console.log("Server is Start 3000");
});
