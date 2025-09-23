import express from "express";
import 'dotenv/config'
/*{
    "nombre" : "usuario10",
    "password" : "UserPass!10"
}
*/
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5vbWJyZSI6InVzdWFyaW8xMCIsImlhdCI6MTc1ODYzNzE4OCwiZXhwIjoxNzU4NjQwNzg4fQ.4Q_oymHKZvZHMIQrz6SEvRxEu8iaLqexMp2Fcwam5sY
import userRoutes from './Routes/userRoutes.js'
import cancionRoutes from './Routes/cancionRoutes.js'
import morgan from "morgan";

const app = express()
const PORT = 8000


app.use(express.json());
app.use(morgan("dev"));

app.use(userRoutes);
app.use(cancionRoutes);

app.get('/', (req, res) => {
  res.send('Hello Worerld')
})
/*
app.get('/about', (req, res) => {
  res.send('About route 🎉')
})

app.get('/canciones', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query("select * from public.canciones");
  await client.end();
  console.log(result.rows);
  res.send(result.rows)

})

app.post('/createuser', async (req,res) =>{
    const user = req.body;
    if(!user.nombre || !user.userID || !user.password){
        return res.status(400).json({mesagge : "Debe completar todos los campos"});
    }
    try {
        const client = new Client(config);
        await client.connect();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        let result = await client.query('insert into usuario values($1, $2, $3) returning',[
            user.userid, user.nombre, user.password
        ]);
        await client.end();
        console.log('Rows creadas: ' + result.rowCount);

        console.log(result.rows);
        res.send(result.rows)
    } catch (error) {
        return res.status(500).json({mesagge : error.mesagge});
    }
});

app.post('/login', async (req,res) =>{
    const user = req.body;
    if (!user.userid || user.password) {
        return res.status(400).json({mesagge : 'Debe completar todos los campos'});
    }
    try {
        let result = await client.query('select * from usuario where user_id  = $1',[user.userid]);
        if (result.rowCount === 0) {
            return res.status(404).json({mesagge : 'Usuario no encontrado'});
        }

        let dbUser = result.rows[0];
        const passOK = await bcrypt.compare(user.password, dbUser.password);
        //
        //  crear token y con payload

        if (passOK) {
            res.send({nombre : dbUser.nombre, token});
        }else{
            res.send("Clave invalida")
        }
    } catch (error) {
        return res.status(500).json({mesagge : error.mesagge});
    }
})
*/
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})