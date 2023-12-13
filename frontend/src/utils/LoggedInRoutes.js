/*
  Create a protected route that only logged in users can access.
  If not logged in, redirect to login page.
*/

import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from 'context/AuthContext'

const LoggedInRoutes = ({ request }) => {
  let {user} = useContext(AuthContext)
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default LoggedInRoutes