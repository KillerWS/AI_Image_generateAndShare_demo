import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './DBConnectPool/connect.js';
import postRoutes from './routes/postRoutes.js'
import openAIRoutes from './routes/openAIRoutes.js'
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}))

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/openai',openAIRoutes);

app.use('/test',(req,res)=>{res.send("It works :)")})


const startServer = async()=>{

    try {
        //如果把.env放在其他目录会读取不到边境变量!
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,()=> console.log(`Server has started on port http://localhost:${8080}`))
    } catch (error) {
        console.log(error);
    }

    
}
//启动服务,Entrypoint
startServer();