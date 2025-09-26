import { createCancion, updateCancion, deleteCancion, escuchar } from "../Services/cancionServices.js"; 

export const createSong = async (req,res) => {
    const nombre = req.body.nombre
    try {
        if (!nombre) {
            return res.status(400).send('Debe completar todos los campos');
        }

        const newSong = await createCancion(nombre);
        return res.status(201).json(newSong);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const updateSong = async (req,res) => {
    const song = req.body
    try {
        if (!song.id || !song.nombre) {
            return res.status(400).send('Debe completar todos los campos');
        }

        const updatedSong = await updateCancion(song);
        return res.status(200).json(updatedSong);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteSong = async (req,res) => {
    const id = req.body.id
    try {
        if (!id) {
            return res.status(400).send('Debe especificar que cancion eliminar');
        }

        const deletedSong = await deleteCancion(id);
        return res.status(201).json(deletedSong);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const escucharCancion = async (req,res) => {
    console.log(req.body);
    
    const {cancion_id} = req.body
    const usuario_id = req.user.id
    
    
    try {
        if (!usuario_id || !cancion_id) {
            return res.status(400).send('Debe completar todos los campos');
        }
        const escucha = await escuchar(usuario_id, cancion_id);
        return res.status(201).json({ escucha });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}