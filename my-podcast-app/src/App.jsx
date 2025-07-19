import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PodcastList from './components/PodcastList';
import PodcastDetail from './components/PodcastDetail';
import './App.css';

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(response => response.json())
      .then(data => setPodcasts(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PodcastList podcasts={podcasts} loading={loading} error={error} />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

