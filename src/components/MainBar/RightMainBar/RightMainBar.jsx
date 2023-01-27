/** RightMainBar component */

import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DayView from './DayView'
import MonthView from './MonthView'
import NavBar from './NavBar'
import './RightMainBar.scss'

export default function RightMainBar({ data, setData }) {


  /** state to show and hide create modal */
  const [showModal, setShowModal] = useState(false)

  /** state to store the response from the post event */
  const [status, setStatus] = useState("")

  /** state to store appointments with conflict */
  const [conflict, setConflict] = useState([])


  return (
    <div className='rightbar-container'>
      <BrowserRouter>
        <NavBar
          data={data}
          setData={setData}
          showModal={showModal}
          setShowModal={setShowModal}
          status={status}
          setStatus={setStatus}
          conflict={conflict}
          setConflict={setConflict}
        />
        <div className='view-container'>
          <Routes>
            <Route path='/' element={<DayView data={data} setData={setData} conflict={conflict} setConflict={setConflict} setStatus={setStatus} />} />
            <Route path='/monthview' element={<MonthView data={data} setData={setData} conflict={conflict} setConflict={setConflict} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
