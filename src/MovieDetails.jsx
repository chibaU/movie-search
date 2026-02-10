import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movieFallback from "./assets/movie-fallback.svg";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`,
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("❌ Could not find movie details");
        }
      } catch (err) {
        setError("❌ Error loading data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-300 text-lg">⏳ Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-400 text-lg bg-red-500/10 py-4 px-6 rounded-xl border border-red-500/20 inline-block mb-4">
            {error}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : movieFallback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer mb-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <span className="text-2xl">←</span>
          <span>Back to Search</span>
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={poster}
                  alt={movie.Title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = movieFallback;
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Title and Year */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {movie.Title}
                </h1>
                <div className="flex flex-wrap gap-3 text-slate-300">
                  <span className="flex items-center gap-1">
                    <span className="text-green-400">📅</span>
                    {movie.Year}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-400">⏱️</span>
                    {movie.Runtime}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-400">🎬</span>
                    {movie.Rated}
                  </span>
                </div>
              </div>

              {/* Rating */}
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-2xl">⭐</span>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {movie.imdbRating}
                        </p>
                        <p className="text-xs text-slate-400">IMDB Rating</p>
                      </div>
                    </div>
                  </div>
                  {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                    <div className="text-slate-400 text-sm">
                      {movie.imdbVotes} votes
                    </div>
                  )}
                </div>
              )}

              {/* Genre */}
              {movie.Genre && movie.Genre !== "N/A" && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span>🎭</span>
                    Genre
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(", ").map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-slate-200"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Plot */}
              {movie.Plot && movie.Plot !== "N/A" && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span>📖</span>
                    Plot
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{movie.Plot}</p>
                </div>
              )}

              {/* Director */}
              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span>🎥</span>
                    Director
                  </h3>
                  <p className="text-slate-300">{movie.Director}</p>
                </div>
              )}

              {/* Actors */}
              {movie.Actors && movie.Actors !== "N/A" && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span>🎭</span>
                    Cast
                  </h3>
                  <p className="text-slate-300">{movie.Actors}</p>
                </div>
              )}

              {/* Writers */}
              {movie.Writer && movie.Writer !== "N/A" && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span>✍️</span>
                    Writers
                  </h3>
                  <p className="text-slate-300">{movie.Writer}</p>
                </div>
              )}

              {/* Language & Country */}
              <div className="grid grid-cols-2 gap-4">
                {movie.Language && movie.Language !== "N/A" && (
                  <div>
                    <h3 className="text-green-400 font-semibold mb-1 text-sm">
                      🌐 Language
                    </h3>
                    <p className="text-slate-300 text-sm">{movie.Language}</p>
                  </div>
                )}
                {movie.Country && movie.Country !== "N/A" && (
                  <div>
                    <h3 className="text-green-400 font-semibold mb-1 text-sm">
                      🌍 Country
                    </h3>
                    <p className="text-slate-300 text-sm">{movie.Country}</p>
                  </div>
                )}
              </div>

              {/* Awards */}
              {movie.Awards && movie.Awards !== "N/A" && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span>🏆</span>
                    Awards
                  </h3>
                  <p className="text-slate-300">{movie.Awards}</p>
                </div>
              )}

              {/* Box Office */}
              {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                <div>
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span>💰</span>
                    Box Office
                  </h3>
                  <p className="text-slate-300">{movie.BoxOffice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
