import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { AuthContext } from '../../context/AuthContext'

const ArtworkCard = ({ artwork, showActions = false, onEdit, onDelete, onRemoveFavorite }) => {
  const { openArtworkModal } = useContext(AppContext)
  const { user } = useContext(AuthContext)

  const handleViewDetails = () => {
    openArtworkModal(artwork)
  }

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 dark:bg-gray-700">
      <div 
        className="h-48 bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url('${artwork.imageUrl}')` }}
        onClick={handleViewDetails}
      ></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 dark:text-white">{artwork.title}</h3>
        <div className="flex items-center mb-3">
          <img 
            src={artwork.artistId?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
            alt="Artist" 
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-gray-700 dark:text-gray-300">
            {artwork.artistId?.name || artwork.artistName}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
            {artwork.category}
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            <i className="fas fa-heart text-red-500 mr-1"></i> {artwork.likes || 0}
          </span>
        </div>
        
        <button 
          className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition mb-2"
          onClick={handleViewDetails}
        >
          View Details
        </button>

        {showActions && user && (
          <div className="flex space-x-2 mt-3">
            {onEdit && (
              <button 
                className="flex-1 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                onClick={() => onEdit(artwork)}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button 
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => onDelete(artwork._id)}
              >
                Delete
              </button>
            )}
            {onRemoveFavorite && (
              <button 
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => onRemoveFavorite(artwork._id)}
              >
                Remove from Favorites
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtworkCard