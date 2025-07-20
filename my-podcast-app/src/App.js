// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PodcastList from "./components/PodcastList";
import PodcastDetail from "./components/PodcastDetail";
import "./App.css";

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all podcasts once on mount
  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
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
          path="/podcast/:id"
          element={<PodcastDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

