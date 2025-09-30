// src/pages/AboutUs.jsx
import { motion } from 'framer-motion';
import { useEffect, useState, useContext } from 'react';
import { User, Users } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext.jsx';

const AboutUs = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    // 🔁 WRAPPER UTAMA DENGAN ANIMASI DARK MODE
    <motion.div
      key={darkMode ? 'dark' : 'light'} // ⭐ Ini memicu re-render & animasi saat mode berubah
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`min-h-screen py-8 px-4 ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-300 text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-4xl font-bold text-center mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          About Us
        </motion.h1>

        {/* Intro Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`rounded-xl p-6 mb-8 ${
            darkMode
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            FILMKOE_DB
          </h2>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            Sebuah web yang memberikan data film sesuka saya.
          </p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            Tugas Ujian Praktek Web.
          </p>
        </motion.div>

        {/* Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Our Vision */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={`rounded-xl p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-200'
            }`}
          >
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Kenapa Memilih API Film?
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Karena saya suka film, Btw Terimakasih Azmie sudah membantu mencari API nya👍
            </p>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={`rounded-xl p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-200'
            }`}
          >
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Anggota Kelompok 7
            </h3>
            <div className="space-y-4">
              {[
                { 
                  name: "Raihan Saca D", 
                  color: "bg-blue-500", 
                  skills: ["API", "React", "Tailwind"] 
                },
                { 
                  name: "Paris Putra", 
                  color: "bg-green-500", 
                  skills: ["About Us", "desain"] 
                },
                { 
                  name: "chesa", 
                  color: "bg-teal-500", 
                  skills: ["DetailPage", "DarkMode"] 
                },
                { 
                  name: "Noer pelangi", 
                  color: "bg-purple-500", 
                  skills: ["Testing", "DarkMode"] 
                },
              ].map((member, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center text-white`}>
                    <User size={24} />
                  </div>
                  <div>
                    <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                      {member.name}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            darkMode
                              ? 'bg-gray-700 text-gray-200'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Grafik Persentase */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className={`rounded-xl p-6 mb-8 ${
            darkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-200'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Film Popularity Around the World
          </h2>
          <div className="space-y-6">
            {[
              { label: "People who watch movies monthly", percent: 87 },
              { label: "Action movie lovers", percent: 65 },
              { label: "Comedy movie lovers", percent: 42 },
              { label: "Horror movie lovers", percent: 30 },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-4">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600 text-sm'}>
                  {item.label}
                </span>
                <div className={`w-full h-4 rounded-full overflow-hidden col-span-2 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div
                    className={`h-full rounded-full ${
                      item.percent > 70 ? 'bg-green-500' :
                      item.percent > 50 ? 'bg-yellow-500' : 'bg-red-500'
                    } transition-transform duration-300 hover:scale-x-105`}
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-center"
        >
          <h2 className="text-2xl font-bold mb-2 text-white">Contact Us</h2>
          <p className="mb-4 text-blue-100">
            Have questions or feedback? We’d love to hear from you!
          </p>
          <button
            onClick={() => window.open('https://www.instagram.com/raihan_1338/', '_blank')}
            className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Send Message
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;