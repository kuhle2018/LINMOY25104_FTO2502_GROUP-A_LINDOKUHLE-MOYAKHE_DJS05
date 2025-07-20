// src/components/PodcastCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { mapGenreIdsToTitles } from "../Utils/MapGenres";

export default function PodcastCard({ podcast }) {
  const genreNames = mapGenreIdsToTitles(podcast.genres);

  return (
    <Link to={`/podcast/${podcast.id}`} state={{ fromFilters: true }}>
      <div className="podcast-card">
        <img
          src={podcast.image}
          alt={`${podcast.title} cover`}
          className="podcast-image"
        />
        <h3>{podcast.title}</h3>
        <p>
          <strong>Genres:</strong> {genreNames.join(", ")}
        </p>
        <p>
          <strong>Updated:</strong>{" "}
          {new Date(podcast.updated).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

