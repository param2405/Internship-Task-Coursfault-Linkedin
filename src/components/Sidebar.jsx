import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 hidden md:block">
      <div className="space-y-4">
        <div className="text-sm text-slate-500">Filters</div>
        <div className="bg-white rounded p-3 shadow">(Filters)</div>
      </div>
    </aside>
  )
}
