import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { getArtworks } from '../utils/api'
import ArtworkCard from '../components/Artwork/ArtworkCard'
import ArtworkFilters from '../components/Artwork/ArtworkFilters'
import { debounce } from '../utils/helpers'

const Explore = () => {
  const { showLoading } = useContext(AppContext)
  const [artworks, setArtworks] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'newest'
  })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadArtworks(1, true)
  }, [filters])

  const loadArtworks = async (pageNum = 1, reset = false) => {
    showLoading(true)
    try {
      const response = await getArtworks(pageNum, filters)
      if (response.success) {
        if (reset) {
          setArtworks(response.artworks)
        } else {
          setArtworks(prev => [...prev, ...response.artworks])
        }
        setHasMore(response.artworks.length === 12)
        setPage(pageNum)
      }
    } catch (error) {
      console.error('Error loading artworks:', error)
    } finally {
      showLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleLoadMore = () => {
    loadArtworks(page + 1)
  }

  const debouncedSearch = debounce((value) => {
    handleFilterChange({ search: value })
  }, 300)

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">Explore Artworks</h2>
        
        <ArtworkFilters filters={filters} onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map(artwork => (
            <ArtworkCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
        
        {hasMore && artworks.length > 0 && (
          <div className="text-center mt-8">
            <button 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Explore