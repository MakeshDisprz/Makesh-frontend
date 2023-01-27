/** Conflict component */

import { format } from 'date-fns'
import React from 'react'
import './Conflict.scss'

export default function Conflict({ title, startTime, endTime }) {
    return (
        <div className='conflict-container'>

            <div className='conflict-field'>
                <div className='conflict-text'>Title:</div>
                <div>{title}</div>
            </div>
            <div className='conflict-field'>
                <div className='conflict-text'>Date:</div>
                <div>{format(new Date(startTime), 'do MMM yyyy')}</div>
            </div>
            <div className='conflict-field'>
                <div className='conflict-text'>Time:</div>
                <div>{format(new Date(startTime), 'hh:mm a')} - {format(new Date(endTime), 'hh:mm a')}</div>
            </div>

        </div>
    )
}
