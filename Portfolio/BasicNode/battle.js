const superheroes = require('superheroes');
const supervillains = require('supervillains');

// Obtener un superhéroe y un supervillano aleatorios
const hero = superheroes.random();
const villain = supervillains.random();

// Mostrar el combate épico en la consola
console.log(`${hero} is battling ${villain} in an epic showdown!`);
