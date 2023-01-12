import React, { useState, createContext } from 'react'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import RightMainBar from './RightMainBar/RightMainBar'
import './MainBar.scss'

export const DayContext = createContext();

export default function MainBar({showSide}) {

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
