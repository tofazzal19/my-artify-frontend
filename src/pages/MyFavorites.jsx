import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { AuthContext } from '../context/AuthContext'
import { getFavorites, removeFavorite } from '../utils/api'
import ArtworkCard from '../components/Artwork/ArtworkCard'
import { showAlert } from '../utils/helpers'

const MyFavorites = () => {
  const { showPage, showLoading } = useContext(AppContext)
  const { user, token } = useContext(AuthContext)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (user) {
      loadFavorites()
    }
  }, [user])

  const loadFavorites = async () => {
    showLoading(true)
    try {
      const response = await getFavorites(user.id, token)
      if (response.success) {
        setFavorites(response.favorites || [])
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
      showAlert('Error loading favorites', 'error')
    } finally {
      showLoading(false)
    }
  }

  const handleRemoveFavorite = async (artworkId) => {
    const confirmed = await showAlert(
      'Remove from favorites?', 
      'question', 
      true
    )
    
    if (confirmed) {
      showLoading(true)
      try {
        const response = await removeFavorite(artworkId, token)
        if (response.success) {
          showAlert('Removed from favorites', 'info')
          loadFavorites()
        } else {
          showAlert(response.message || 'Error removing from favorites', 'error')
        }
      } catch (error) {
        console.error('Error removing favorite:', error)
        showAlert('Error removing from favorites', 'error')
      } finally {
        showLoading(false)
      }
    }
  }

  if (!user) {
    return (
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Please log in to view your favorites</h2>
          <button 
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            onClick={() => showPage('login')}
          >
            Login
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">My Favorites</h2>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-heart text-gray-300 text-6xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-600 mb-2 dark:text-gray-400">No Favorites Yet</h3>
            <p className="text-gray-500 mb-4 dark:text-gray-500">Start exploring and add artworks you love to your favorites!</p>
            <button 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={() => showPage('explore')}
            >
              Explore Artworks
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map(artwork => (
              <ArtworkCard 
                key={artwork._id} 
                artwork={artwork} 
                showActions={true}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyFavorites