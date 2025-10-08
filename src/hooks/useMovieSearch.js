import { useQuery } from '@tanstack/react-query';
import { omdbApi } from '../services/omdbApi';

export const useMovieSearch = (query, page = 1, type, year) => {
  return useQuery({
    queryKey: ['search', query, page, type, year],
    queryFn: () => omdbApi.searchMovies(query, page, type, year),
    enabled: query.length >= 2,
    staleTime: 1000 * 60, // 1 minute
  });
};