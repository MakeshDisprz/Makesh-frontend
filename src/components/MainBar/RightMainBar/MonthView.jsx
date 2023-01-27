/** MonthView component */

import React, { useContext, useEffect } from 'react'
import MonthCell from './MonthCell'
import './MonthView.scss'
import { differenceInDays, startOfMonth } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import { DayContext } from '../MainBar';
import { appointmentService } from '../../../apis/AppointmentAPI';
import { useState } from 'react';

/** array to store days of week */
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({ data, setData, conflict, setConflict }) {

  const { day } = useContext(DayContext)

  const[content, setContent] = useState("")

  /** useEffect to get the appointments for a month */
  useEffect(
    () => {
      appointmentService.getByMonth(day)
        .then(resultData => setData(resultData));
    },
    [day]
  )

  /** computes number of days in current month */
  const startDate = startOfMonth(day)
  const endDate = endOfMonth(day)
  const numDays = differenceInDays(endDate, startDate) + 1
  const prefixDays = startDate.getDay()
  const suffixDays = 42 - prefixDays - numDays

  return (
    <div className='month'>
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
                return <MonthCell key={index} />
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
                const monthEvents = data.filter(
                  (item) => new Date(item.startTime).getDate() === date
                )
                return <MonthCell
                  key={date}
                  content={`${date}`}
                  isCurrentDate={isCurrentDate}
                  isActive={isActive}
                  monthEvents={monthEvents}
                  setData={setData}
                  text={content}
                  setText={setContent}
                  conflict={conflict}
                  setConflict={setConflict}

                />
              }
            )
          }

          {
            Array.from({ length: suffixDays }).map(
              (_, index) => {
                const date = index + 1;
                return <MonthCell key={index} />
              }
            )
          }

        </div>
      </div>
    </div>
  )
}
