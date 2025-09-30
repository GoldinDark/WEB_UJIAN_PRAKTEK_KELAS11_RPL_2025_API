// src/pages/DetailPage.jsx
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext.jsx';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, allMovies } = location.state || {};
  const { darkMode } = useContext(ThemeContext);

  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    if (!movie) {
      navigate('/');
    }
  }, [movie, navigate]);

  useEffect(() => {
    if (movie && allMovies) {
      const otherMovies = allMovies.filter(m => m.id !== movie.id);
      const shuffled = [...otherMovies].sort(() => 0.5 - Math.random());
      setRecommendedMovies(shuffled.slice(0, 4));
    }
  }, [movie, allMovies]);

  if (!movie) return null;

  const formatPrice = (price) => {
    if (price == null) return "N/A";
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getRating = () => {
    if (movie.ageRating != null) return movie.ageRating;
    if (movie.rating != null) return movie.rating;
    return "18";
  };

  // 🔧 Warna dinamis berdasarkan mode — SUDAH DIUPDATE UNTUK ABU-ABU MUDA
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-200'; // background page
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-gray-300 border border-gray-200'; // ⭐ KONTAINER UTAMA JADI ABU-ABU MUDA + BORDER HALUS
  const posterBg = darkMode ? 'bg-gray-900' : 'bg-gray-300'; // background poster area
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900'; // teks utama (judul, dll)
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-700'; // teks deskripsi, info
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600'; // teks kecil (genre, harga, dll)
  const buttonBg = darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'; // ⭐ BUTTON KEMBALI JADI MERAH
  const recCardBg = darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'; // rekomendasi film
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen py-6 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* 🔘 Tombol Kembali & Beranda */}
        <div className="flex space-x-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className={`px-4 py-2 rounded-lg transition ${buttonBg} text-white`} // ⭐ TEKS PUTIH UNTUK KONTRAS DI MERAH
          >
            ← Kembali
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
          >
            🏠 Beranda
          </button>
        </div>

        <div className={`rounded-lg overflow-hidden shadow-xl ${cardBg} ${darkMode ? 'shadow-2xl' : 'shadow-md'}`}>
          {/* ✅ POSTER — FIX: TAMBAHKAN JARAK DI ATAS POSTER */}
          <div className={`relative overflow-hidden rounded-lg ${posterBg} w-full max-w-[400px] h-[600px] mx-auto mt-4 flex items-start justify-center p-2`}>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover object-top"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/600x900/1a202c/edf2f7?text=No+Poster")
              }
            />
          </div>

          {/* ✅ DATA FILM — JARAK DIPERDEKAT LAGI */}
          <div className="p-4 pt-2">
            <h1 className={`text-2xl font-bold ${textPrimary} mb-2`}>{movie.title}</h1>
            <p className={`${textSecondary} mb-3`}>{movie.description || "No description available."}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-sm">
                <span className="mr-1">🎬</span>
                <span className={textMuted}>Genre: {movie.genre || "Unknown"}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-1">📅</span>
                <span className={textMuted}>Release: {formatDate(movie.releaseDate || movie.release)}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-1">💰</span>
                <span className={textMuted}>Price: {formatPrice(movie.price)}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-1">⭐</span>
                <span className={textMuted}>Rating: {getRating()}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-1">⏱️</span>
                <span className={textMuted}>Duration: {movie.duration || "N/A"}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-1">🎥</span>
                <span className={textMuted}>Director: {movie.director || "Unknown"}</span>
              </div>
            </div>

            {movie.cast && (
              <>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-2`}>Cast</h2>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(movie.cast) ? movie.cast : ["Unknown"]).map((actor, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Rekomendasi Film */}
          {recommendedMovies.length > 0 && (
            <div className={`pt-4 pb-4 px-4 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${textPrimary} mb-3`}>Rekomendasi Film Lain</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recommendedMovies.map(recMovie => (
                  <div
                    key={recMovie.id}
                    onClick={() => navigate(`/movie/${recMovie.id}`, { 
                      state: { movie: recMovie, allMovies } 
                    })}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-colors duration-200 ${recCardBg}`}
                  >
                    <div className={`aspect-[2/3] flex items-start justify-center p-1 ${posterBg}`}>
                      <img
                        src={recMovie.poster}
                        alt={recMovie.title}
                        className="w-full h-full object-contain object-top"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/200x300/1a202c/edf2f7?text=No+Poster")
                        }
                      />
                    </div>
                    <div className="p-2">
                      <h3 className={`text-xs font-bold ${textPrimary} line-clamp-1`}>
                        {recMovie.title}
                      </h3>
                      <p className={`text-[10px] ${textSecondary} mt-1`}>
                        💰 {formatPrice(recMovie.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailPage;