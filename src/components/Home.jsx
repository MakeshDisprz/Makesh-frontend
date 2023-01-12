import React, { useState } from 'react'
import MainBar from './MainBar/MainBar'
import TopBar from './TopBar/TopBar'

export default function 
Home() {

  const [showSide, setShowSide] = useState(false)

  return (
    <div>
      <TopBar showSide={showSide} setShowSide={setShowSide}/>
      <MainBar showSide={showSide} />
    </div>
  )
}
