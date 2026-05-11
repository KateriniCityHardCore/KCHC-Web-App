import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from 'react95/dist/themes/original';
import { Desktop } from './components/Desktop';

// Επαναφορά στυλ για το React95
const GlobalStyles = createGlobalStyle`
  ${styleReset}
  body {
    font-family: 'ms_sans_serif';
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/artist/:name" element={<Desktop />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

