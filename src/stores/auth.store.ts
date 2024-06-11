import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth',
  ()=>{
    const token = ref(localStorage.getItem('token')||null)
    const user = ref()
    const setToken = (newToken:string) =>{
      token.value = newToken
      token.value && localStorage.setItem('token',token.value)
    }
    const removeToken = ()=>{
      token.value = null
      localStorage.removeItem('token')
    }
    const login = async (values:any) =>{
      try {
        const response = await axios.post('http://localhost:3000/api/user/login',values)
        console.log(response.data.token)
        setToken(response.data.token)
      }catch (err){
        console.log(err)
      }
    }

    const register = async(values:any)=>{
      try{
        const response= await axios.post("http://localhost:3000/api/user/register",values)
        setToken(response.data.token)
      }
      catch (err){
        console.log(err)
      }
    }
    const isAuthenticated = ()=> !!token.value
    return{token,setToken,isAuthenticated,login,register}
  }
)
