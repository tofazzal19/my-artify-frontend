import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const { currentPage, showPage, toggleDarkMode, darkMode } = useContext(AppContext)
  const { user, logout } = useContext(AuthContext)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = () => {
    logout()
    showPage('home')
    setShowUserMenu(false)
  }

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-40 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden p-2 dark:text-white"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => showPage('home')}
            >
              <i className="fas fa-palette text-purple-600 text-2xl"></i>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Artify</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a 
              href="#" 
              className={`font-medium ${currentPage === 'home' ? 'text-purple-600' : 'text-gray-800 hover:text-purple-600'} dark:text-gray-200 dark:hover:text-purple-400`}
              onClick={() => showPage('home')}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`font-medium ${currentPage === 'explore' ? 'text-purple-600' : 'text-gray-800 hover:text-purple-600'} dark:text-gray-200 dark:hover:text-purple-400`}
              onClick={() => showPage('explore')}
            >
              Explore Artworks
            </a>
            {user && (
              <>
                <a 
                  href="#" 
                  className={`font-medium ${currentPage === 'add-artwork' ? 'text-purple-600' : 'text-gray-800 hover:text-purple-600'} dark:text-gray-200 dark:hover:text-purple-400`}
                  onClick={() => showPage('add-artwork')}
                >
                  Add Artwork
                </a>
                <a 
                  href="#" 
                  className={`font-medium ${currentPage === 'my-gallery' ? 'text-purple-600' : 'text-gray-800 hover:text-purple-600'} dark:text-gray-200 dark:hover:text-purple-400`}
                  onClick={() => showPage('my-gallery')}
                >
                  My Gallery
                </a>
                <a 
                  href="#" 
                  className={`font-medium ${currentPage === 'my-favorites' ? 'text-purple-600' : 'text-gray-800 hover:text-purple-600'} dark:text-gray-200 dark:hover:text-purple-400`}
                  onClick={() => showPage('my-favorites')}
                >
                  My Favorites
                </a>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="hidden md:flex space-x-2">
                <button 
                  className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900"
                  onClick={() => showPage('login')}
                >
                  Login
                </button>
                <button 
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition dark:bg-purple-500 dark:hover:bg-purple-400"
                  onClick={() => showPage('register')}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 relative">
                <div 
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img 
                    src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                  />
                  <span className="text-gray-800 font-medium dark:text-white">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                
                {showUserMenu && (
                  <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50 dark:bg-gray-700">
                    <p className="text-gray-800 font-medium mb-2 dark:text-white">{user.name}</p>
                    <button 
                      className="w-full text-left text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <button 
              className="p-2 rounded-lg bg-gray-800 text-white dark:bg-gray-600"
              onClick={toggleDarkMode}
            >
              <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu fixed inset-0 bg-white z-50 dark:bg-gray-800 md:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <i className="fas fa-palette text-purple-600 text-2xl"></i>
                <span className="text-xl font-bold text-gray-800 dark:text-white">Artify</span>
              </div>
              <button 
                className="p-2 dark:text-white"
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <a 
                href="#" 
                className="block text-gray-800 hover:text-purple-600 font-medium py-2 dark:text-gray-200 dark:hover:text-purple-400"
                onClick={() => { showPage('home'); setShowMobileMenu(false); }}
              >
                Home
              </a>
              <a 
                href="#" 
                className="block text-gray-800 hover:text-purple-600 font-medium py-2 dark:text-gray-200 dark:hover:text-purple-400"
                onClick={() => { showPage('explore'); setShowMobileMenu(false); }}
              >
                Explore Artworks
              </a>
              
              {user && (
                <>
                  <a 
                    href="#" 
                    className="block text-gray-800 hover:text-purple-600 font-medium py-2 dark:text-gray-200 dark:hover:text-purple-400"
                    onClick={() => { showPage('add-artwork'); setShowMobileMenu(false); }}
                  >
                    Add Artwork
                  </a>
                  <a 
                    href="#" 
                    className="block text-gray-800 hover:text-purple-600 font-medium py-2 dark:text-gray-200 dark:hover:text-purple-400"
                    onClick={() => { showPage('my-gallery'); setShowMobileMenu(false); }}
                  >
                    My Gallery
                  </a>
                  <a 
                    href="#" 
                    className="block text-gray-800 hover:text-purple-600 font-medium py-2 dark:text-gray-200 dark:hover:text-purple-400"
                    onClick={() => { showPage('my-favorites'); setShowMobileMenu(false); }}
                  >
                    My Favorites
                  </a>
                </>
              )}
              
              <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                {!user ? (
                  <div className="space-y-2">
                    <button 
                      className="w-full px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900"
                      onClick={() => { showPage('login'); setShowMobileMenu(false); }}
                    >
                      Login
                    </button>
                    <button 
                      className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition dark:bg-purple-500 dark:hover:bg-purple-400"
                      onClick={() => { showPage('register'); setShowMobileMenu(false); }}
                    >
                      Register
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <img 
                        src={user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                        alt="User" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                      />
                      <span className="text-gray-800 font-medium dark:text-white">
                        {user.name.split(' ')[0]}
                      </span>
                    </div>
                    <button 
                      className="w-full text-left text-red-500 hover:text-red-700 py-2 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar