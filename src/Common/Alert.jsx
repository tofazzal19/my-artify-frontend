import React from 'react'

const Alert = ({ message, type = 'info', onClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'error':
        return 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      case 'warning':
        return 'bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle'
      case 'error':
        return 'fas fa-exclamation-circle'
      case 'warning':
        return 'fas fa-exclamation-triangle'
      case 'info':
      default:
        return 'fas fa-info-circle'
    }
  }

  return (
    <div className={`fixed top-4 right-4 z-50 border rounded-lg p-4 max-w-sm ${getAlertStyles()} shadow-lg`}>
      <div className="flex items-start">
        <i className={`${getIcon()} mt-0.5 mr-3`}></i>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert