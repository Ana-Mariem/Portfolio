const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// archivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// formulario
app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    // Calcular BMI
    const bmi = (weight / (height * height)) * 10000;
    
    // Enviar respuesta 
    res.send(`Your BMI is: ${bmi.toFixed(2)}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
