import React from 'react'

export default function StatCard({ title, value, subtitle }) {
	return (
		<div className="card">
			<div className="flex items-center justify-between">
				<div>
					<div className="text-sm text-slate-500">{title}</div>
					<div className="text-2xl font-semibold">{value}</div>
					{subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
				</div>
			</div>
		</div>
	)
}
