// src/App.jsx
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import { ThemeContext } from './context/ThemeContext.jsx';

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark:bg-gray-900' : ''} text-gray-900 ${darkMode ? 'dark:text-white' : ''} transition-colors duration-300 flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<DetailPage />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;