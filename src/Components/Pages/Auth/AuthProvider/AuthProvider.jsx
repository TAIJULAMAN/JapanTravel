/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const AuthContext=createContext(null)


const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null)
    const [loading, setLoading]=useState(true)



const authInfo ={
    user,
    loading
}
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider