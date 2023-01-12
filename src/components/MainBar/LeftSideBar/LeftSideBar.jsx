import React from 'react'
import MiniCalendar from './MiniCalendar'
import './LeftSideBar.scss'

export default function LeftSideBar({showSide}) {
    return (
        <div className='leftsidebar-container' id={`${showSide ? 'display-sidebar' : 'hide-sidebar'}`}>
            <MiniCalendar />
        </div>
    )
}
