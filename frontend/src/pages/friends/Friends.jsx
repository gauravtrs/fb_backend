import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Header from "../../components/header/Header";
import GetFriendPageInfo from "../../functions/GetFriendPageInfo";
import { useEffect } from "react";
import { friendSuccess } from "../../reduxToolkit/GetFriendSlice";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";
export default function Friends() {
  const { user } = useSelector((state) => ({ ...state }));
  const {friends} =useSelector((state) =>state.friends)
  const { type } = useParams();

  console.log('all find friends--' ,friends)




  const dispatch = useDispatch();


  useEffect(()=>{
        getData()
  },[])

    const getData = async()=>{

        const res = await GetFriendPageInfo(user?.token)
        
        if(res.status === 'ok'){
          dispatch(friendSuccess(res.data));
        }

        
        
    }
    

    
    

    return (
      <>
        <Header page="friends" />
        <div className="friends">
          <div className="friends_left">
            <div className="friends_left_header">
              <h3>Friends</h3>
              <div className="small_circle">
                <i className="settings_filled_icon"></i>
              </div>
            </div>
            <div className="friends_left_wrap">
              <Link
                to="/friends"
                className={`mmenu_item hover3 ${
                  type === undefined && "active_friends"
                }`}
              >
                <div className="small_circle">
                  <i className="friends_home_icon "></i>
                </div>
                <span>Home</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </Link>
              <Link
                to="/friends/requests"
                className={`mmenu_item hover3 ${
                  type === "requests" && "active_friends"
                }`}
              >
                <div className="small_circle">
                  <i className="friends_requests_icon"></i>
                </div>
                <span>Friend Requests</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </Link>
              <Link
                to="/friends/sent"
                className={`mmenu_item hover3 ${
                  type === "sent" && "active_friends"
                }`}
              >
                <div className="small_circle">
                  <i className="friends_requests_icon"></i>
                </div>
                <span>Sent Requests</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </Link>
              <div className="mmenu_item hover3">
                <div className="small_circle">
                  <i className="friends_suggestions_icon"></i>
                </div>
                <span>Suggestions</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </div>
              <Link
                to="/friends/all"
                className={`mmenu_item hover3 ${
                  type === "all" && "active_friends"
                }`}
              >
                <div className="small_circle">
                  <i className="all_friends_icon"></i>
                </div>
                <span>All Friends</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </Link>
              <div className="mmenu_item hover3">
                <div className="small_circle">
                  <i className="birthdays_icon"></i>
                </div>
                <span>Birthdays</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </div>
              <Link to={'/friends/findfriends'}> 
              <div className={`mmenu_item hover3 ${type ==="findfriends" && "active_friends"}`}>
                <div className="small_circle">
                  <i className="all_friends_icon"></i>
                </div>
                <span>Find friends</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </div>
              </Link>
            </div>
          </div>
          <div className="friends_right">
            {(type === undefined || type === "requests") && (
              <div className="friends_right_wrap">
                <div className="friends_left_header">
                  <h3>Friend Requests</h3>
                  {type === undefined && (
                    <Link to="/friends/requests" className="see_link hover3">
                      See all
                    </Link>
                  )}
                </div>
                <div className="flex_wrap">
                  {friends.requests && friends.requests.length ===0 ? "No received request" : friends.requests &&
                    friends.requests.map((user) => (
                      <Card
                        userr={user}
                        key={user._id}
                        type="request"
                        getData={getData}
                      />
                    ))}
                </div>
              </div>
            )}
            {(type === undefined || type === "sent") && (
              <div className="friends_right_wrap">
                <div className="friends_left_header">
                  <h3>Sent Requests</h3>
                  {type === undefined && (
                    <Link to="/friends/sent" className="see_link hover3">
                      See all
                    </Link>
                  )}
                </div>
                <div className="flex_wrap">
                  {friends.sendRequests && friends.sendRequests.length ===0 ? 'No records  found' : friends.sendRequests &&
                    friends.sendRequests.map((user) => (
                      <Card
                        userr={user}
                        key={user._id}
                        type="sent"
                        getData={getData}
                      />
                    ))}
                </div>
              </div>
            )}
            {(type === undefined || type === "all") && (
              <div className="friends_right_wrap">
                <div className="friends_left_header">
                  <h3>Friends</h3>
                  {type === undefined && (
                    <Link to="/friends/all" className="see_link hover3">
                      See all
                    </Link>
                  )}
                </div>
                <div className="flex_wrap">
                  {friends.friends && friends.friends.length ===0 ? "No friends found" : friends.friends &&
                    friends.friends.map((user) => (
                      <Card
                        userr={user}
                        key={user._id}
                        type="friends"
                        getData={getData}
                      />
                    ))}
                </div>
              </div>
            )}

          {(type === undefined || type === "findfriends") && (
              <div className="friends_right_wrap">
                <div className="friends_left_header">
                  <h3>Find friends</h3>
                  {type === undefined && (
                    <Link to="/friends/findfriends" className="see_link hover3">
                      See all
                    </Link>
                  )}
                </div>
                <div className="flex_wrap">
                  {friends.findfriends && friends.findfriends.length === 0 ? "There is no new friend" : friends.findfriends&&
                    friends.findfriends
                    .map((user) => (
                      <Card
                        userr={user}
                        key={user._id}
                        type="findfriends"
                        getData={getData}
                      />
                    ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </>
    );
    
}
