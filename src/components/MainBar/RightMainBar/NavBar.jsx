/** NavBar component */

import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAdd, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { addDays, subDays, format, add, sub } from 'date-fns'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.scss'
import { DayContext } from '../MainBar'
import CreateEvent from '../../Events/CreateEvent'
import PopUp from '../../Events/PopUp'

export default function NavBar({ data, setData, showModal, setShowModal, status, setStatus, conflict, setConflict }) {

    const { day, setDay } = useContext(DayContext)

    /** state to show and hide the response of post event */
    const [popup, setPopUp] = useState(false)

    /** variable to show current day based on the location */
    const DATE_FORMATS = {
        "/": `${format(day, 'MMM d, yyyy')}`,
        "/monthview": `${format(day, 'MMMM yyyy')}`
    }

    /** function to set current day based on location  */
    const LEFT_ARROW = {
        "/": () => setDay(subDays(day, 1)),
        "/monthview": () => setDay(sub(day, { months: 1 }))
    }

    /** function to set current day based on location  */
    const RIGHT_ARROW = {
        "/": () => setDay(addDays(day, 1)),
        "/monthview": () => setDay(add(day, { months: 1 }))
    }

    /** */
    const GET_DATA = {
        "/": true,
        "/monthview": false
    }

    /** */
    const VIEW = {
        "/": "Day",
        "/monthview": "Month"
    }

    /** variable to store the location */
    const { pathname } = useLocation();

    return (
        <div className='navbar'>
            <div className='navbar-container'>

                <div className='navbar-left'>
                    <div className='createicon-container' onClick={() => setShowModal(!showModal)}>
                        <FontAwesomeIcon icon={faAdd} className='create-icon' /><div className='create-text'>Create</div></div>
                    <div className='date-container'> {DATE_FORMATS[pathname]} </div>
                    <div className='buttons'>
                        <div className='button' onClick={LEFT_ARROW[pathname]}>
                            <FontAwesomeIcon icon={faAngleLeft} /></div>

                        <div className='today-button' onClick={() => setDay(new Date())}>Today</div>

                        <div className='button' onClick={RIGHT_ARROW[pathname]}>
                            <FontAwesomeIcon icon={faAngleRight} /></div>
                    </div>
                </div>

                <div className='navbar-right'>
                    <div className='viewbutton-container'>
                        <div className='viewbutton-option today-button' >
                            <div>{VIEW[pathname]}</div>
                            <div><FontAwesomeIcon icon={faAngleDown} /></div>
                        </div>
                        <div className='viewoption-values'>
                            <Link to='/' className='view-button' >Day</Link>
                            <Link to='/monthview' className='view-button' >Month</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* conditinally renders response modal for post event */}
            {
                popup &&
                <PopUp
                    popup={popup}
                    setPopUp={setPopUp}
                    content={status}
                    setData={setData}
                    conflict={conflict}
                    setConflict={setConflict}
                    GET_DATA={GET_DATA[pathname]}
                />
            }

            {/* conditionally renders create event modal */}
            {
                showModal &&
                <CreateEvent
                    data={data}
                    setData={setData}
                    Title=""
                    Start={new Date().setMinutes(new Date().getMinutes() + 2)}
                    End={new Date().setMinutes(new Date().getMinutes() + 30)}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    day={day}
                    popup={popup}
                    setPopUp={setPopUp}
                    setStatus={setStatus}
                    setConflict={setConflict}
                />
            }
        </div>
    )
}
