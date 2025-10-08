import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/SearchPage.css';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, error, isError } = useMovieSearch(debouncedQuery, page);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleClear = () => {
    setQuery('');
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const totalPages = data ? Math.ceil(data.totalResults / 10) : 0;
  const hasMore = page < totalPages;

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Discover Movies</h1>
        <SearchBar
          value={query}
          onChange={handleSearch}
          onClear={handleClear}
          disabled={isLoading}
        />
      </div>

      {isLoading && <LoadingSpinner />}

      {isError && (
        <div className="error-message">
          <div className="error-text">
            <strong>Error:</strong> {error?.message || 'Something went wrong'}
          </div>
        </div>
      )}

      {data && data.results.length > 0 && (
        <div>
          <div className="results-info">
            Found {data.totalResults} results
          </div>
          <div className="results-grid">
            {data.results.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          
          {hasMore && (
            <div className="load-more-container">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="load-more-btn"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}

      {data && data.results.length === 0 && debouncedQuery && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">
            No movies found
          </h3>
          <p className="empty-state-text">
            Try searching with different keywords
          </p>
        </div>
      )}

      {!debouncedQuery && (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h3 className="empty-state-title">
            Search for movies
          </h3>
          <p className="empty-state-text">
            Enter a movie title to get started
          </p>
        </div>
      )}
    </div>
  );
}