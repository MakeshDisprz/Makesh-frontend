/** LeftSideBar component */

import React, { useEffect } from 'react'
import MiniCalendar from './MiniCalendar'
import './LeftSideBar.scss'
import { appointmentService } from '../../../apis/AppointmentAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns';
import { useState } from 'react';

export default function LeftSideBar({ showSide, data }) {

    const[agenda, setAgenda] = useState([])


    useEffect(
        () => {
            appointmentService.getByDay(new Date())
                .then(resultData => setAgenda(resultData));
        },
        [data]
    )

    return (
        <div className={`leftsidebar-container ${!showSide && 'hide-sidebar'}`}>
            <div>
                <MiniCalendar />
            </div>
            <div className='agenda'>
                <div className='agenda-header'>Today's appointments</div>
                <div className='agenda-body'>
                    {
                        agenda &&
                        agenda.map(
                            (item) =>
                                <div className='today-events'>
                                    <div className='agenda-icon'><FontAwesomeIcon icon={faCircle} className='font-circle' /></div>
                                    <div className='agenda-title'>{item.title}</div>
                                    <div className='agenda-time'>{`(${format(new Date(item.startTime), 'hh:mm a')} - ${format(new Date(item.endTime), 'hh:mm a')})`}</div>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
