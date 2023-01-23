import React from 'react'
import './MonthCell.scss'
import MonthEvent from '../../Events/MonthEvent'

export default function MonthCell({className, isCurrentDate, isActive, content, monthEvents}) {
    return (
        <div
            className={`${className} month-cell ${isCurrentDate ? 'today' : 'not-today'}`}
            id={`${isActive && !isCurrentDate ? 'active' : 'inactive'}`}
        >
            <div style={{padding:"4px"}}>{content}</div>
            <div className='eventname-container'>
                {
                    monthEvents != null && monthEvents.length > 0 &&
                    monthEvents.map(
                        (item, index) => <MonthEvent monthevent={item} key={index} />
                    )
                    
                }
            </div>
        </div>
    )
}
