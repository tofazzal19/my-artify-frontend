import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home')
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [artworkModal, setArtworkModal] = useState(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const showPage = (pageName) => {
    // Redirect to login if trying to access protected pages
    if (['add-artwork', 'my-gallery', 'my-favorites'].includes(pageName) && !user) {
      setCurrentPage('login')
    } else {
      setCurrentPage(pageName)
    }
    window.scrollTo(0, 0)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const showLoading = (show) => {
    setLoading(show)
  }

  const openArtworkModal = (artwork) => {
    setArtworkModal(artwork)
  }

  const closeArtworkModal = () => {
    setArtworkModal(null)
  }

  const closeMobileMenu = () => {
    // This function will be implemented in MobileMenu component
    console.log('Close mobile menu')
  }

  const value = {
    currentPage,
    loading,
    darkMode,
    artworkModal,
    showPage,
    toggleDarkMode,
    showLoading,
    openArtworkModal,
    closeArtworkModal,
    closeMobileMenu
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}