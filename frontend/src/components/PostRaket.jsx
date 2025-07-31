import React, { useState } from "react";
import { Plus, X, Image as ImageIcon } from "lucide-react";
import { usePostRaket } from "../hooks/usePostRaket";

const categories = [
  "Maintenance & Repair",
  "Tech & Electronics",
  "Personal & Home Care",
  "Events & Entertainment",
  "Food & Beverage",
  "Education and Tutoring",
  "Graphic & Digital Design",
  "Business & Professional Services",
  "Automotive",
  "Moving & Delivery Services",
];

const PostRaket = () => {
  const { submitRaket, loading, error, success} = usePostRaket();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setForm((prev) => ({ ...prev, photos: [...files] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handlePhotoUpload = (e) => {
  //   setForm((prev) => ({ ...prev, photos: [...e.target.files] }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const raketData = {
        title: form.title,
        description: form.description,
        category: form.category,
        budget: Number(form.price),
        // Photos
      };

      await submitRaket(raketData);
      console.log("Raket posted successfully");

      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
        photos: [],
      });

    } catch (err) {
      console.error("Error submittin raket:", err);
    }
    console.log("Posting raket:", form);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#FF7C2B] hover:bg-[#e66e20] text-white p-4 rounded-full shadow-md transition-all duration-200 z-50"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 transition-all">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg relative shadow-2xl mx-4 sm:mx-0 animate-[fadeInUp_0.3s_ease-out]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Post a Raket</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-gray-50"
                  placeholder="e.g. Fix my leaking sink"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-gray-50"
                  placeholder="Describe the task, preferred date/time, etc."
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-gray-50 appearance-none"
                >
                  <option value="">--Select a category--</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Price Offer (₱)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min={1}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-gray-50"
                  placeholder="e.g. 500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Upload Photos (max 2)</label>

                <div className="flex items-center space-x-3 mb-2">
                  <label
                    htmlFor="photo-upload"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition cursor-pointer
        ${form.photos.length >= 2
                        ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"}`}
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span>{form.photos.length >= 2 ? "Limit reached" : "Choose photos"}</span>
                  </label>

                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={form.photos.length >= 2}
                    onChange={(e) => {
                      const selected = Array.from(e.target.files);
                      const remainingSlots = 2 - form.photos.length;
                      const limitedFiles = selected.slice(0, remainingSlots);
                      setForm((prev) => ({
                        ...prev,
                        photos: [...prev.photos, ...limitedFiles],
                      }));
                    }}
                    className="hidden"
                  />
                </div>

                {/* Display selected photo file names with remove option */}
                {form.photos.length > 0 && (
                  <ul className="space-y-1 text-sm text-gray-700">
                    {form.photos.map((photo, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                        <span className="truncate max-w-[80%]">{photo.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newPhotos = [...form.photos];
                            newPhotos.splice(index, 1);
                            setForm((prev) => ({ ...prev, photos: newPhotos }));
                          }}
                          className="text-gray-400 hover:text-red-500 transition"
                          aria-label="Remove photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>


              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF7C2B] text-white px-5 py-2 rounded-xl hover:bg-[#e66e20] transition shadow-sm"
                >
                  {loading ? "Posting..." : "Post Raket"}
                </button>
              </div>
            </form>
          </div>
        </div >
      )}
    </>
  );
};

export default PostRaket;
