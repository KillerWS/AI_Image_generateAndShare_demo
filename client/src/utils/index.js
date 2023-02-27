import FileSaver from 'file-saver'
import {surpriseMePrompts} from '../constants'

export function getRandomPrompt(currentPrompt){
    const randomIndex = Math.floor(Math.random() *
    surpriseMePrompts.length);

    //访问数组元素
    const randomPrompt =surpriseMePrompts[randomIndex];
    //确保不会一直有同样的随机数
    if(randomPrompt === currentPrompt) return getRandomPrompt(currentPrompt);
    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export async function searchMethod(){
    
}