import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

export const TopPagesBar = ({ data = [] }) => {
	return (
		<div className="card">
			<h3 className="text-lg font-medium mb-2">Top Pages</h3>
			<div style={{ width: '100%', height: 220 }}>
				<ResponsiveContainer>
					<BarChart data={data}>
						<XAxis dataKey="pageUrl" tick={{ fontSize: 12 }} />
						<YAxis />
						<Tooltip />
						<Bar dataKey="count" fill="#2563eb" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export const BrowserPie = ({ data = [] }) => {
	const COLORS = ['#2563eb', '#06b6d4', '#f97316', '#10b981', '#ef4444']
	return (
		<div className="card">
			<h3 className="text-lg font-medium mb-2">Browser Share</h3>
			<div style={{ width: '100%', height: 220 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie dataKey="count" data={data} label>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend />
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default TopPagesBar
