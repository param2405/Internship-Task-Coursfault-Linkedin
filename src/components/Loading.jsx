import React from 'react'

export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-slate-500">{text}</div>
    </div>
  )
}
