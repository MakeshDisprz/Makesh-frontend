import React, { useContext, useEffect, useState } from 'react'
import MonthCell from './MonthCell'
import './MonthView.scss'

import { add, differenceInDays, format, setDate, startOfMonth, sub } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import { DayContext } from '../MainBar';
import { appointmentService } from '../../../apis/AppointmentAPI';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({ data, setData }) {

  const [monthData, setMonthData] = useState([])
  const { day, setDay } = useContext(DayContext)

  useEffect(
    () => {
      appointmentService.getByMonth(day)
        .then(resultData => setData(resultData));
    },
    [day]
  )

  useEffect(
    () => {
      setMonthData(data)
    },
    [data]
  )

  const startDate = startOfMonth(day)
  const endDate = endOfMonth(day)
  const numDays = differenceInDays(endDate, startDate) + 1
  const prefixDays = startDate.getDay()
  const suffixDays = 6 - endDate.getDay()

  const prevStartDate = startOfMonth(sub(day, { months: 1 }))
  const prevEndDate = endOfMonth(sub(day, { months: 1 }))
  const prevDays = differenceInDays(prevEndDate, prevStartDate) + 1
  const prevPrefix = prevDays - prefixDays + 1

  return (
    <div className='monthview-container'>
      <div className='monthview-top'>

        {days.length > 0 &&
          days.map(
            (item, index) => <MonthCell className={'week-days'} content={item} key={index} />
          )
        }

      </div>
      <div className='monthview-bottom'>

        {
          Array.from({ length: prefixDays }).map(
            (_, index) => {
              return <MonthCell className={'prev-month'} key={index} content={`${format(sub(day, { months: 1 }), 'LLL')} ${index + prevPrefix}`} />
            }
          )
        }

        {
          Array.from({ length: numDays }).map(
            (_, index) => {
              const date = index + 1;
              const isCurrentDate = date === new Date().getDate();
              const isActive = date === day.getDate()
              return <MonthCell
                key={date}
                content={`${date}`}
                isCurrentDate={isCurrentDate}
                isActive={isActive}
                monthEvents={monthData[index + 1]}
              />
            }
          )
        }

        {
          Array.from({ length: suffixDays }).map(
            (_, index) => {
              const date = index + 1;
              return <MonthCell className={'next-month'} content={`${format(add(day, { months: 1 }), 'LLL')} ${date}`} key={index} />
            }
          )
        }

      </div>
    </div>
  )
}
