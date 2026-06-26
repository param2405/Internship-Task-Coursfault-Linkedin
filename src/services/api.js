import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })

export const fetchAnalytics = () => API.get('/analytics').then(r => r.data)
export const fetchSessions = () => API.get('/sessions').then(r => r.data)
export const fetchSessionById = (id) => API.get(`/sessions/${id}`).then(r => r.data)
export const fetchHeatmap = (pageUrl) => API.get(`/heatmap${pageUrl ? `?pageUrl=${encodeURIComponent(pageUrl)}` : ''}`).then(r => r.data)

export default API
