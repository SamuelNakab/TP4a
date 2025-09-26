import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibm9tYnJlIjoidXNlcjEiLCJpYXQiOjE3NTg0OTY1NDMsImV4cCI6MTc1ODUwMDE0M30.T2Mb0LjbW_kuU9p91tr_v3ik8JTyeB5OmPka_L3r2oQ"
import { getUsers, getUserById, createuser, getEscuchasByUser } from '../Services/userServices.js';


export const createUser = async (req,res) => {
    try {
        const user = req.body;
        //console.log(user);
        
        if (!user.nombre || !user.password) {
            return res.status(400).json({ message: 'Debe completar todos los campos' });
        }
        const users = await getUsers();
        console.log(users);
        
        const userExists = users.find(u => u.nombre === user.nombre);

        if (userExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await createuser({ nombre: user.nombre, password: hashedPassword });

        const payload = { id: newUser.id, nombre: newUser.nombre };
        const options = { expiresIn: '1h' };
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        return res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        
        if (!user.nombre || !user.password) {
            return res.status(400).json({ message: 'Complete all fields' });
        }

        const users = await getUsers();

        const userMatch = users.find(u => user.nombre === u.nombre)
        console.log(userMatch);
        
        if (userMatch) {
            const passwordMatch = await bcrypt.compare(user.password, userMatch.password);
            
            
            if (passwordMatch) {
                const payload = { id: userMatch.id, nombre: userMatch.nombre, rol: userMatch.rol };
                const options = { expiresIn: '1h' };
                const token = jwt.sign(payload, process.env.SECRET_KEY, options);

                return res.status(200).json({ token });
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

export const getEscuchasUser = async (req, res) => {
    try {
        const id = parseInt(req.user.id);
        const escuchas = await getEscuchasByUser({ id });
        res.status(200).json(escuchas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}