import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchResult() {
    const navigate = useNavigate()
    const location = useLocation()
    const { trains } = location.state || {};
    console.log(trains)
    return (
        <div>SearchResult</div>
    )
}

export default SearchResult