/** MainBar component */

import React, { useState, createContext } from 'react'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import RightMainBar from './RightMainBar/RightMainBar'
import './MainBar.scss'

/** context to provide values to child components */
export const DayContext = createContext();

export default function MainBar({showSide}) {

    /** state to store current date */
    const [day, setDay] = useState(new Date())

    return (
        <DayContext.Provider value={{ day, setDay }}>
            <div className='mainbar-container'>
                <LeftSideBar showSide={showSide} />
                <RightMainBar />
            </div>
        </DayContext.Provider>
    )
}
