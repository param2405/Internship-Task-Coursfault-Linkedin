import React from 'react'

export default function Filters({ onChange = () => {} }) {
	return (
		<div className="card">
			<div className="space-y-2">
				<input placeholder="URL" className="w-full border rounded px-2 py-1" onChange={e => onChange({ url: e.target.value })} />
				<input type="date" className="w-full border rounded px-2 py-1" onChange={e => onChange({ date: e.target.value })} />
				<select className="w-full border rounded px-2 py-1" onChange={e => onChange({ eventType: e.target.value })}>
					<option value="">All</option>
					<option value="click">Click</option>
					<option value="pageview">Pageview</option>
				</select>
			</div>
		</div>
	)
}
