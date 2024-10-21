const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'data', 'secret.txt');

// Lee el archivo
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
   
    console.log('El mensaje secreto es:', data);
});

