import pkg, { Client } from 'pg';
import { config } from '../dbconfig.js';
import { Cancion } from '../models/cancionModel.js';
import { Escucha } from '../models/escuchaModel.js';

export async function getCanciones() {
    return await Cancion.findAll();
}

async function getCancionById(id) {
    return await Cancion.findByPk(id);
}

export async function createCancion(nombre) {
    return await Cancion.create({ nombre });
}

export async function updateCancion(song) {//.nombre.id
    await Cancion.update(
        { nombre: song.nombre },
        { where: { id: song.id } }
    );
    return getCancionById(song.id);
}

export async function deleteCancion(id) {
    const row = await Cancion.destroy({ where: { id } });
    return row;
}

export async function escuchar(usuario_id, cancion_id) {
    lisen = await Escucha.create({
        usuarioId: usuario_id,
        cancionId: cancion_id,
        fechaEscucha: new Date()
    });
    return lisen;
}

