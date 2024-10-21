import React, { useEffect, useRef, useState } from 'react'
import Return from '../../svg/return'
import Search from '../../svg/search'
import UseclickOutside from '../../helpers/clickOutside';
import SearchUser from '../../functions/SearchUser';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddToSearchHistory from '../../functions/AddToSearchHistory';
import GetSearchHistory from '../../functions/GetSearchHistory';


const SearchMenu = ({color ,setshowSearchMenu}) => {
const ref=useRef();
const input=useRef();
const [iconVisible ,seticonVisible] = useState(true)
const [searchTerm, setSearchTerm] = useState("");
const [results, setResults] = useState([]);
const user =useSelector((state) =>state.user);
const [searchHistory, setSearchHistory] = useState([]);

UseclickOutside(ref,()=>{
        setshowSearchMenu(false)
})
 
useEffect(()=>{
input.current.focus()
},[])

useEffect(() =>{
    getHistory()
},[])

const getHistory = async()=>{
  const res = await GetSearchHistory(user?.token)
  setSearchHistory(res);
}


const searchHandler =async() =>{
  if(searchTerm === ''){
    setResults('')
  }else{
    const res =await SearchUser(searchTerm , user?.token)
    setResults(res)
  }
}

const addToSearchHistoryHandler =async(searchUser) =>{
  
  const res = await AddToSearchHistory(searchUser , user?.token);
           getHistory()
  
 
}

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
                    onKeyUp={searchHandler}
                    value={searchTerm} onChange={(e) =>setSearchTerm(e.target.value)}
                    />
                     
            </div>

        </div>
        {results == "" && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory &&
          results == "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i className="exit_icon"></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}


export default SearchMenu