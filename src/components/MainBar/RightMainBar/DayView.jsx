/** DayView component */

import React, { useEffect, useContext, useState } from 'react'
import './DayView.scss'
import Appointment from '../../Events/Appointment'
import { timeGridId } from '../../../Data'
import { DayContext } from '../MainBar';
import { appointmentService } from '../../../apis/AppointmentAPI';

export default function DayView({ data, setData, conflict, setConflict, setStatus }) {

    /** using the day context */
    const { day } = useContext(DayContext)

    /** state to store the response message */
    const [content, setContent] = useState("")

    const [create, setCreate] = useState(false)

    /** useEffect to get the appointments for a day */
    useEffect(
        () => {
            setData([])
            appointmentService.getByDay(day)
                .then(resultData => setData(resultData));
        },
        [day]
    )

    return (

        <div className='dayview-container'>

            <div className='dayview-left'>
                {timeGridId.length > 0 &&
                    timeGridId.map(
                        (item) => <div className='time-container' key={item.id}><span className='time-value' style={{ top: `${item.top}px` }}>{item.time}</span></div>
                    )
                }
            </div>

            <div className='dayview-right'>
                <div>
                    {timeGridId.length > 0 &&
                        timeGridId.map(
                            (item) =>
                                <div className='time-grid' key={item.id} style={{ position: "relative" }} onClick={() => setCreate(!create)}>
                                    {
                                        data &&
                                        data.map(
                                            (it, index) =>
                                                (new Date(it.startTime).getHours() === item.id) &&
                                                <Appointment
                                                    appointment={it}
                                                    data={data}
                                                    setData={setData}
                                                    key={index}
                                                    content={content}
                                                    setContent={setContent}
                                                    conflict={conflict}
                                                    setConflict={setConflict}
                                                />
                                        )
                                    }
                                </div>
                        )
                    }
                </div>
                
            </div>
        </div>
    )
}
