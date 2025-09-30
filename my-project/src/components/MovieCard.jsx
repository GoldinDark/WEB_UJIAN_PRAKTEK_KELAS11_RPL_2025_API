// src/components/MovieCard.jsx
const MovieCard = ({ movie }) => {
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

  return (
    <div className="block bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      {/* ✅ POSTER — FIX: UKURAN TETAP, LEBIH KECIL & RAPI */}
      <div className="relative overflow-hidden rounded-lg shadow-lg mb-2 bg-gray-900 w-[200px] h-[300px] mx-auto flex items-start justify-center p-1">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-top transition-transform duration-200 transform-gpu hover:scale-105"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/600x900/1a202c/edf2f7?text=No+Poster")
          }
        />
        {/* Efek overlay saat hover */}
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200"></div>
        {/* Efek shadow saat hover */}
        <div className="absolute inset-0 shadow-lg opacity-0 hover:opacity-50 transition-opacity duration-200"></div>
      </div>

      {/* ✅ DATA FILM — JARAK DIPERDEKAT LAGI */}
      <div className="mt-1">
        {/* Judul */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
          {movie.title || "Untitled"}
        </h2>

        {/* Harga */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          💰 Price: {formatPrice(movie.price)}
        </p>

        {/* Tanggal Rilis */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          📅 Release: {formatDate(movie.releaseDate || movie.release)}
        </p>

        {/* Age Rating */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          🔞 Rating: {getRating()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;