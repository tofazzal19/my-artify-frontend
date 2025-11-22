import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { AuthContext } from '../../context/AuthContext'
import { addArtwork, updateArtwork } from '../../utils/api'
import { showAlert } from '../../utils/helpers'

const AddArtwork = () => {
  const { showPage, showLoading } = useContext(AppContext)
  const { user, token } = useContext(AuthContext)
  const [editingArtwork, setEditingArtwork] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    medium: '',
    imageUrl: '',
    dimensions: '',
    price: '',
    visibility: 'public'
  })

  useEffect(() => {
    if (!user) {
      showAlert('Please log in to add artworks', 'warning')
      showPage('home')
    }
  }, [user, showPage])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.category || !formData.medium || !formData.imageUrl) {
      showAlert('Please fill in all required fields', 'error')
      return
    }

    showLoading(true)
    try {
      const artworkData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : 0
      }

      let response
      if (editingArtwork) {
        response = await updateArtwork(editingArtwork._id, artworkData, token)
      } else {
        response = await addArtwork(artworkData, token)
      }

      if (response.success) {
        showAlert(`Artwork ${editingArtwork ? 'updated' : 'added'} successfully!`, 'success')
        setFormData({
          title: '',
          description: '',
          category: '',
          medium: '',
          imageUrl: '',
          dimensions: '',
          price: '',
          visibility: 'public'
        })
        setEditingArtwork(null)
        showPage('my-gallery')
      } else {
        showAlert(response.message || `Error ${editingArtwork ? 'updating' : 'adding'} artwork`, 'error')
      }
    } catch (error) {
      console.error('Error saving artwork:', error)
      showAlert(`Error ${editingArtwork ? 'updating' : 'adding'} artwork`, 'error')
    } finally {
      showLoading(false)
    }
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">
          {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 shadow-lg dark:bg-gray-700">
          {user && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
              <h3 className="text-lg font-semibold text-purple-800 mb-2 dark:text-purple-300">Artist Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-purple-700 mb-1 dark:text-purple-300">Artist Name</label>
                  <input 
                    type="text" 
                    value={user.name} 
                    className="w-full px-3 py-2 bg-white border border-purple-200 rounded text-purple-800 font-medium dark:bg-gray-600 dark:border-purple-700 dark:text-purple-200" 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm text-purple-700 mb-1 dark:text-purple-300">Artist Email</label>
                  <input 
                    type="text" 
                    value={user.email} 
                    className="w-full px-3 py-2 bg-white border border-purple-200 rounded text-purple-800 font-medium dark:bg-gray-600 dark:border-purple-700 dark:text-purple-200" 
                    readOnly 
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="title">Title *</label>
            <input 
              type="text" 
              id="title" 
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="description">Description *</label>
            <textarea 
              id="description" 
              rows="4" 
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="category">Category *</label>
              <select 
                id="category" 
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
                required
              >
                <option value="">Select Category</option>
                <option value="Painting">Painting</option>
                <option value="Drawing">Drawing</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Photography">Photography</option>
                <option value="Mixed Media">Mixed Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="medium">Medium/Tools *</label>
              <input 
                type="text" 
                id="medium" 
                value={formData.medium}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
                required 
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="imageUrl">Image URL *</label>
            <input 
              type="url" 
              id="imageUrl" 
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="dimensions">Dimensions (optional)</label>
              <input 
                type="text" 
                id="dimensions" 
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
                placeholder="e.g., 24x36 inches" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="price">Price (optional)</label>
              <input 
                type="number" 
                id="price" 
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
                placeholder="0.00" 
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="visibility">Visibility</label>
            <select 
              id="visibility" 
              value={formData.visibility}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="flex justify-center">
            <button type="submit" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              {editingArtwork ? 'Update Artwork' : 'Add Artwork'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddArtwork