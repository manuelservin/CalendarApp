import axios from "axios";
import Swal from 'sweetalert2'
import { types } from "../types";

const baseUrl = process.env.REACT_APP_API_URL

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const url = `${baseUrl}/auth`
    const resp = await axios.post(url,{email, password}, {headers: {'Content-Type': 'application/json'}})

    console.log(resp.data)
    if(resp.data.ok === false){ 
      console.log('entreeee')

      Swal.fire('Error', 'errorrr', 'error')
    }
    
      localStorage.setItem('token',resp.data.token)
      localStorage.setItem('token-init',new Date().getTime())
      dispatch(login({
        uid: resp.data.uid, 
        name: resp.data.name
      }))
      Swal.fire('Succes', 'login succesfully', 'success')
  
  };
};

const login= (user)=>({
   type: types.authLogin,
   payload: user
})
export const startRegister = ({rName, rEmail, rPassword1}) => {
  return async (dispatch) => {
    console.log(rName)
    const url = `${baseUrl}/auth/new`
    const resp = await axios.post(url,{name:rName,
        email:rEmail,
       password:rPassword1
      }
       , {headers: {'Content-Type': 'application/json'}})

    console.log(resp.data)
    if(resp.data.ok === false){ 
      

      Swal.fire('Error', 'errorrr', 'error')
      dispatch(checkingFinish())
    }
    
      localStorage.setItem('token',resp.data.token)
      localStorage.setItem('token-init',new Date().getTime())
      dispatch(login({
        uid: resp.data.uid, 
        name: resp.data.name
      }))
      Swal.fire('Succes', 'login succesfully', 'success')

  
  };
};
const checkingFinish = () => ({
  type: types.authCheckingFinish
})


export const startChecking = ()=>{
  return async (dispatch) => {
    const url = `${baseUrl}/auth/renew`
    const token = localStorage.getItem('token') || ''
   const resp = await axios.get(url,{headers: {
  'x-token': token}})
  if(resp.data.ok){
    localStorage.setItem('token',resp.data.token)
    localStorage.setItem('token-init',new Date().getTime())
    dispatch(login({
      uid: resp.data.uid, 
      name: resp.data.name
    }))
  }else{
    dispatch(checkingFinish())
  }

  }
}


export const startLogout = ()=>{
  return  (dispatch) => {
    localStorage.clear() 
    dispatch(logout())

  }
}

const logout = ()=>({
  type: types.authLogout
})