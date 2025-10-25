import pkg from 'pg';
import { config } from '../dbconfig.js';
import { Usuario } from '../models/usuarioModel.js';
import { Escucha } from '../models/escuchaModel.js';
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
  const escuchas = await Escucha.findAll({
    where: { usuarioId : user.id },
    attributes: ["cancionId"],
    raw: true
  });

  const resultado = [];

  for (let i = 0; i < escuchas.length; i++) {
    const cancionId = escuchas[i].cancionID;

    let encontrada = false;
    for (let j = 0; j < resultado.length; j++) {
      if (resultado[j].cancionID === cancionId) {
        resultado[j].reproducciones += 1;
        encontrada = true;
        break;
      }
    }

    if (!encontrada) {
      resultado.push({ cancionID : cancionId, reproducciones: 1 });
    }
  }

  return resultado;
}

