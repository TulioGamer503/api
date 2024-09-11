const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST. Usa /items para interactuar con los datos.');
});

// Datos de ejemplo
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// Obtener todos los items
app.get('/items', (req, res) => {
    res.json(items);
});

// Obtener un item por ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item no encontrado.');
    res.json(item);
});

// Crear un nuevo item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Actualizar un item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item no encontrado.');

    item.name = req.body.name;
    res.json(item);
});

// Eliminar un item
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item no encontrado.');

    items.splice(itemIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});           