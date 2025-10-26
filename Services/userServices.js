import pkg from 'pg';
import { config } from '../dbconfig.js';
import { Usuario } from '../models/usuarioModel.js';
import { Escucha } from '../models/escuchaModel.js';
import { Cancion } from '../models/cancionModel.js';
const { Client } = pkg


export async function getUsers() {
    return await Usuario.findAll();
}


export async function getUserById(id) {
    return await Usuario.findByPk(id);
}

export async function createuser(user) {
    return await Usuario.create({ nombre: user.nombre, password: user.password, rol: 'usuario' });
}


export async function getEscuchasByUser(user) {
    const escuchasUsuario = await Escucha.findAll({
        where: { usuarioId : user.id }
    });

    const conteo = {};
    
    escuchasUsuario.forEach(e => {
        if (!conteo[e.cancionId]) {
        conteo[e.cancionId] = 0;
        }
        conteo[e.cancionId]++;
    });

    const resultado = [];

    for (const cancionId of Object.keys(conteo)) {
        const cancion = await Cancion.findByPk(cancionId); //n
        resultado.push({
        cancionId: Number(cancionId),
        nombre: cancion ? cancion.nombre : "Desconocida",
        reproducciones: conteo[cancionId]
        });
    }

    return resultado;
}

