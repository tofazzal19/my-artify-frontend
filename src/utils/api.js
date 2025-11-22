// src/utils/api.js - Mock data only version
const mockArtworks = [
  {
    _id: '1',
    title: 'Sunset Dreams',
    description: 'A beautiful digital painting of a sunset over mountains with vibrant colors and dramatic lighting.',
    category: 'Digital Art',
    medium: 'Digital Painting',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&h=500&fit=crop',
    dimensions: '1920x1080',
    price: 150,
    likes: 24,
    artistId: {
      _id: 'artist1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      photoURL: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    artistName: 'Sarah Johnson',
    artistEmail: 'sarah@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    visibility: 'public'
  },
  {
    _id: '2',
    title: 'Urban Life',
    description: 'Contemporary urban art capturing the energy and movement of city life with bold strokes and vibrant colors.',
    category: 'Painting',
    medium: 'Acrylic on Canvas',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
    dimensions: '24x36 inches',
    price: 320,
    likes: 18,
    artistId: {
      _id: 'artist2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    artistName: 'Mike Chen',
    artistEmail: 'mike@example.com',
    createdAt: '2024-01-10T14:20:00Z',
    visibility: 'public'
  },
  {
    _id: '3',
    title: 'Ocean Waves',
    description: 'Abstract representation of ocean waves using mixed media techniques to create texture and movement.',
    category: 'Mixed Media',
    medium: 'Watercolor and Ink',
    imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&h=500&fit=crop',
    dimensions: '18x24 inches',
    price: 200,
    likes: 32,
    artistId: {
      _id: 'artist3',
      name: 'Emma Davis',
      email: 'emma@example.com',
      photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    artistName: 'Emma Davis',
    artistEmail: 'emma@example.com',
    createdAt: '2024-01-08T09:15:00Z',
    visibility: 'public'
  },
  {
    _id: '4',
    title: 'Mountain Serenity',
    description: 'Peaceful mountain landscape with misty valleys and towering peaks in soft pastel colors.',
    category: 'Painting',
    medium: 'Oil on Canvas',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop',
    dimensions: '30x40 inches',
    price: 450,
    likes: 27,
    artistId: {
      _id: 'artist4',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    artistName: 'Alex Rodriguez',
    artistEmail: 'alex@example.com',
    createdAt: '2024-01-05T16:45:00Z',
    visibility: 'public'
  },
  {
    _id: '5',
    title: 'City Lights',
    description: 'Digital artwork depicting a bustling city at night with glowing lights and reflections.',
    category: 'Digital Art',
    medium: 'Digital Illustration',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    dimensions: '2560x1440',
    price: 180,
    likes: 41,
    artistId: {
      _id: 'artist5',
      name: 'James Wilson',
      email: 'james@example.com',
      photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    artistName: 'James Wilson',
    artistEmail: 'james@example.com',
    createdAt: '2024-01-03T11:20:00Z',
    visibility: 'public'
  },
  {
    _id: '6',
    title: 'Abstract Emotions',
    description: 'Expressive abstract piece exploring the complexity of human emotions through color and form.',
    category: 'Mixed Media',
    medium: 'Acrylic and Collage',
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a569eebe?w=500&h=500&fit=crop',
    dimensions: '20x20 inches',
    price: 280,
    likes: 19,
    artistId: {
      _id: 'artist6',
      name: 'Lisa Thompson',
      email: 'lisa@example.com',
      photoURL: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face'
    },
    artistName: 'Lisa Thompson',
    artistEmail: 'lisa@example.com',
    createdAt: '2024-01-01T13:10:00Z',
    visibility: 'public'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API calls
export const loginUser = async (email, password) => {
  await delay(500);
  return {
    success: true,
    token: 'mock-jwt-token',
    user: {
      id: 'user1',
      name: 'Demo User',
      email: email,
      photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  };
};

export const registerUser = async (userData) => {
  await delay(500);
  return {
    success: true,
    token: 'mock-jwt-token',
    user: {
      id: 'user1',
      name: userData.name,
      email: userData.email,
      photoURL: userData.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  };
};

export const verifyToken = async (token) => {
  return true;
};

export const logoutUser = () => {
  return Promise.resolve({ success: true });
};

export const mockSocialLogin = async (provider) => {
  await delay(500);
  return {
    success: true,
    token: 'mock-social-token',
    user: {
      id: 'social-user-1',
      name: `${provider} User`,
      email: `user@${provider}.com`,
      photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  };
};

// Artworks API calls
export const getFeaturedArtworks = async () => {
  await delay(300);
  return {
    success: true,
    artworks: mockArtworks.slice(0, 3)
  };
};

export const getLatestArtworks = async () => {
  await delay(300);
  return {
    success: true,
    artworks: [...mockArtworks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  };
};

export const getArtworks = async (page = 1, filters = {}) => {
  await delay(300);
  
  let filteredArtworks = [...mockArtworks];
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredArtworks = filteredArtworks.filter(artwork => 
      artwork.title.toLowerCase().includes(searchLower) ||
      artwork.artistName.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.category && filters.category !== '') {
    filteredArtworks = filteredArtworks.filter(artwork => 
      artwork.category === filters.category
    );
  }
  
  if (filters.sort === 'most-liked') {
    filteredArtworks.sort((a, b) => b.likes - a.likes);
  } else if (filters.sort === 'oldest') {
    filteredArtworks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else {
    filteredArtworks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedArtworks = filteredArtworks.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    success: true,
    artworks: paginatedArtworks,
    hasMore: startIndex + itemsPerPage < filteredArtworks.length
  };
};

export const getArtworkById = async (id) => {
  await delay(300);
  const artwork = mockArtworks.find(a => a._id === id) || mockArtworks[0];
  return {
    success: true,
    artwork: artwork
  };
};

export const addArtwork = async (artworkData, token) => {
  await delay(500);
  const newArtwork = {
    _id: `mock-${Date.now()}`,
    ...artworkData,
    likes: 0,
    artistId: {
      _id: 'current-user',
      name: 'Current User',
      email: 'user@example.com',
      photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    artistName: 'Current User',
    artistEmail: 'user@example.com',
    createdAt: new Date().toISOString()
  };
  
  return {
    success: true,
    artwork: newArtwork
  };
};

export const updateArtwork = async (id, artworkData, token) => {
  await delay(500);
  return {
    success: true,
    artwork: { _id: id, ...artworkData }
  };
};

export const deleteArtwork = async (id, token) => {
  await delay(500);
  return { success: true };
};

export const getUserArtworks = async (userId, token) => {
  await delay(300);
  return {
    success: true,
    artworks: []
  };
};

// Likes API calls
export const likeArtwork = async (artworkId, token) => {
  await delay(300);
  const artwork = mockArtworks.find(a => a._id === artworkId) || mockArtworks[0];
  const newLikes = (artwork.likes || 0) + 1;
  
  return {
    success: true,
    likesCount: newLikes,
    isLiked: true
  };
};

// Favorites API calls
export const getFavorites = async (userId, token) => {
  await delay(300);
  return {
    success: true,
    favorites: mockArtworks.slice(0, 2)
  };
};

export const addFavorite = async (artworkId, token) => {
  await delay(300);
  return { success: true };
};

export const removeFavorite = async (artworkId, token) => {
  await delay(300);
  return { success: true };
};

export const checkFavorite = async (artworkId, token) => {
  await delay(300);
  return {
    success: true,
    isFavorited: false
  };
};