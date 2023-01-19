import React, { useContext, useEffect } from 'react'
import MonthCell from './MonthCell'
import './MonthView.scss'

import { differenceInDays, startOfMonth, sub } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import { DayContext } from '../MainBar';
import { appointmentService } from '../../../apis/AppointmentAPI';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({ data, setData }) {

  const { day } = useContext(DayContext)

  useEffect(
    () => {
      appointmentService.getByMonth(day)
        .then(resultData => setData(resultData));
    },
    [day]
  )

  const startDate = startOfMonth(day)
  const endDate = endOfMonth(day)
  const numDays = differenceInDays(endDate, startDate) + 1
  const prefixDays = startDate.getDay()
  const suffixDays = 6 - endDate.getDay()
  // const suffixDays = 42 - prefixDays - numDays

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

        {/* {
          Array.from({ length: 42 }).map(
            (_, index) => {
              if (index < prefixDays) {
                return <MonthCell key={index} />
              }
              else if (index >= prefixDays && index < (42 - suffixDays)) {
                const date = index + 1 - prefixDays;
                const isCurrentDate = date === new Date().getDate();
                const isActive = date === day.getDate()
                return <MonthCell
                  key={date}
                  content={`${date}`}
                  isCurrentDate={isCurrentDate}
                  isActive={isActive}
                  monthEvents={data[index + 1]}
                />
              }
              // if (index >= (numDays+prefixDays) && index < suffixDays)
              else if (index >= (numDays+prefixDays) && index < suffixDays) {
                return <MonthCell key={index} />
              }
            }
          )
        } */}
        {
          Array.from({ length: prefixDays }).map(
            (_, index) => {
              return <MonthCell key={index} />
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
                monthEvents={data[index + 1]}
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
  )
}
