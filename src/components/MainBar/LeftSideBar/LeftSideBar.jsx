/** LeftSideBar component */

import React from 'react'
import MiniCalendar from './MiniCalendar'
import './LeftSideBar.scss'

export default function LeftSideBar({showSide}) {
    return (
        <div className={`leftsidebar-container ${!showSide && 'hide-sidebar'}`}>
            <MiniCalendar />
        </div>
    )
}
