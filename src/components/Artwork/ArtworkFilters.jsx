import React from 'react'

const ArtworkFilters = ({ filters, onFilterChange }) => {
  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value })
  }

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value })
  }

  const handleSortChange = (e) => {
    onFilterChange({ sort: e.target.value })
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search by title or artist..." 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>
        <div className="flex space-x-4">
          <select 
            value={filters.category}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="Painting">Painting</option>
            <option value="Drawing">Drawing</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Photography">Photography</option>
            <option value="Mixed Media">Mixed Media</option>
          </select>
          <select 
            value={filters.sort}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most-liked">Most Liked</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ArtworkFilters