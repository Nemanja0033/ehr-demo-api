import 'dotenv/config'
import prisma from './config/db.js'
import app  from './app.js';

async function startServer(){
    try{
        console.log("DB URL:", process.env.DATABASE_URL);

        await prisma.$connect();
        console.log("Connected to DB!"); 
        app.listen(3000, () => {
            console.log("App runing!");
        })
    }
    catch(err){
        console.error(err);
    }
}

startServer();