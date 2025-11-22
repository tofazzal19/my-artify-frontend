import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { AuthContext } from '../context/AuthContext'
import { getUserArtworks, deleteArtwork } from '../utils/api'
import ArtworkCard from '../components/Artwork/ArtworkCard'
import { showAlert } from '../utils/helpers'

const MyGallery = () => {
  const { showPage, showLoading } = useContext(AppContext)
  const { user, token } = useContext(AuthContext)
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    if (user) {
      loadMyGallery()
    }
  }, [user])

  const loadMyGallery = async () => {
    showLoading(true)
    try {
      const response = await getUserArtworks(user.id, token)
      if (response.success) {
        setArtworks(response.artworks)
      }
    } catch (error) {
      console.error('Error loading gallery:', error)
      showAlert('Error loading your gallery', 'error')
    } finally {
      showLoading(false)
    }
  }

  const handleEdit = (artwork) => {
    // This would be implemented to populate the add artwork form
    showAlert('Edit functionality would be implemented here', 'info')
  }

  const handleDelete = async (artworkId) => {
    const confirmed = await showAlert(
      'Are you sure you want to delete this artwork?', 
      'warning', 
      true
    )
    
    if (confirmed) {
      showLoading(true)
      try {
        const response = await deleteArtwork(artworkId, token)
        if (response.success) {
          showAlert('Artwork deleted successfully!', 'success')
          loadMyGallery()
        } else {
          showAlert(response.message || 'Error deleting artwork', 'error')
        }
      } catch (error) {
        console.error('Error deleting artwork:', error)
        showAlert('Error deleting artwork', 'error')
      } finally {
        showLoading(false)
      }
    }
  }

  if (!user) {
    return (
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Please log in to view your gallery</h2>
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
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">My Gallery</h2>
        
        {artworks.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-palette text-gray-300 text-6xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-600 mb-2 dark:text-gray-400">No Artworks Yet</h3>
            <p className="text-gray-500 mb-4 dark:text-gray-500">Start sharing your creativity with the world!</p>
            <button 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={() => showPage('add-artwork')}
            >
              Add Your First Artwork
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map(artwork => (
              <ArtworkCard 
                key={artwork._id} 
                artwork={artwork} 
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyGallery