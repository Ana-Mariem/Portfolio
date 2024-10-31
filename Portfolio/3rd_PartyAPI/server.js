
const express = require('express');
const https = require('https');
const app = express();
const apiKey = '48bc8e4ab7aa589c3b436608bc88fc4a';


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.post('/', (req, res) => {
    const city = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        let data = '';

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            try {
                const weatherData = JSON.parse(data);

                if (weatherData.cod === 200) {
                    const temp = weatherData.main.temp;
                    const description = weatherData.weather[0].description;
                    const icon = weatherData.weather[0].icon;
                    const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    res.send(`
                        <h1>The temperature in ${city} is ${temp} °C</h1>
                        <p>Weather description: ${description}</p>
                        <img src="${imageUrl}" alt="Weather icon">
                        <br><a href="/">Back to Home</a>
                    `);
                } else {
                    res.send(`<h1>Error: ${weatherData.message}</h1><a href="/">Back to Home</a>`);
                }
            } catch (error) {
                res.send(`<h1>Error processing the data.</h1><a href="/">Back to Home</a>`);
            }
        });
    }).on("error", (error) => {
        res.send(`<h1>Error connecting to the weather service: ${error.message}</h1><a href="/">Back to Home</a>`);
    });
});

app.listen(3001, () => {
    console.log("Server is running on localhost:3001");
});
