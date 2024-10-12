import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '@/components/Header';

export default function CreatePage() {
  const [images, setImages] = useState<File[]>([]); // Stores up to 3 images
  const [uploadUrls, setUploadUrls] = useState<string[]>([]); // Stores URLs of all uploaded files
  const [loading, setLoading] = useState(false); // Loading state to show UI during upload
  const [storyID, setStoryID] = useState(''); // Input for Story ID
  const [pageID, setPageID] = useState(''); // Input for Page ID

  // Handle multiple image selection (limit to 3 images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length <= 3) {
        setImages((prev) => [...prev, ...newImages].slice(0, 3)); // Ensure a max of 3 images
      } else {
        alert('You can upload a maximum of 3 images.');
      }
    }
  };

  // Move image up in the queue
  const moveImageUp = (index: number) => {
    if (index === 0) return; // Can't move the first image up
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    setImages(newImages);
  };

  // Move image down in the queue
  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return; // Can't move the last image down
    const newImages = [...images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    setImages(newImages);
  };

  // Handle the upload of multiple images with index
  const handleUpload = async () => {
    if (images.length === 0 || !storyID || !pageID) {
      alert('Please provide both Story ID, Page ID and select images.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const urls: string[] = []; // Array to store URLs for all images
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append('mirage', images[i]);

        // Send each image with the index appended to the file name
        const { data } = await axios.post(
          `/api/upload?storyID=${storyID}&pageID=${pageID}&index=${i + 1}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        urls.push(`http://${data.url}`); // Add uploaded URL to the array
      }
      setUploadUrls(urls); // Set all uploaded URLs
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-lg mx-auto p-8 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg mt-10 mb-10">
        <h1 className="text-3xl font-semibold text-black dark:text-white text-center mb-6">Upload up to 3 Images</h1>

        {/* Input fields for Story ID and Page ID */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Story ID</label>
          <input
            type="text"
            value={storyID}
            onChange={(e) => setStoryID(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter Story ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300  text-sm font-bold mb-2">Page ID</label>
          <input
            type="text"
            value={pageID}
            onChange={(e) => setPageID(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter Page ID"
          />
        </div>

        {/* File input for selecting images (up to 3) */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Select Images (Max 3)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded bg-white"
          />
        </div>

        {/* Display selected images with controls to reorder them */}
        <div className="mb-4">
          <h2 className="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">Selected Images</h2>
          {images.map((img, index) => (
            <div key={index} className="flex items-center mb-2">
              <p className="mr-4">{img.name}</p>
              <button
                onClick={() => moveImageUp(index)}
                disabled={index === 0}
                className="bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs rounded-full mr-2"
              >
                Move Up
              </button>
              <button
                onClick={() => moveImageDown(index)}
                disabled={index === images.length - 1}
                className="bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs rounded-full"
              >
                Move Down
              </button>
            </div>
          ))}
        </div>

        {/* Upload button */}
        <div className="text-center">
          <button
            onClick={handleUpload}
            disabled={images.length === 0 || loading || !storyID || !pageID}
            className={`px-6 py-2 text-white rounded-full font-semibold focus:outline-none focus:ring ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>

        {/* Show uploaded images or loading state */}
        <div className="mt-8 text-center">
          {loading && <p className="text-gray-500">Uploading... Please wait.</p>}

          {uploadUrls.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadUrls.map((url, index) => (
                <div key={index} className="max-w-xs mx-auto">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="max-w-full h-auto rounded-lg drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}