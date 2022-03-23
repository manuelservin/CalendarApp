import  axios  from "axios"
const baseUrl = process.env.REACT_APP_API_URL

export const publicActions = (endpoint,data, method = 'GET')=>{
const url = `${baseUrl}/${endpoint}`

if (method === 'GET'){
    return axios.get(url)
}else{
    return axios.post(url,data, {headers: {'Content-Type': 'application/json'}})}



}