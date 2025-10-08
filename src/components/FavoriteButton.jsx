import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function FavoriteButton({ isFavorite, onToggle, disabled }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
        isFavorite
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <HeartSolidIcon className="h-5 w-5 mr-2" />
      ) : (
        <HeartIcon className="h-5 w-5 mr-2" />
      )}
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
}