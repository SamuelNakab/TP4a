import pkg, { Client } from 'pg';
import { config } from '../dbconfig.js';


export async function getCanciones() {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('SELECT * FROM cancion')
    await client.end();
    
    return result.rows;
}

async function getCancionById(id) {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('SELECT * FROM cancion WHERE id = $1 RETURNING *', [id])
    await client.end();
    
    return result.rows[0];
}

export async function createCancion(nombre) {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('INSERT INTO cancion (nombre) VALUES ($1) RETURNING *', [nombre]);
    await client.end();

    return result.rows[0]
}

export async function updateCancion(song) {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *', [song.nombre, song.id]);
    await client.end();

    return result.rows[0]
}

export async function deleteCancion(id) {
    const client = new Client(config);
    await client.connect();

    const result = await client.query('DELETE FROM cancion WHERE id = $1 RETURNING *', [id])
    await client.end();
    
    return result.rows;
}

export async function escuchar(usuario_id, cancion_id) {
    const client = new Client(config);
    await client.connect();

    const existe = await client.query('SELECT id, reproducciones FROM escucha WHERE usuario_id = $1 AND cancion_id = $2', [usuario_id, cancion_id]);
    let result;
    if (existe.rows.length > 0) {
        
        result = await client.query('UPDATE escucha SET reproducciones = reproducciones + 1 WHERE usuario_id = $1 AND cancion_id = $2 RETURNING *', [usuario_id, cancion_id]);
    } else {

        result = await client.query('INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, 1) RETURNING *', [usuario_id, cancion_id]);
    }

    await client.end();
    return result.rows[0];
}

