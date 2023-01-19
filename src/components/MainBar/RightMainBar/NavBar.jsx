import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAdd } from '@fortawesome/free-solid-svg-icons'
import { addDays, subDays, format, add, sub } from 'date-fns'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.scss'
import { DayContext } from '../MainBar'
import CreateEvent from '../../Events/CreateEvent'
import PopUp from '../../Events/PopUp'
import { appointmentService } from '../../../apis/AppointmentAPI'

export default function NavBar({ data, setData }) {

    const { day, setDay } = useContext(DayContext)
    const [showModal, setShowModal] = useState(false)
    const [popup, setPopUp] = useState(false)
    const [status, setStatus] = useState("")

    const DATE_FORMATS = {
        "/": `${format(day, 'MMMM d, yyyy')}`,
        "/monthview": `${format(day, 'MMMM yyyy')}`
    }

    const LEFT_ARROW = {
        "/": () => setDay(subDays(day, 1)),
        "/monthview": () => setDay(sub(day, { months: 1 }))
    }

    const RIGHT_ARROW = {
        "/": () => setDay(addDays(day, 1)),
        "/monthview": () => setDay(add(day, { months: 1 }))
    }

    const GET_DATA = {
        "/": () => appointmentService.getByDay(day)
            .then(resultdata => setData(resultdata)),

        "/monthview": () => appointmentService.getByMonth(day)
            .then(resultdata => setData(resultdata))
    }

    const { pathname } = useLocation();

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <div className='navbar-left'>
                    <div className='createicon-container' onClick={() => setShowModal(!showModal)}>
                        <FontAwesomeIcon icon={faAdd} className='create-icon' /></div>

                    <div className='date-container'> {DATE_FORMATS[pathname]} </div>

                    <div className='viewbutton-container'>
                        <Link to='/' className='view-button'>Day</Link>
                        <Link to='/monthview' className='view-button'>Month</Link>
                    </div>
                </div>
                <div className='navbar-right'>
                    <div className='button' onClick={LEFT_ARROW[pathname]}>
                        <FontAwesomeIcon icon={faAngleLeft} /></div>

                    <div className='today-button' onClick={() => setDay(new Date())}>Today</div>

                    <div className='button' onClick={RIGHT_ARROW[pathname]}>
                        <FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
                {
                    popup &&
                    <PopUp popup={popup} setPopUp={setPopUp} content={status} setData={setData} />
                }
            </div>

            {
                showModal &&
                <CreateEvent showModal={showModal} setShowModal={setShowModal} day={day} setDay={setDay} GET_DATA={GET_DATA} pathname={pathname} popup={popup} setPopUp={setPopUp} setStatus={setStatus} />
            }

        </div>
    )
}
