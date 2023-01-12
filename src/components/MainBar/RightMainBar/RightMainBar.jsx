import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DayView from './DayView'
import MonthView from './MonthView'
import NavBar from './NavBar'
import './RightMainBar.scss'

export default function RightMainBar() {

  const [data, setData] = useState([])

  return (
    <BrowserRouter>
      <NavBar data={data} setData={setData} />
      <Routes>
        <Route path='/' element={<DayView data={data} setData={setData} />} />
        <Route path='/monthview' element={<MonthView data={data} setData={setData} />} />
      </Routes>
    </BrowserRouter>
  )
}
