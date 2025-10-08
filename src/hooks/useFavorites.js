import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'movieapp:favorites:v1';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
        localStorage.removeItem(FAVORITES_KEY);
      }
    }
  }, []);

  const addToFavorites = (imdbID) => {
    const newFavorite = {
      imdbID,
      addedAt: new Date().toISOString(),
    };
    
    const updatedFavorites = [newFavorite, ...favorites.filter(f => f.imdbID !== imdbID)];
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter(f => f.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (imdbID) => {
    return favorites.some(f => f.imdbID === imdbID);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};