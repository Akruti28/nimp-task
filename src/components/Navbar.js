import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(MovieContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar py-4 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              MovieHub
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Popular
              </Link>
              <Link to="/top-rated" className="text-gray-300 hover:text-white transition-colors">
                Top Rated
              </Link>
              <Link to="/upcoming" className="text-gray-300 hover:text-white transition-colors">
                Upcoming
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="px-4 py-2 rounded-l-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 slide-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Popular
              </Link>
              <Link to="/top-rated" className="text-gray-300 hover:text-white transition-colors">
                Top Rated
              </Link>
              <Link to="/upcoming" className="text-gray-300 hover:text-white transition-colors">
                Upcoming
              </Link>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="px-4 py-2 rounded-l bg-gray-700 text-white flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
