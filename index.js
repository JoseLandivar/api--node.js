const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Lista de usuarios
let users = [];

// Ruta base
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API de Usuarios!');
});

// Obtener todos los usuarios
app.get('/users', (req, res) => {
    res.json(users);
});

// Crear un nuevo usuario
app.post('/users', (req, res) => {
    const { id, name, email } = req.body;
    if (!id || !name || !email) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    users.push({ id, name, email });
    res.status(201).json({ message: 'Usuario creado correctamente.', user: { id, name, email } });
});

// Obtener un usuario por ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(user);
});

// Actualizar un usuario
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    res.json({ message: 'Usuario actualizado correctamente.', user });
});

// Eliminar un usuario
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    users.splice(index, 1);
    res.json({ message: 'Usuario eliminado correctamente.' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});

