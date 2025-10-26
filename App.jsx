import React, { useEffect, useState } from "react";
import PodcastCard from "./components/PodcastCard";
import GenreFilter from "./components/GenreFilter";
import { filterAndSort } from "./utils/filterAndSort";
import "./App.css";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const result = filterAndSort(
      podcasts,
      searchTerm,
      selectedGenres,
      sortOrder
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [searchTerm, selectedGenres, sortOrder, podcasts]);

  const start = (currentPage - 1) * itemsPerPage;
  const pageData = filtered.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="app">
      <h1>🎙️ Podcast </h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
        <GenreFilter
          selectedGenres={selectedGenres}
          onChange={setSelectedGenres}
        />
      </div>
      <div className="podcast-list">
        {pageData.map((p) => (
          <PodcastCard key={p.id} podcast={p} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}