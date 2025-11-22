import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import LoadingSpinner from './components/Layout/LoadingSpinner'
import Home from './pages/Home'
import Explore from './pages/Explore'
import MyGallery from './pages/MyGallery'
import MyFavorites from './pages/MyFavorites'
import AddArtwork from './components/Artwork/AddArtwork'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ArtworkModal from './components/Artwork/ArtworkModal'

function AppContent() {
  const { currentPage, loading } = useContext(AppContext)
  const { user } = useContext(AuthContext)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'explore':
        return <Explore />
      case 'add-artwork':
        return user ? <AddArtwork /> : <Home />
      case 'my-gallery':
        return user ? <MyGallery /> : <Home />
      case 'my-favorites':
        return user ? <MyFavorites /> : <Home />
      case 'login':
        return <Login />
      case 'register':
        return <Register />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <LoadingSpinner />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer />
      <ArtworkModal />
    </div>
  )
}

export default AppContent