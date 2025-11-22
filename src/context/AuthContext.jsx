import React, { createContext, useState, useEffect } from 'react'
import { loginUser, registerUser, verifyToken, logoutUser } from '../utils/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('artify_token')
    if (savedToken) {
      setToken(savedToken)
      verifyAuth(savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyAuth = async (token) => {
    try {
      const isValid = await verifyToken(token)
      if (isValid) {
        const userData = JSON.parse(localStorage.getItem('artify_user'))
        if (userData) {
          setUser(userData)
        }
      } else {
        // Token is invalid, clear storage
        localStorage.removeItem('artify_token')
        localStorage.removeItem('artify_user')
      }
      setLoading(false)
    } catch (error) {
      console.error('Auth verification failed:', error)
      logout()
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password)
      if (response.success) {
        setUser(response.user)
        setToken(response.token)
        localStorage.setItem('artify_token', response.token)
        localStorage.setItem('artify_user', JSON.stringify(response.user))
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'Login failed' }
    }
  }

  const register = async (userData) => {
    try {
      const response = await registerUser(userData)
      if (response.success) {
        setUser(response.user)
        setToken(response.token)
        localStorage.setItem('artify_token', response.token)
        localStorage.setItem('artify_user', JSON.stringify(response.user))
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'Registration failed' }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('artify_token')
    localStorage.removeItem('artify_user')
    logoutUser() // Client-side cleanup
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}