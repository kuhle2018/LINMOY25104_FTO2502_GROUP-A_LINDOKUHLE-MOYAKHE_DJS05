// src/App.jsx

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";



// You have ShowDetail.jsx in your components folder — import it here:
import ShowDetail from "./components/PodcastDetail";
import "./App.css";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPodcasts(data))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <PodcastList
              podcasts={podcasts}
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/show/:id"
          element={<ShowDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

