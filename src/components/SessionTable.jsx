import React from 'react'

export default function SessionTable({ sessions = [], onViewDetails }) {
  return (
    <div className="overflow-auto bg-white rounded shadow">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-slate-500">
            <th className="p-3">Session ID</th>
            <th>Events</th>
            <th>Device</th>
            <th>Browser</th>
            <th>Latest Visit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.sessionId} className="border-t hover:bg-slate-50">
              <td className="p-3 text-sm break-all">{s.sessionId}</td>
              <td>{s.eventCount}</td>
              <td>{s.device}</td>
              <td>{s.browser}</td>
              <td>{new Date(s.latestVisit).toLocaleString()}</td>
              <td>
                <button className="text-blue-600 text-sm" onClick={() => onViewDetails(s.sessionId)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
		</div>
	)
}
