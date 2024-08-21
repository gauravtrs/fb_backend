import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const NotLoggedInRoutes = () => {
    const  user  = useSelector((state) =>state.user);

  return (
    <div>{user ? <Navigate to={'/'}/> :<Outlet/>}</div>
  )
}

export default NotLoggedInRoutes