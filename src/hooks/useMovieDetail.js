import { useQuery } from '@tanstack/react-query';
import { omdbApi } from '../services/omdbApi';

export const useMovieDetail = (imdbID) => {
  return useQuery({
    queryKey: ['movie', imdbID],
    queryFn: () => omdbApi.getMovieDetails(imdbID),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};