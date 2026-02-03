import movieFallback from "../assets/movie-fallback.svg";

const MovieCard = ({ movie }) => {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : movieFallback;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-500/50 cursor-pointer group">
      <div className="relative aspect-2/3 overflow-hidden bg-slate-900">
        <img
          src={poster}
          alt={movie.Title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = movieFallback;
          }}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 mb-1">
          {movie.Title}
        </h3>
        <p className="text-slate-400 text-xs md:text-sm flex items-center gap-1">
          <span className="text-green-400">📅</span>
          {movie.Year}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
