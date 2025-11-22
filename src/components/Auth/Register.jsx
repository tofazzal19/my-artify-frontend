import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { AuthContext } from '../../context/AuthContext'
import { showAlert } from '../../utils/helpers'

const Register = () => {
  const { showPage, showLoading } = useContext(AppContext)
  const { register } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      showAlert('Please fill in all required fields', 'error')
      return
    }

    if (formData.password.length < 6) {
      showAlert('Password must be at least 6 characters', 'error')
      return
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      showAlert('Password must contain both uppercase and lowercase letters', 'error')
      return
    }

    showLoading(true)
    const result = await register(formData)
    showLoading(false)

    if (result.success) {
      showAlert('Registration successful!', 'success')
      showPage('home')
    } else {
      showAlert(result.message || 'Registration failed', 'error')
    }
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">Join Artify</h2>
        
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 shadow-lg dark:bg-gray-700">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="register-name">Full Name</label>
            <input 
              type="text" 
              id="register-name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="register-email">Email</label>
            <input 
              type="email" 
              id="register-email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="register-photo">Photo URL (optional)</label>
            <input 
              type="url" 
              id="register-photo" 
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="register-password">Password</label>
            <input 
              type="password" 
              id="register-password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required 
              autoComplete="new-password"
            />
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              Password must be at least 6 characters with uppercase and lowercase letters
            </p>
          </div>
          
          <div className="mb-6">
            <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Create Account
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <a href="#" className="text-purple-600 hover:underline dark:text-purple-400" onClick={() => showPage('login')}>
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register