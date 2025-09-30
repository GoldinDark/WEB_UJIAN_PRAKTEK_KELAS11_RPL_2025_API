// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 text-gray-300 relative overflow-hidden">
      {/* Efek partikel halus (optional) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(75,85,99,0.2)_0%,transparent_50%)]"></div>
        <div className="w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(147,188,255,0.1)_0%,transparent_50%)]"></div>
      </div>

      {/* Konten footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        {/* Left: Copyright */}
        <div className="text-sm font-light">
          © {new Date().getFullYear()} <span className="font-bold text-blue-400">FILMKOE</span>. All rights reserved.
        </div>

        {/* Right: Links */}
        <div className="flex flex-wrap gap-6 text-sm font-light">
          <a href="https://letterboxd.com/films/" className="hover:text-blue-400 transition duration-200 hover:underline">
            More Movies Rating
          </a>
          <a href="https://www.tix.id/" className="hover:text-blue-400 transition duration-200 hover:underline">
            Movie In Cinemas
          </a>
          <a href="https://www.boxofficemojo.com/chart/top_lifetime_gross/?area=XWW" className="hover:text-blue-400 transition duration-200 hover:underline">
            Top Box Office
          </a>
          <a href="about" className="hover:text-blue-400 transition duration-200 hover:underline">
            Contact Us
          </a>
        </div>
      </div>

      {/* Garis dekoratif di atas footer */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;