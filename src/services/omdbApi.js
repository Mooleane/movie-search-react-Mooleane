const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const omdbApi = {
  async searchMovies(query, page = 1, type, year) {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: query,
      page: page.toString(),
    });

    if (type && type !== 'all') {
      params.append('type', type);
    }
    
    if (year) {
      params.append('y', year);
    }

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.Response === 'False') {
      if (data.Error === 'Movie not found!') {
        return { results: [], totalResults: 0 };
      }
      throw new Error(data.Error || 'Search failed');
    }

    return {
      results: data.Search || [],
      totalResults: parseInt(data.totalResults || '0', 10),
    };
  },

  async getMovieDetails(imdbID) {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: imdbID,
      plot: 'full',
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }

    return data;
  },
};