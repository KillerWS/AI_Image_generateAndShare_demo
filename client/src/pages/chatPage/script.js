import {botIcon} from '../../assets'
import {userIcon} from '../../assets'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element){
    element.textContent = '';

    //300 means 每300毫秒执行前边的func
    loadInterval = setInterval(()=>{
        element.textContent += '.';

        if(element.textContent == '...'){
            element.textContent = '';
        }
    },300)
}

function typeText(element, text){
    let index = 0;
    
    let interval = setInterval(()=>{
        if(index < text.length){
            element.innerHTML += text.charAt(index);
            index++;
        }else{
            clearInterval(interval);
        }

    },200)
}

function generateUniqueId(){
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`
}

function chatStripe (isAi, value, uniqueId){
    return(
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div className="profile">
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

const handleSubmit = async (e)=>{
    console.log("表单提交");
    e.preventDefault();
    
    const data = new FormData(form);
    
    //user'schatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    form.reset();

    //user'schatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);

}

form.addEventListener('submit', handleSubmit);
//按回车
form.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        handleSubmit(e);
    }
});