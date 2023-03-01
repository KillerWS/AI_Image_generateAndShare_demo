import React,{useState, useEffect}  from 'react'
import {sendIcon} from '../../assets'
import {botIcon} from '../../assets'
import {userIcon} from '../../assets'
import './chatStyle.css'

import bot from '../../assets/chatGPT/bot.svg'
import user from '../../assets/chatGPT/user.svg'

import Inputbar from '../../components/Input/Inputbar'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { IconButton,TextField, Box} from '@mui/material';


const Message=({isAi, value, uniqueId})=>{
    console.log(isAi+" "+ value+" "+ uniqueId);
    return(
        <div class={isAi ? "wrapper ai":"wrapper"}>
                    <div class="chat">
                        <div className="profile">
                            <img
                                src={isAi ? {botIcon}  : {userIcon}}
                                alt={isAi ? 'bot' : 'user'}
                            />
                        </div>
                        <div class="message" id={uniqueId}>{value}</div>
                    </div>
                </div>
    )
}
const RenderMessages=({data})=>{
    console.log(data);
    if(data?.length > 0){
        return data.map((post) => <Message key={post._uniqueId} {...post}/> )    
    }else{
        return <p>当前无信息</p>;
    }
        
    
}

const ChatPage = () => {
    const [verbatimGeneration, setVerbatimGeneration] = useState(false);
    const [isFinished,setIsFinished] = useState(false);
    const [isGenerating,setIsGenerating] = useState(false);
    const [currentSearch,setCurrentSearch] = useState('');

    const [currentMessage, setCurrentMessage] =  useState({
            isAi:false,
            value:'Welcom',
            uniqueId:null,
    });
    const [allPosts, setAllPosts] = useState([]);
    const form = document.querySelector('form');
    const chatContainer = document.querySelector('#chat_container');
    let loadInterval;

    const loader2=(element)=>{
        element.textContent = 'Is generating';
    
        //300 means 每300毫秒执行前边的func
        loadInterval = setInterval(()=>{
            element.textContent += '.';
    
            if(element.textContent == 'Is generating....'){
                element.textContent = '';
            }
        },300)
    }
    const typeText=(element, text)=>{
        let index = 0

        let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
        }, 20)


    }

    const generateUniqueId=()=>{
        const timestamp = Date.now();
        const randomNumber = Math.random();
        const hexadecimalString = randomNumber.toString(16);
    
        return `id-${timestamp}-${hexadecimalString}`
    }
    const chatStripe=(isAi, value, uniqueId)=>{
        return(
            `
            <div class="wrapper ${isAi && 'ai'}">
                <div class="chat">
                    <div class="profile">
                        <img
                            src="${isAi ? bot : user}"
                            alt="${isAi ? 'bot' : 'user'}"
                        />
                    </div>
                    <div class="message" id=${uniqueId}>${value}</div>
                </div>
            </div>
            `
    
        )
    }
    
    
    const handleSubmit2 = async (e)=>{
        console.log("表单提交");
        e.preventDefault();
        const data = new FormData(form);
        setIsGenerating(false);
        //user'schatstripe
        // chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
        chatContainer.innerHTML += chatStripe(false, currentSearch);
       
        form.reset();
    
        //user'schatstripe
        const uniqueId = generateUniqueId();
        chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
    
        chatContainer.scrollTop = chatContainer.scrollHeight;
    
        const messageDiv = document.getElementById(uniqueId);
    
        loader2(messageDiv);
        
        //fetch data from server
        const response = await fetch('http://localhost:8080/api/v1/openai/chatgpt', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: currentSearch
                    })
                })
                
                clearInterval(loadInterval);
                messageDiv.innerHTML = '';
                // const result = await response.json();
                // console.log(data);
                if(response.ok){
                    
                    const data = await response.json();
                    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
                    console.log(data);
                    if(verbatimGeneration){
                        typeText(messageDiv, parsedData)
                        
                    }else{
                        messageDiv.innerHTML = parsedData;
                    }
                    
                    
                       
                    
                    
                }else{
                    const err = await response.text();

                    messageDiv.innerHTML = "Something went wrong"
                    alert(err);
                }
    }   


    useEffect(()=>{
        setAllPosts([currentMessage])
    },[])

    const handleSearchChange=(e)=>{
        
    }
    const loader=()=>{
        textContent = '';
    //300 means 每300毫秒执行前边的func
    setLoadEffect(
        setTimeout(()=>{
        textContent += '.';

        if(textContent == '....'){
            textContent = '';
        }

        setLoadEffect(textContent);
    },300)
        )
}

    const generateUniqueMessageId=()=>{
        const timestamp = Date.now();
        const randomNumber = Math.random();
        const hexadecimalString = randomNumber.toString(16);

        return `id-${timestamp}-${hexadecimalString}`
    }

   

    const handleSubmit=async(e)=>{
        console.log(currentSearch);
        //禁止提交表单后默认刷新
        e.preventDefault();
        setIsGenerating(true);
        const uniqueId = generateUniqueMessageId();
        
        setCurrentMessage({
            isAi:true,
            value:currentSearch,
            uniqueId:uniqueId,
        })

        setAllPosts([...allPosts,currentMessage])

        
        console.log(allPosts);
        //setAllPosts({...allPosts,currentMessage})
        
        
    }
  return (
    
    <div id="chat_app">
        <script src="script.js" type="text/javascript"></script>
        <div id="chat_container"></div>
        
        
        {/* {isGenerating ? "。。。" : "生成结束"} */}
        
        {/* <RenderMessages
            data={allPosts}
            /> */}
        
        
        <form class="chat_form" onSubmit={handleSubmit2}>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

        <Grid item xs={10}>
          <TextField
            fullWidth 
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          onChange={(e)=>setCurrentSearch(e.target.value)}
        />
        </Grid>
        <Grid item xs={2}>
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
        <img class="chat_img" src={sendIcon}/>
      </IconButton>
        </Grid>
      </Grid>
      </Box>
            {/* <textarea class="input_textarea" name="prompt" cols="1" rows="1" placeholder="Ask Codex..."
            onChange={(e)=>setCurrentSearch(e.target.value)}></textarea> */}
            
            {/* <button class="input_button" type="submit"><img class="chat_img" src={sendIcon}/></button> */}
            
        </form>
    </div>
 
  )
}

export default ChatPage
