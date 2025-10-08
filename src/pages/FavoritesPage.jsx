import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '../hooks/useFavorites';
import { omdbApi } from '../services/omdbApi';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const { data: favoriteMovies, isLoading } = useQuery({
    queryKey: ['favorites', favorites.map(f => f.imdbID)],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      
      const moviePromises = favorites.map(favorite => 
        omdbApi.getMovieDetails(favorite.imdbID)
      );
      
      return Promise.all(moviePromises);
    },
    enabled: favorites.length > 0,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💙</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start building your collection by searching for movies and adding them to your favorites.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-6">
            You have {favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}
          </p>
          
          {favoriteMovies && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {favoriteMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}