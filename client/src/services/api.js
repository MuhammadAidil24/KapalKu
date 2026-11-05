import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})

// Otomatis menempelkan token login di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Kalau token kadaluarsa, kembali ke halaman login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && location.pathname !== '/login') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      location.href = '/login'
    }
    return Promise.reject(err)
  },
)

export default api
