import React from "react";
import { useState } from "react";
import MovieCards from "./components/MovieCards";
import Search from "./components/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const Home = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🎬 Movie Search
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Discover your favorite movies
          </p>
        </div>
        <Search setSearchTitle={setTitle} />
        <MovieCards title={title} />
      </div>
    </div>
  );
};

export default Home;
