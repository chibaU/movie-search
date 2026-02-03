import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
const MovieCards = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const search = title || "movie";
  const url = `https://www.omdbapi.com/?s=${search}&page=1&apikey=${API_KEY}`;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          // هنا نعالج كل الحالات السيئة
          if (data.Error === "Too many results.") {
            setMessage("⚠️ النتائج كثيرة جدًا، حاول كتابة اسم أدق");
          } else {
            setMessage("❌ لا توجد نتائج لهذا البحث");
          }
        }

        setMovies(data.Search);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-300 text-lg">⏳ جاري البحث...</p>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="text-center py-20">
        <p className="text-yellow-400 text-lg bg-yellow-500/10 py-4 px-6 rounded-xl border border-yellow-500/20 inline-block">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => {
        return <MovieCard key={movie.imdbID} movie={movie} />;
      })}
    </div>
  );
};

export default MovieCards;
