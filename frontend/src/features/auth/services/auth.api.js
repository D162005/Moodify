import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export async function loginUser({userName, email, password}){

    const response = await api.post('/login',{userName,email,password})

    return response.data
}

export async function registerUser({userName, email, password}){

    const response = await api.post('/register',{userName,email,password})

    return response.data
}

export async function getMe(){

    const response = await api.get('/get-me')

    return response.data
}

export async function logout(){

    const response = await api.post('/logout')

    return response.data
}

