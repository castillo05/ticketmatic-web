import axios from 'axios';
import {URL} from './global';

// Creamos la nueva instancia de axios
const instanceAxios=axios.create({
    baseURL:URL,
    responseType:'json'
});

export const customAxios= async (url='',data={},method='post',contentType='application/json')=>{
    return await instanceAxios({
        method:method,
        url:URL+url,
        data:data,
        headers:{
            'Content-Type': contentType
        }
    })
}