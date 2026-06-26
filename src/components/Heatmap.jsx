import React from 'react'

// clicks: [{ clickData: { x: percentX, y: percentY } }]
export default function Heatmap({ clicks = [] }) {
  // cluster by rounding to 2% grid
  const map = new Map()
  clicks.forEach(c => {
    const x = Math.round(c.clickData.x * 2) / 2
    const y = Math.round(c.clickData.y * 2) / 2
    const key = `${x}:${y}`
    map.set(key, (map.get(key) || 0) + 1)
  })

  const points = Array.from(map.entries()).map(([k, count]) => {
    const [x, y] = k.split(':').map(Number)
    return { x, y, count }
  })

  const max = points.reduce((m, p) => Math.max(m, p.count), 0) || 1

  const colorFor = (count) => {
    const t = count / max
    if (t > 0.66) return 'rgba(239,68,68,0.9)'
    if (t > 0.33) return 'rgba(249,115,22,0.85)'
    return 'rgba(34,197,94,0.8)'
  }

  return (
    <div className="relative bg-white rounded shadow overflow-hidden" style={{ minHeight: 600 }}>
      {points.map((p, i) => (
        <div key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: 'translate(-50%,-50%)',
            width: Math.max(8, p.count * 6),
            height: Math.max(8, p.count * 6),
            borderRadius: '999px',
            background: colorFor(p.count),
            pointerEvents: 'none',
            opacity: 0.9
          }}
        />
      ))}
    </div>
  )
}
