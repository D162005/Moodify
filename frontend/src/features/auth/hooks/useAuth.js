import { useContext } from "react";
import { AuthContext } from "../auth.contex"
import {loginUser, registerUser, getMe, logout} from '../services/auth.api'

export const useAuth = () =>{

    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    async function handleLoginUser({userName,email,password}){
        setLoading(true)
        const data = await loginUser({userName,email,password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleRegister({userName,email,password}){
        setLoading(true)
        const data = await registerUser({userName,email,password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe(){
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout(){
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    return ({
        user,loading, setUser, handleGetMe, handleLoginUser, handleLogout, handleRegister
    })
}