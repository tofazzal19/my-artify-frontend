import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const LoadingSpinner = () => {
  const { loading } = useContext(AppContext)

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 dark:bg-gray-900 dark:bg-opacity-80">
      <div className="loading"></div>
      <span className="ml-2 text-gray-700 dark:text-white">Loading...</span>
    </div>
  )
}

export default LoadingSpinner