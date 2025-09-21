import pkg from 'pg';
import { config } from '../dbconfig.js';

const { Client } = pkg


export async function getUsers() {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('SELECT * FROM usuario')
    await client.end();
    
    return result.rows;
}

export async function getUserById(id) {
    const client = new Client(config);
    await client.connect();
    const result = await client.query('SELECT * FROM usuario WHERE id = $1', [id])
    await client.end();


    return result.rows[0];
}

export async function createuser(user) {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('INSERT INTO usuario (nombre, password) VALUES ($1, $2) RETURNING *', [user.nombre, user.password])
    return result.rows[0];
}


export async function getEscuchasByUser(user) {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('SELECT c.id AS cancion_id, c.nombre AS cancion, SUM(e.reproducciones) AS total_reproducciones FROM escucha e JOIN cancion c ON e.cancion_id = c.id WHERE e.usuario_id = $1 GROUP BY c.id, c.nombre ORDER BY total_reproducciones DESC;', [user.id])
    return result.rows;
}

