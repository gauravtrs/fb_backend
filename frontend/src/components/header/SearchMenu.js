import React, { useEffect, useRef, useState } from 'react'
import Return from '../../svg/return'
import Search from '../../svg/search'
import UseclickOutside from '../../helpers/clickOutside';


const SearchMenu = ({color ,setshowSearchMenu}) => {
const ref=useRef();
const input=useRef();
const [iconVisible ,seticonVisible] = useState(true)

UseclickOutside(ref,()=>{
        setshowSearchMenu(false)
})

useEffect(()=>{
input.current.focus()
},[])

  return (
    < div className='header_left search_area scrollbar' ref={ref}>
        <div className='search_wrap'>
            <div className='header_logo'>
                <div className='circle_hover1' onClick={()=>setshowSearchMenu(false)}>
                    
                    <Return color={color}/>
                </div>
                </div> 
                  <div className='search' onClick={()=>{
                    input.current.focus()
                  }}>
                    {iconVisible && (<div>
                        <Search color={color}/>
                    </div>)}
                    

                    <input type='text' placeholder='Search Facebook' ref={input} onFocus={() =>seticonVisible(false)} 
                    onBlur={()=>{seticonVisible(true)}}
                    />
                     
            </div>

        </div>
        <div className='search_history_header'>
            <span>Recent searches</span>
            <a href='//'>Edit</a>
        </div>
        <div className='search_history'></div>
        <div className='search_results_scrollbar'></div>
    </div>



);
}

export default SearchMenu