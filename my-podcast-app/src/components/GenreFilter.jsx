// src/components/GenreFilter.jsx

/**
 * GenreFilter Component
 *
 * @param {Object} props
 * @param {number[]} props.selectedGenres - Selected genre IDs
 * @param {function} props.onChange - Handler to update selected genres
 */

import React, { useState } from "react";
// ✅ Fix import path — your genres file lives in src/Data/genres.js
import { genres } from "../Data/Genres";

export default function GenreFilter({ selectedGenres, onChange }) {
  const [showSelect, setShowSelect] = useState(false);

  const handleChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) =>
      Number(o.value)
    );
    onChange(selected);
  };

  return (
    <div className="filter">
      <button onClick={() => setShowSelect((prev) => !prev)}>
        {showSelect ? "Hide Genres" : "Select Genres"}
      </button>
      {showSelect && (
        <select multiple value={selectedGenres} onChange={handleChange}>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

