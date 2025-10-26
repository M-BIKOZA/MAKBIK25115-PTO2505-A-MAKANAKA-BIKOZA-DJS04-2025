/**
 * Filters and sorts podcast list based on UI state.
 *
 * @param {Array} podcasts - Full podcast dataset
 * @param {string} searchTerm - Current search input
 * @param {number[]} selectedGenres - List of selected genre IDs
 * @param {string} sortOrder - Sort order ('newest', 'title-asc', 'title-desc')
 * @returns {Array} - Filtered and sorted podcasts
 */

function filterByGenres(podcasts, selectedGenres) {
  if (selectedGenres.length === 0) return podcasts;
  return podcasts.filter((podcast) =>
    podcast.genres.some((id) => selectedGenres.includes(id))
  );
}

export function filterAndSort(podcasts, searchTerm, selectedGenres, sortOrder) {
  let result = [...podcasts];
  if (searchTerm)
    result = result.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  result = filterByGenres(result, selectedGenres);
  if (sortOrder === "newest")
    result.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  else if (sortOrder === "title-asc")
    result.sort((a, b) => a.title.localeCompare(b.title));
  else if (sortOrder === "title-desc")
    result.sort((a, b) => b.title.localeCompare(a.title));
  return result;
}