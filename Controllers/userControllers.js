import bcrypt from 'bcrypt';
import { getUsers, getUserById, createuser } from '../Services/userServices.js';


export const createUser = async (req,res) => {
    try {
        const user = req.body;
        if (!user.nombre || !user.password) {
            return res.status(400).json({ message: 'Debe completar todos los campos' });
        }
        const users = await getUsers();
        const userExists = users.find(u => u.nombre === user.nombre);

        if (userExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await createuser({ nombre: user.nombre, password: hashedPassword });

        return res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = req.body;
        if (!user.nombre || !user.password) {
            return res.status(400).json({ message: 'Complete all fields' });
        }

        const users = await getUsers();

        userMatch = users.find(u => user.nombre === u.nombre)
        console.log(userMatch);
        
        if (userMatch) {
            const passwordMatch = await bcrypt.compare(userMatch.password, user.password);
            if (passwordMatch) {
                return res.status(201).json(user.nombre)
            }
            else{
                return res.status(400).send('Invalid username or password');
            }
        }else{
            return res.status(400).send('Invalid username or password');
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}