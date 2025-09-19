import pkg from 'pg';
import { config } from '../dbconfig.js';

const { Client } = pkg


export async function getUsers() {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('SELECT * FROM usuario')
    await client.end();
    console.log(result.rows);
    return result.rows;
}

export async function getUserById(id) {
    const client = new Client(config);
    await client.connect();
    const result = await client.query('SELECT * FROM usuario WHERE id = $1', [id])
    await client.end();

    console.log(result.rows);
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

    const result = await client.query('SELECT * FROM escucha WHERE usuario_id = $1 SUM()')//Averiguar como hacer esta query
}

