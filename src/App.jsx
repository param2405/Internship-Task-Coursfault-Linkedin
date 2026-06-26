import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Sessions from './pages/Sessions'
import HeatmapPage from './pages/HeatmapPage'
import { initializeTracker, trackPageView, trackClicks } from './tracker'

function AppRouter() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location.pathname, location.search])

  return (
    <main className="max-w-6xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
      </Routes>
    </main>
  )
}

export default function App() {
  useEffect(() => {
    initializeTracker()
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <AppRouter />
      </div>
    </BrowserRouter>
  )
}
