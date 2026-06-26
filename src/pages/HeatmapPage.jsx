import React, { useEffect, useState } from 'react'
import { fetchHeatmap } from '../services/api'
import Heatmap from '../components/Heatmap'
import Loading from '../components/Loading'

export default function HeatmapPage() {
  const [clicks, setClicks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetchHeatmap().then((res) => {
      setClicks(res.clicks || [])
    }).catch((err) => {
      setError(err?.message || 'Unable to load heatmap data')
      setClicks([])
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Heatmap</h1>
      {loading && <Loading />}
      {error && <div className="card text-red-600">{error}</div>}
      {!loading && !error && clicks.length === 0 && (
        <div className="card text-slate-600">No click events found yet. Use the tracker to generate heatmap data.</div>
      )}
      {!loading && !error && clicks.length > 0 && <Heatmap clicks={clicks} />}
    </div>
  )
}
