import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {Loader, FormField} from '../components';



const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name:'',
        prompt:'',
        photo:'',
    });
    //加载图标
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) =>{
        //禁止默认调用
        e.preventDefault();
        
        if(form.prompt && form.photo){
            setLoading(true);

            try {
                const response = await fetch('https://dall-e-test.onrender.com/api/v1/post',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...form}),
                })

                await response.json();
                navigate('/');
            } catch (error) {
                alert(error);
            }finally{
                setLoading(false);
            }

        }else{
            alert('Please enter a prompt to create image');     
        }
    }
    const handleChange =(e) =>{
        setForm({...form, [e.target.name]:e.target.value })
        console.log();
    }
    
    const handleSurpriseMe =() =>{
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({...form, prompt: randomPrompt})
    }
    
    const generateImg = async()=>{
        if(form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('https://dall-e-test.onrender.com/api/v1/dalle', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({prompt: form.prompt})
                })

                const data = await response.json();
                console.log(data);
                setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
            } catch (error) {
                alert(error);
            }finally{
                setGeneratingImg(false);
            }
        } else{
            alert('Please enter a prompt'); 
        }
    }
  return (
    <section className="max-w-7xl mx-auto">
        {/* section第一部分 */}
        <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
           Create</h1>
            
            <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
            Create iumaginative and visually stunning images through DALL-E AI and share them with the cpmmunity
            </p>
        </div>
        {/* section第二部分:表单 */}
        <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        表单开头--------------
            <div className='flex flex-col gap-5'>
            <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Chris Wei"
            value={form.name}
            handleChange={handleChange}
            />
            <FormField
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            />
            <div className='relative bg-gray-50 border
            border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 w-64 p-3
            h-64 flex justify-center items-center'>
                {form.photo ? (
                    <img
                        src={form.photo}
                        alt={form.prompt}
                        className="w-full h-full object-contain">
                    </img>
                  
                ):(
                    <img
                        src={preview}
                        alt="preview"
                        className='w-9/12 h-9/12 object-contain
                        opacity'
                    />
                )}
                
                    
                {/* 是否正在生成图片 */}
                {generatingImg && (
                    <div className='absolute inset-0 z-0 flex
                    justify-center items-center bg-[rgba(0,0,0,0,5)]
                    rounded-lg'>
                        <Loader/>
                        </div>
                )}
                </div>
                {form.photo   && <p>ImageUrl: <a href={form.imgUrl} download>Click to download</a></p>}
            </div>
            
            <div className="mt-5 flex gap-5">
                
                <button
                    type="button"
                    onClick={generateImg}
                    className='text-white bg-green-700 font-mediun
                    rounded-md text-sm w-full sm:w-auto px-5 py-2.5
                    text-center'>
                   
                {generatingImg ? 'Generating...' : 'Generate'}
                
                </button>
            </div>
            
                        
            <div className='mt-10'>
                <p className='mt-2 text-[#666e75] text-[14px]'> Once you have created the image you want you can share it with others in the community</p>
                <button 
                type="submit"
                onClick={handleSubmit}
                className='mt-3 text-white bg-[#6469ff]
                font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5
                text-center'>
                    {loading ? 'Sharing...' : 'Share with the community'}
                </button>
            </div>
        表单结尾--------------
        </form>

    </section>
  )
}

export default CreatePost
