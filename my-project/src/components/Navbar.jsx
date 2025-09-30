// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 text-white shadow-md py-4 px-6 flex justify-between items-center relative overflow-hidden">
      {/* Efek partikel halus */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(75,85,99,0.2)_0%,transparent_50%)]"></div>
        <div className="w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(147,188,255,0.1)_0%,transparent_50%)]"></div>
      </div>

      {/* Konten navbar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full relative z-10">
        <Link to="/" className="text-2xl font-bold text-blue-400">
          FILMKOE
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/about"
            className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"
          >
            ABOUT US
          </Link>

          {/* ✅ TOGGLE DARK MODE — VERSI LOGO MATAHARI KECIL (SESUAI GAMBAR) */}
          <button
            onClick={toggleDarkMode}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ease-in-out ${
              darkMode ? 'bg-blue-500' : 'bg-gray-300'
            } hover:scale-105`}
            aria-label="Toggle dark mode"
          >
            <div
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ease-in-out ${
                darkMode ? 'translate-x-7' : 'translate-x-0'
              }`}
            >
              {darkMode ? (
                // 🔵 Saat Dark Mode Aktif → Tampilkan Matahari Kecil (Logo Custom)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="3" />
                  <path d="M10 7v6M7 10h6M13 10h2M10 13v2M10 7v-2M7 10l-2-2M13 10l2 2M7 10l-2 2M13 10l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                // ⚪ Saat Light Mode → Tampilkan Bulan (tetap sama, atau bisa diganti juga)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.002 8.002 0 0110.586 10.586z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Garis dekoratif di atas navbar */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </nav>
  );
};

export default Navbar;