import React, { useEffect, useState } from 'react'
import { fetchSessions, fetchSessionById } from '../services/api'
import SessionTable from '../components/SessionTable'
import Loading from '../components/Loading'

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedEvents, setSelectedEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetchSessions()
      .then((res) => setSessions(res.sessions || []))
      .catch((err) => {
        setError(err?.message || 'Unable to load sessions')
        setSessions([])
      })
      .finally(() => setLoading(false))
  }, [])

  const handleViewDetails = async (sessionId) => {
    setDetailLoading(true)
    setError('')
    try {
      const res = await fetchSessionById(sessionId)
      setSelectedEvents(res.events || [])
      setSelectedSession(sessionId)
    } catch (err) {
      setError(err?.message || 'Failed to load session details')
    } finally {
      setDetailLoading(false)
    }
  }

  const closeModal = () => {
    setSelectedSession(null)
    setSelectedEvents([])
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Sessions</h1>
      {loading && <Loading />}
      {error && <div className="card text-red-600">{error}</div>}
      {!loading && !error && sessions.length === 0 && (
        <div className="card text-slate-600">No sessions available yet. Please open the app to generate tracking data.</div>
      )}
      {!loading && !error && sessions.length > 0 && (
        <SessionTable sessions={sessions} onViewDetails={handleViewDetails} />
      )}

      {selectedSession && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Session details</h2>
                <p className="text-sm text-slate-500">Session {selectedSession}</p>
              </div>
              <button className="text-slate-500 hover:text-slate-900" onClick={closeModal}>Close</button>
            </div>
            {detailLoading ? (
              <Loading text="Loading session timeline..." />
            ) : (
              <div className="space-y-3">
                {selectedEvents.length === 0 ? (
                  <div className="card text-slate-600">No events found for this session.</div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto border rounded p-3 bg-slate-50">
                    {selectedEvents.map((event) => (
                      <div key={event._id} className="rounded border bg-white p-3 shadow-sm">
                        <div className="flex items-center justify-between gap-4 text-sm text-slate-700">
                          <span className="font-medium">{event.eventType}</span>
                          <span>{new Date(event.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-slate-600">Page: {event.pageUrl}</div>
                        {event.clickData?.x != null && event.clickData?.y != null && (
                          <div className="text-sm text-slate-500">Click position: {event.clickData.x}% x {event.clickData.y}%</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
