import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { AuthContext } from '../../context/AuthContext'
import { mockSocialLogin } from '../../utils/api'
import { showAlert } from '../../utils/helpers'

const Login = () => {
  const { showPage, showLoading } = useContext(AppContext)
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      showAlert('Please fill in all fields', 'error')
      return
    }

    showLoading(true)
    const result = await login(formData.email, formData.password)
    showLoading(false)

    if (result.success) {
      showAlert('Login successful!', 'success')
      showPage('home')
    } else {
      showAlert(result.message || 'Login failed', 'error')
    }
  }

  const handleSocialLogin = async (provider) => {
    showLoading(true)
    try {
      const response = await mockSocialLogin(provider)
      if (response.success) {
        showAlert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful!`, 'success')
        showPage('home')
      } else {
        showAlert(response.message || 'Login failed', 'error')
      }
    } catch (error) {
      showAlert('Social login failed. Please try email/password login.', 'error')
    } finally {
      showLoading(false)
    }
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">Login to Artify</h2>
        
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 shadow-lg dark:bg-gray-700">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="login-email">Email</label>
            <input 
              type="email" 
              id="login-email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="login-password">Password</label>
            <input 
              type="password" 
              id="login-password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required 
              autoComplete="current-password"
            />
          </div>
          
          <div className="mb-6">
            <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Login
            </button>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-purple-600 hover:underline dark:text-purple-400" onClick={() => showPage('register')}>
                Register here
              </a>
            </p>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              type="button" 
              onClick={() => handleSocialLogin('google')}
              className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <i className="fab fa-google text-red-500 mr-3"></i>
              <span className="dark:text-white">Continue with Google</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login