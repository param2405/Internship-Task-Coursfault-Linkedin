import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<header className="w-full border-b bg-white">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<Link to="/" className="text-2xl font-semibold text-blue-600">CasualFunel</Link>
				<nav className="space-x-4">
					<Link to="/" className="text-sm text-slate-600">Dashboard</Link>
					<Link to="/sessions" className="text-sm text-slate-600">Sessions</Link>
					<Link to="/heatmap" className="text-sm text-slate-600">Heatmap</Link>
				</nav>
			</div>
		</header>
	)
}
