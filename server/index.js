const express = require('express');
const app = express();
const port = 4000
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/comments', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM comments');
    res.send(rows)
})

app.post('/api/createComment', async (req, res)=>{
    const val = await db.query(`INSERT INTO comments (nombre, descripcion) 
    VALUES ($1, $2) RETURNING *;`, [req.body.nombre, req.body.descripcion])
    res.send(val.rows[0])
})

app.delete('/api/deleteComment/:id',async (req, res)=>{
    const val = await db.query(`DELETE FROM comments WHERE id=$1 RETURNING *;`, [req.params.id])
    res.send(val.rows[0])
})

app.listen(port, ()=>{
    console.log(`Escuchando en puerto ${port}`)
})