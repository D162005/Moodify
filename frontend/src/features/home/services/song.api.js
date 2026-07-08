import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/song",
    withCredentials: true
})

export async function getSongsByMood(mood) {
    const query = mood ? `?mood=${encodeURIComponent(mood)}` : ""
    const response = await api.get(`/${query}`)
    return response.data
}
