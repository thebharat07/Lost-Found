import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const LostItem = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    imageUrl: '',
    type: 'lost',
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

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
        console.error('Cloudinary Error:', result);
        throw new Error(result.error?.message || 'Image upload failed');
      }
    } catch (err) {
      console.error('Upload Error:', err.message);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setUploading(true);

    try {
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const finalData = { ...formData, imageUrl };
      

      await axios.post('http://localhost:5000/api/items/lost', finalData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      setSuccess('Lost item posted successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        imageUrl: '',
        type: 'lost',
      });
      setImageFile(null);
    } catch (err) {
      console.error('Post Error:', err.message);
      setError('Failed to post lost item');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Post Lost Item</h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-primary"
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
                  className="w-full px-4 py-2 border rounded shadow-sm"
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
                  className="w-full px-4 py-2 border rounded shadow-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
            >
              {uploading ? 'Uploading...' : 'Submit Lost Item'}
            </button>

            {success && <p className="mt-4 text-green-600">{success}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LostItem;
