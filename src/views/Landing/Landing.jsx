import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

function Landing() {
    return (
        <div className="landing">
            <Link to="/dashboard" className="enter-app-button">Enter</Link>
        </div>
    )
}

export default Landing