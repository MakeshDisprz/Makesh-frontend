/** Conflict component */

import { format } from 'date-fns'
import React from 'react'
import './Conflict.scss'

export default function Conflict({ title, startTime, endTime }) {
    return (
        <div className='conflict-container'>
            <div>{`Title: ${title}`}</div>
            <div>{`Date: ${format(new Date(startTime), 'MMM do yyyy')}`}</div>
            <div>{`Time: ${format(new Date(startTime), 'hh:mm a')} - ${format(new Date(endTime), 'hh:mm a')}`}</div>
        </div>
    )
}
