import React, { useState, useEffect, useContext } from 'react'
import './DayView.scss'
import Appointment from '../../Events/Appointment'
import { timeGridId } from '../../../Data'
import { DayContext } from '../MainBar';
import { appointmentService } from '../../../apis/AppointmentAPI';

export default function DayView({ data, setData }) {

    const { day } = useContext(DayContext)

    const [dayData, setDayData] = useState([])

    useEffect(
        () => {
                appointmentService.getByDay(day)
                .then(resultdata => setData(resultdata));
        },
        [day]
    )

    useEffect(
        () => {
            setDayData(data)
        },
        [data]
    )

    return (

        <div className='dayview-container'>

            <div className='dayview-left'>

                {timeGridId.length >0 &&
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
                                <div className='time-grid' key={item.id} style={{ position: "relative" }}>
                                    {
                                        (dayData[item.id] != null) && (dayData[item.id].length > 0) &&
                                        dayData[item.id].map(
                                            (item, index) => <Appointment appointment={item} setData={setData} key={index} />
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
