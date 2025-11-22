import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { AuthContext } from '../../context/AuthContext'
import { likeArtwork, addFavorite, removeFavorite, checkFavorite } from '../../utils/api'
import { showAlert } from '../../utils/helpers'

const ArtworkModal = () => {
  const { artworkModal, closeArtworkModal, showLoading } = useContext(AppContext)
  const { user, token } = useContext(AuthContext)
  const [artwork, setArtwork] = useState(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (artworkModal) {
      setArtwork(artworkModal)
      setLikesCount(artworkModal.likes || 0)
      checkFavoriteStatus(artworkModal._id)
    }
  }, [artworkModal])

  const checkFavoriteStatus = async (artworkId) => {
    if (!user) return
    
    try {
      const response = await checkFavorite(artworkId, token)
      if (response.success) {
        setIsFavorited(response.isFavorited)
      }
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  const handleLike = async () => {
    if (!user) {
      showAlert('Please log in to like artworks', 'warning')
      return
    }

    try {
      const response = await likeArtwork(artwork._id, token)
      if (response.success) {
        setLikesCount(response.likesCount)
        setIsLiked(response.isLiked)
      } else {
        showAlert(response.message || 'Error liking artwork', 'error')
      }
    } catch (error) {
      console.error('Error liking artwork:', error)
      showAlert('Error liking artwork', 'error')
    }
  }

  const handleFavorite = async () => {
    if (!user) {
      showAlert('Please log in to add favorites', 'warning')
      return
    }

    try {
      if (isFavorited) {
        const response = await removeFavorite(artwork._id, token)
        if (response.success) {
          setIsFavorited(false)
          showAlert('Removed from favorites', 'info')
        }
      } else {
        const response = await addFavorite(artwork._id, token)
        if (response.success) {
          setIsFavorited(true)
          showAlert('Added to favorites!', 'success')
        }
      }
    } catch (error) {
      console.error('Error handling favorite:', error)
      showAlert('Error updating favorites', 'error')
    }
  }

  if (!artwork) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={closeArtworkModal}
    >
      <div 
        className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{artwork.title}</h2>
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeArtworkModal}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src={artwork.artistId?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                  alt="Artist" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {artwork.artistId?.name || artwork.artistName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {artwork.artistId?.email || artwork.artistEmail}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300">{artwork.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium dark:text-white">{artwork.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Medium</p>
                  <p className="font-medium dark:text-white">{artwork.medium}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dimensions</p>
                  <p className="font-medium dark:text-white">{artwork.dimensions || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="font-medium dark:text-white">{artwork.price ? `$${artwork.price}` : '-'}</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={handleLike}
                >
                  <i className={`${isLiked ? 'fas' : 'far'} fa-heart ${isLiked ? 'text-red-500' : ''}`}></i>
                  <span>{likesCount}</span>
                </button>
                <button 
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={handleFavorite}
                >
                  <i className={`${isFavorited ? 'fas' : 'far'} fa-star ${isFavorited ? 'text-yellow-500' : ''}`}></i>
                  <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkModal