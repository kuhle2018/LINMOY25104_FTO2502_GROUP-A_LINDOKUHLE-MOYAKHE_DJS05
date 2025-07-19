/** 
 * ShowDetail.jsx – Displays podcast show details and season navigation
 * @component
 * @returns {JSX.Element}
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { mapGenreIdsToTitles } from "..src/utils/MapGenres";
import "./ShowDetail.css";

export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const goBack = () => {
    navigate("/", { state: location.state });
  };

  if (loading) return <div className="loader">🔄 Loading show details...</div>;
  if (error || !show) return <div className="error">❌ Show not found.</div>;

  const genreTitles = mapGenreIdsToTitles(show.genres);

  return (
    <div className="show-detail">
      <button className="back-button" onClick={goBack}>← Back to Homepage</button>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} className="cover-image" />
      <p className="description">{show.description}</p>
      <p><strong>Genres:</strong> {genreTitles.join(", ")}</p>
      <p><strong>Last Updated:</strong> {new Date(show.updated).toLocaleDateString()}</p>

      <h2>🎧 Seasons</h2>
      {show.seasons.map((season, idx) => (
        <details key={idx} className="season-card">
          <summary>{season.title} ({season.episodes.length} episodes)</summary>
          <ul>
            {season.episodes.map((ep, i) => (
              <li key={i} className="episode">
                <img src={ep.image} alt={ep.title} className="episode-image" />
                <div className="episode-info">
                  <strong>Episode {ep.episode}: {ep.title}</strong>
                  <p>{ep.description?.slice(0, 100)}...</p>
                </div>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

