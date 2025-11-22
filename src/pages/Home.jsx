import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { getFeaturedArtworks, getLatestArtworks } from '../utils/api'
import Slider from '../Common/Slider'
import ArtworkCard from '../components/Artwork/ArtworkCard'

const Home = () => {
  const { showPage, showLoading } = useContext(AppContext)
  const [featuredArtworks, setFeaturedArtworks] = useState([])
  const [topArtists, setTopArtists] = useState([])

  useEffect(() => {
    loadHomeData()
  }, [])

  const loadHomeData = async () => {
    showLoading(true)
    try {
      const [featuredResponse, latestResponse] = await Promise.all([
        getFeaturedArtworks(),
        getLatestArtworks()
      ])

      if (featuredResponse.success) {
        setFeaturedArtworks(featuredResponse.artworks)
      }

      if (latestResponse.success) {
        setTopArtists(extractTopArtists(latestResponse.artworks))
      }
    } catch (error) {
      console.error('Error loading home data:', error)
    } finally {
      showLoading(false)
    }
  }

  const extractTopArtists = (artworks) => {
    const artistsMap = new Map()
    artworks.forEach(artwork => {
      const artistId = artwork.artistId?._id || 'unknown'
      if (!artistsMap.has(artistId)) {
        artistsMap.set(artistId, {
          id: artistId,
          name: artwork.artistId?.name || artwork.artistName,
          photoURL: artwork.artistId?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          artworkCount: 1
        })
      } else {
        const artist = artistsMap.get(artistId)
        artist.artworkCount++
      }
    })
    return Array.from(artistsMap.values()).slice(0, 4)
  }

  return (
    <div id="home-page">
      <Slider />
      
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">Featured Artworks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map(artwork => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={() => showPage('explore')}
            >
              View All Artworks
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">Top Artists of the Week</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topArtists.map(artist => (
              <div key={artist.id} className="bg-white rounded-xl p-6 shadow-lg text-center dark:bg-gray-700">
                <img 
                  src={artist.photoURL} 
                  alt="Artist" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-purple-600"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1 dark:text-white">{artist.name}</h3>
                <p className="text-gray-600 mb-4 dark:text-gray-300">{artist.artworkCount} Artworks</p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">Community Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg dark:bg-gray-700">
              <div className="flex items-start mb-4">
                <div className="bg-amber-500 text-gray-800 p-3 rounded-lg mr-4">
                  <i className="fas fa-trophy text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1 dark:text-white">Weekly Art Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-300">Join our "Urban Life" theme challenge and showcase your creativity!</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300"><i className="far fa-clock mr-1"></i> 3 days left</span>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Participate
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg dark:bg-gray-700">
              <div className="flex items-start mb-4">
                <div className="bg-purple-600 text-white p-3 rounded-lg mr-4">
                  <i className="fas fa-users text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1 dark:text-white">Artist Meetup</h3>
                  <p className="text-gray-600 dark:text-gray-300">Virtual meetup this Saturday with special guest artist Elena Martinez.</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300"><i className="far fa-calendar mr-1"></i> June 15, 2024</span>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home