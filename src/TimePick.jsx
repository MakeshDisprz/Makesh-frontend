import { format } from 'date-fns'
import React, { useState } from 'react'

export default function TimePick() {
    const [tim, setTim] = useState(false)
    const [min, setMin] = useState(false)
    const [val, setVal] = useState(0)
    const [minVal, setMinVal] = useState(0)
    const [dat, setDat] = useState((new Date()).toISOString().split('T')[0])
    // const [dat, setDat] = useState(new Date())
    console.log(dat);

    const handleClick = (e) => {
        setVal(e + 1)
        setTim(!tim)
    }

    const handleMin = (e) => {
        setMinVal(e + 1)
        setMin(!min)
    }

    const handleChange = (e) => {
        setVal(e.target.value)
        // setTim(!tim)
    }

    const handleSubmit = () => {
        // console.log(`${dat.replace(/-/g,",")},${val},${minVal}`);
        console.log(new Date(dat.getFullYear(),dat.getMonth(),dat.getDate(),val,minVal));
        console.log(new Date(2023,1,20,11,30));
    }

    const handleDate = (e) => {
        setDat(e.target.value)
    }
    console.log(new Date());

    return (
        <div style={{ display: "flex", columnGap: "50px" }}>
            <div>
                <input type="date" value={dat} onChange={(e) => handleDate(e)} />
            </div>
            <div>
                {/* <form onSubmit={(e) => e.preventDefault()}>
                    <input type="number" min="1" max="12" onClick={() => setTim(!tim)} value={val} onChange={(e) => handleChange(e)} />
                </form> */}
                <div onClick={() => setTim(!tim)}>{val}</div>
                {
                    tim &&
                    <div style={{ height: "100px", backgroundColor: "red", overflow: "scroll" }}>

                        {Array.from({ length: 12 }).map(
                            (_, index) => {
                                return <div onClick={() => handleClick(index)}>{index + 1}</div>
                            }
                        )
                        }
                    </div>

                }
            </div>
            <div>
                <div onClick={() => setMin(!min)}>{minVal}</div>
                {
                    min &&
                    <div style={{ height: "100px", backgroundColor: "red", overflow: "scroll" }}>

                        {
                            Array.from({ length: 60 }).map(
                                (_, index) => {
                                    return <div onClick={() => handleMin(index)}>{index + 1}</div>
                                }
                            )
                        }
                    </div>
                }
            </div>

            <div onClick={handleSubmit}>save</div>
        </div>
    )
}

// const prevStartDate = startOfMonth(sub(day, { months: 1 }))
// const prevEndDate = endOfMonth(sub(day, { months: 1 }))
// const prevDays = differenceInDays(prevEndDate, prevStartDate) + 1
// const prevPrefix = prevDays - prefixDays + 1
// const suffixDays = 6 - endDate.getDay()