import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const SearchItems = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [token]);

  const handleNotify = async (itemId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/items/notify/${itemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('User notified successfully!');
    } catch (err) {
      console.error('Notification failed:', err);
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.location.toLowerCase().includes(location.toLowerCase()) &&
      item.category.toLowerCase().includes(category.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Search Lost Items</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded border border-gray-300"
            />
            <input
              type="text"
              placeholder="Filter by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 rounded border border-gray-300"
            />
            <input
              type="text"
              placeholder="Filter by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 rounded border border-gray-300"
            />
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h2>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    <p>Category: {item.category}</p>
                    <p>Location: {item.location}</p>
                  </div>
                  <button
                    onClick={() => handleNotify(item.id)}
                    className="mt-4 w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded transition"
                  >
                    Notify User
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No matching items found.</p>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SearchItems;
