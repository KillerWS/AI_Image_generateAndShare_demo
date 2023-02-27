import express, { response } from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from "openai";
import Post from '../Model/post.js'

dotenv.config();

const router = express.Router();

// router.route('/').get((req,res)=>{
//     res.send("yyyyyyyyyyyy");
//     console.log("XXX恢复");
// });

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').post( async(req,res)=>{
    try {
        const {prompt} = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json'
        })
        // const aiResponse = await openai.createImage({
        //     prompt,
        //     n:1,
        //     size:'1024x1024',
        // })

        const image = aiResponse.data.data[0].b64_json;
        const imageUrl = aiResponse.data.data[0].url;
    
        res.status(200).json({photo:image,url:imageUrl});
    } catch (error) {
        console.log(error);
        res.status(500).json(error?.response.data.error.message);
    }
})

export default router