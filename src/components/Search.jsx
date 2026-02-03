import React, { useState } from "react";

const Search = ({ setSearchTitle }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandle = (e) => {
    setMessage("");
    e.preventDefault();
    if (title.trim().length < 3) {
      setMessage("Please enter at least 3 characters.");
      return;
    }

    setSearchTitle(title);
  };

  return (
    <section className="mb-8">
      <form onSubmit={onSubmitHandle} className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-700">
          <label
            className="text-slate-300 font-medium min-w-fit"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            type="text"
            placeholder="Search for movies..."
            name="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50"
            type="submit"
          >
            Search
          </button>
        </div>
        {message && (
          <p className="text-red-400 text-sm mt-3 text-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20">
            {message}
          </p>
        )}
      </form>
    </section>
  );
};

export default Search;
