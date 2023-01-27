/** MiniCalendar component */

import { add, differenceInDays, format, setDate, startOfMonth, sub } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import React, { useContext } from 'react'
import './MiniCalendar.scss'
import Cell from './Cell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { DayContext } from '../MainBar';

/** array to store days of week */
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MiniCalendar() {

  const { day, setDay } = useContext(DayContext);

  /** computes number of days in current month */
  const startDate = startOfMonth(day)
  const endDate = endOfMonth(day)
  const numDays = differenceInDays(endDate, startDate) + 1
  const prefixDays = startDate.getDay()

  /** functions to change month and year */
  const prevMonth = () => setDay(sub(day, { months: 1 }))
  const nextMonth = () => setDay(add(day, { months: 1 }))
  const prevYear = () => setDay(sub(day, { years: 1 }))
  const nextYear = () => setDay(add(day, { years: 1 }))
  
  /** handles date change */
  const handleDateClick = (index) => {
    const date = setDate(day, index);
    setDay(date);
  }

  return (

    <div className='calendar-container'>
      <div className='container-top'>
        <Cell content={<FontAwesomeIcon icon={faAnglesLeft} />} onClick={prevYear} />
        <Cell content={<FontAwesomeIcon icon={faAngleLeft} />} onClick={prevMonth} />
        <Cell className={'date-cell'} content={`${format(day, "LLL yyyy")}`} />
        <Cell content={<FontAwesomeIcon icon={faAngleRight} />} onClick={nextMonth} />
        <Cell content={<FontAwesomeIcon icon={faAnglesRight} />} onClick={nextYear} />

        {days.length > 0 &&
          days.map(
            (item, index) => <Cell content={item} key={index} />
          )
        }

        {/* renders days in previous month */}
        {
          Array.from({ length: prefixDays }).map(
            (_, index) => {
              return <Cell key={index}/>
            }
          )
        }

        {/* renders days in current month */}
        {
          Array.from({ length: numDays }).map(
            (_, index) => {
              const date = index + 1;
              const isCurrentDate = date === new Date().getDate();
              const isActive = date === day.getDate()
              return <Cell
                key={date}
                content={`${date}`}
                onClick={() => handleDateClick(date)}
                isCurrentDate={isCurrentDate}
                isActive={isActive}
              />
            }
          )
        }

      </div>
    </div>

  )
}
