import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ArtistDetails } from './pages/ArtistDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:name" element={<ArtistDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
