import React from 'react'
import { useMediaQuery } from 'react-responsive';

const DateOfBirthSelect = ({bYear,bMonth ,bDay ,handleRegisterChange,currentDate,months,years,dateError}) => {
    const view1 = useMediaQuery({
        query: "(min-width: 539px)",
      });

    const view2 = useMediaQuery({
        query: "(min-width: 850px)",
      });

      const view3 = useMediaQuery({
        query: "(min-width: 1170px)",
      });

  return (
    
    <div className="reg_grid" 
    style={{marginBottom:`${dateError && !view3 ? "90px":'0'}`}}
    >
    <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {currentDate.map((i ,presentDate)=>(
            <option value={presentDate} key={i}>{presentDate}</option>
        ))}
    </select>

    <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
      {months.map((newMonths ,i)=>(
      <option value={newMonths} key={i}> {newMonths} </option>
      ))}
    </select>

    <select name="bYear" value={bYear} onChange={handleRegisterChange}>

        {years.map((newyear , i) =>(
            <option value={newyear} key={i}>{newyear}</option>
        ))}
          
      
    </select>
    {dateError && (<div className={!view3 ? 'input_error':'input_error input_error_select_large'}> 
    <div className={!view3 ? "error_arrow_bottom":"error_arrow_left"}></div> 
    {dateError} 
    </div>
    )}
  </div>
  )
}

export default DateOfBirthSelect