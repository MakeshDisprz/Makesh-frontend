/** Cell component */

import React from 'react'
import './Cell.scss'

export default function Cell( {className, isCurrentDate, isActive, onClick, content}) {
    return (
        <div
            className={`${className} cell-container ${isCurrentDate ? 'today' : 'not-today'}`}
            onClick={onClick}
            id = {`${isActive && !isCurrentDate ? 'active' : 'inactive'}`}
        >
            {content}
        </div>
    )
}
