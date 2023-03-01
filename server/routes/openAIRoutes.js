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

router.route('/dalle').post( async(req,res)=>{
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
router.route('/chatgpt').post( async(req,res)=>{
    try {
        const prompt = req.body.prompt;
        
        const response = await openai.createCompletion({
        
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,// Higher values means the model will take more risks.
            //给出的响应长度
            max_tokens: 3000,
            top_p: 1,
            //惩罚频率:不会经常重复类似的句子
            frequency_penalty: 0.5,
            presence_penalty: 0,
            
            } );

            console.log(prompt);
            res.status(200).send({
                bot: response.data.choices[0].text
              });
        } catch (error) {
            console.log(error);
            res.status(500).send(error || 'Something went wrong');
        }
       
    

})
export default router