import React, { useEffect, useState } from 'react'
import { fetchAnalytics } from '../services/api'
import StatCard from '../components/StatCard'
import { TopPagesBar, BrowserPie } from '../components/Charts'
import Loading from '../components/Loading'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetchAnalytics()
      .then((res) => setData(res))
      .catch((err) => {
        setError(err?.message || 'Unable to load analytics')
        setData(null)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      {error && <div className="card text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Sessions" value={data?.totalSessions ?? 0} />
        <StatCard title="Total Clicks" value={data?.totalClicks ?? 0} />
        <StatCard title="Page Views" value={data?.totalPageViews ?? 0} />
        <StatCard
          title="Avg Events / Session"
          value={data?.totalSessions ? Math.round((data?.totalEvents || 0) / data.totalSessions) : 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TopPagesBar data={data?.topPages || []} />
        </div>
        <div>
          <BrowserPie data={data?.browserAnalytics || []} />
        </div>
      </div>
      {data && data.topPages && data.topPages.length === 0 && (
        <div className="card text-slate-600">No page performance data available yet.</div>
      )}
    </div>
  )
}
