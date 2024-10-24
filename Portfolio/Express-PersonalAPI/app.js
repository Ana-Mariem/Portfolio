const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// almacenar nombres y tareas
let names = [];
let tasks = [];

// índice
app.get('/', (req, res) => {
    res.render('index', { names: names, tasks: tasks, error: null });
});

// saludar
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
        res.render('index', { names: names, tasks: tasks, error: null });
    } else {
        res.render('index', { names: names, tasks: tasks, error: 'Por favor ingresa un nombre.' });
    }
});

app.get('/greet/wazzup/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < names.length) {
        res.render('wazzup', { name: names[index] });
    } else {
        const error = 'Índice fuera de rango.';
        res.render('index', { names: names, tasks: tasks, error: error });
    }
});

// agregar tareas
app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

// eliminar tareas
app.post('/task/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1); 
    }
    res.redirect('/');
});

// Ruta para mover una tarea hacia arriba
app.get('/task/up/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index > 0 && index < tasks.length) {
        // Intercambia la tarea actual con la anterior
        const temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
    }
    res.redirect('/');
});

// Ruta para mover una tarea hacia abajo
app.get('/task/down/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length - 1) {
        // Intercambia la tarea actual con la siguiente
        const temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
    }
    res.redirect('/');
});

app.put('/greet', (req, res) => {
    const name = req.body.name;
    if (name) {
        names.push(name);
        res.json(names);
    } else {
        res.status(400).json({ error: 'Nombre no proporcionado.' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
