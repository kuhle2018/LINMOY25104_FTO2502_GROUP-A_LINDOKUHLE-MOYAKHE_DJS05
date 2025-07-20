// src/Utils/MapGenres.js

/**
 * Maps an array of genre IDs to their titles using the static genre list.
 *
 * @param {number[]} genreIds - List of genre IDs
 * @returns {string[]} - List of genre titles
 */

import { genres } from "../Data/genres"; // ✅ corrected path

export function mapGenreIdsToTitles(genreIds) {
  if (!Array.isArray(genreIds)) return [];
  return genreIds.map(
    (id) => genres.find((g) => g.id === id)?.title || "Unknown"
  );
}

