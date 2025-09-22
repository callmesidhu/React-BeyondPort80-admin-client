"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus } from "lucide-react";

export default function LandingPage() {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  // Fetch banners
  const fetchBanners = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/landing/show`)
      .then((res) => setBanners(res.data))
      .catch((err) => console.error("Error fetching banners:", err));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Add new banner
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !image) return alert("Title and image are required!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/landing/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setTitle("");
        setImage(null);
        fetchBanners();
      })
      .catch((err) => console.error("Error adding banner:", err));
  };

  // Delete banner
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/landing/delete/${id}`)
      .then(() => fetchBanners())
      .catch((err) => console.error("Error deleting banner:", err));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Landing Banners</h2>

      {/* Add Banner Form */}
      <form
        onSubmit={handleAdd}
        className="p-4 mb-6 bg-white rounded-2xl shadow-md flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded-lg"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </form>

      {/* Show Banners */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={banner.image_url}
              alt={banner.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-semibold">{banner.title}</h3>
              <button
                onClick={() => handleDelete(banner.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
