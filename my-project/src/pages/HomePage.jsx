// src/pages/HomePage.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext.jsx';

const HomePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 📦 Data film manual (sudah Anda buat)
  const manualMovies = [
    {
      id: 11,
      title: "Better Call Saul",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg",
      price: "Rp 10.000",
      releaseDate: "08 Februari 2015",
      rating: 17,
      genre: "Crime",
      description: "The story of Jimmy McGill, a small-time lawyer who transforms into the morally challenged Saul Goodman.",
      director: "Vince Gilligan",
      cast: ["Bob Odenkirk", "Rhea Seehorn", "Jonathan Banks"],
      duration: "45 min per episode",
      source: "manual",
    },
    {
      id: 12,
      title: "The Godfather",
      poster: "https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      price: "Rp 10.000",
      releaseDate: "15 Maret 1972",
      rating: 19,
      genre: "Crime",
      description: "The story of the powerful Italian-American crime family of Don Vito Corleone.",
      director: "Francis Ford Coppola",
      cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      duration: "175 min",
      source: "manual",
    },
    {
      id: 13,
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      price: "Rp 12.000",
      releaseDate: "16 Juli 2010",
      rating: 13,
      genre: "Sci-Fi",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into a CEO's mind.",
      director: "Christopher Nolan",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      duration: "148 min",
      source: "manual",
    },
    {
      id: 14,
      title: "Oppenheimer",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      price: "Rp 12.000",
      releaseDate: "19 juli 2023",
      rating: 18,
      genre: "Thriller",
      description: "explores the life and legacy of American physicist J. Robert Oppenheimer, who played a key role in developing the atomic bomb.",
      director: "Christopher Nolan",
      cast: ["Cillian Murphy", "Robert Downey Jr.", "Florence Pugh"],
      duration: "180 min",
      source: "manual",
    },
    {
      id: 15,
      title: "The Dark Knight",
      poster: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      price: "Rp 10.000",
      releaseDate: "18 Juli 2008",
      rating: 13,
      genre: "Action",
      description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      duration: "152 min",
      source: "manual",
    },
    {
      id: 16,
      title: "Parasite",
      poster: "https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      price: "Rp 10.000",
      releaseDate: "19 Juni 2019",
      rating: 18,
      genre: "Thriller",
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      director: "Bong Joon Ho",
      cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
      duration: "132 min",
      source: "manual",
    },
  ];

  // 📊 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://any-apis.vercel.app/movies/movies');
        const result = await response.json();
        const moviesList = Array.isArray(result.data) ? result.data : [];

        const apiMovies = moviesList.map(movie => ({
          ...movie,
          source: "api",
        }));

        const allMovies = [...apiMovies, ...manualMovies];
        setMovies(allMovies);
        setFilteredMovies(allMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies(manualMovies);
        setFilteredMovies(manualMovies);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let result = movies;

    if (searchTerm) {
      result = result.filter(movie =>
        movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      result = result.filter(movie =>
        movie.genre?.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    setFilteredMovies(result);
    setCurrentPage(1);
  }, [searchTerm, selectedGenre, movies]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { 
      state: { movie, allMovies: movies } 
    });
  };

  // ✨ Warna dinamis berdasarkan darkMode
  const pageBg = darkMode ? 'bg-gray-900' : 'bg-gray-200'; // Background halaman
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
  const noResultText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const paginationBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const paginationText = darkMode ? 'text-white' : 'text-gray-800';
  const paginationActive = darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white';

  // 🔹 Input & Filter Background — Lebih gelap dari pageBg
  const inputBg = darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900';
  const inputBorder = darkMode ? 'border-gray-700' : 'border-gray-300';
  const inputFocusRing = darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 🎯 Daftar genre unik dari data film
  const genres = [...new Set(movies.map(movie => movie.genre))].sort();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${pageBg} py-8 px-4`}
    >
      {/* 🔁 Animasi background saat darkMode berubah */}
      <motion.div
        key={darkMode ? 'dark' : 'light'} // ⭐ Trigger re-render + animasi saat darkMode berubah
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="max-w-7xl mx-auto"
      >
        {/* 🎬 HERO SECTION — SELAMAT DATANG */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center text-white py-12 px-6 rounded-xl mb-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-4"
            >
              SELAMAT DATANG
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl mb-6 italic"
            >
              “Film adalah jendela ke dunia lain — tempat kita bisa merasakan, belajar, dan bermimpi.”
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8"
            >
              FILMKOE adalah platform yang menyediakan data film terlengkap untuk penggemar film di seluruh dunia.  
              Temukan, jelajahi, dan rasakan kisah-kisah yang tak terlupakan.
            </motion.p>
          </div>
        </motion.section>

        {/* 🔍 Search Bar + Custom Genre Dropdown — DENGAN BACKGROUND LEBIH GELAP */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Cari film..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 rounded-lg border ${inputBorder} ${inputBg} focus:ring-2 ${inputFocusRing} focus:outline-none`}
          />

          {/* Custom Genre Dropdown */}
          <div className="relative w-full sm:w-40">
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              className={`w-full p-3 rounded-lg border ${inputBorder} ${inputBg} focus:ring-2 ${inputFocusRing} focus:outline-none flex justify-between items-center`}
            >
              <span>{selectedGenre || 'Semua Genre'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isGenreOpen && (
              <div
                className={`absolute top-full left-0 mt-1 w-full rounded-lg shadow-lg z-10 ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-300'
                }`}
              >
                <div
                  onClick={() => {
                    setSelectedGenre('');
                    setIsGenreOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer ${
                    darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'
                  } ${selectedGenre === '' ? 'font-semibold' : ''}`}
                >
                  Semua Genre
                </div>
                {genres.map((genre) => (
                  <div
                    key={genre}
                    onClick={() => {
                      setSelectedGenre(genre);
                      setIsGenreOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer ${
                      darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'
                    } ${selectedGenre === genre ? 'font-semibold' : ''}`}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 🎬 Daftar Film — Dengan Animasi Per Halaman */}
        <motion.div
          key={currentPage}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {currentMovies.length > 0 ? (
            currentMovies.map(movie => (
              <motion.div
                key={movie.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => handleMovieClick(movie)}
                className="cursor-pointer"
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))
          ) : (
            <div className={`col-span-full text-center py-12 ${noResultText}`}>
              Tidak ada film ditemukan.
            </div>
          )}
        </motion.div>

        {/* 📄 PAGINATION — Smooth & Estetik */}
        {totalPages > 1 && (
          <div className={`mt-8 flex justify-center items-center gap-2 ${paginationBg} p-3 rounded-lg shadow-md`}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-100 dark:hover:bg-blue-900'
              } ${paginationText}`}
            >
              ← Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === pageNumber
                      ? paginationActive
                      : `${paginationText} hover:bg-gray-200 dark:hover:bg-gray-700`
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-100 dark:hover:bg-blue-900'
              } ${paginationText}`}
            >
              Next →
            </button>
          </div>
        )}

      </motion.div>
    </motion.div>
  );
};

export default HomePage;