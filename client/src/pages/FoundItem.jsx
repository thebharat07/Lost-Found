import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const FoundItem = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    imageUrl: '',
    type: 'found',
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [matchedItems, setMatchedItems] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'akhilboyina');
    data.append('cloud_name', 'deasmiprq');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/deasmiprq/image/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.secure_url) {
        return result.secure_url;
      } else {
        throw new Error(result.error?.message || 'Image upload failed');
      }
    } catch (err) {
      console.error('Upload Error:', err.message);
      throw err;
    }
  };

  const handleNotify = async (lostItemId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/items/notify/${lostItemId}`,
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
      alert('Failed to notify the user.');
    }
  };
  

  const handleChat = (userId) => {
    alert(`Chat functionality with User ID: ${userId} triggered.`);
    // Navigate or open chat component/modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setMatchedItems([]);
    setUploading(true);

    try {
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const finalData = { ...formData, imageUrl };

      const response = await axios.post('http://localhost:5000/api/items/found', finalData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.matched) {
        setMatchedItems(response.data.items);
        setSuccess('Matching lost items found!');
      } else {
        setSuccess('');
        setMatchedItems([]);
        setError('No matching lost items found.');
      }

      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        imageUrl: '',
        type: 'found',
      });
      setImageFile(null);
    } catch (err) {
      console.error('Post Error:', err.message);
      setError('Failed to post found item');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Post Found Item</h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
            >
              {uploading ? 'Uploading...' : 'Submit Found Item'}
            </button>

            {success && <p className="mt-4 text-green-600">{success}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </form>

          {/* Matching Lost Items */}
          {matchedItems.length > 0 && (
            <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Matching Lost Items:</h2>
              {matchedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border rounded-lg mb-4 shadow-sm bg-gray-50"
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p>{item.description}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleNotify(item.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Notify
                    </button>
                    <button
                      onClick={() => handleChat(item.userId)}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default FoundItem;
