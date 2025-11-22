import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Footer = () => {
  const { showPage } = useContext(AppContext)

  return (
    <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-palette text-purple-400 text-2xl"></i>
              <span className="text-xl font-bold">Artify</span>
            </div>
            <p className="text-gray-300 mb-4">Where creativity meets community. Share your art with the world.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-x-twitter text-lg"></i> 
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-github text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition" onClick={() => showPage('home')}>Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition" onClick={() => showPage('explore')}>Explore Art</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition" onClick={() => showPage('login')}>Artist Login</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition flex items-center space-x-2">
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition flex items-center space-x-2">
                <i className="fab fa-x-twitter"></i> 
                <span>Twitter</span>
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition flex items-center space-x-2">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="mailto:rana.ict337@gmail.com" className="text-gray-300 hover:text-white transition flex items-center space-x-2">
                <i className="fas fa-envelope"></i>
                <span>rana.ict337@gmail.com</span>
              </a></li>
              <li className="text-gray-300 flex items-center space-x-2">
                <i className="fas fa-phone"></i>
                <span>+880-1846524800</span>
              </li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Artify. Made with <i className="fas fa-heart text-red-500"></i> for artists worldwide.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer