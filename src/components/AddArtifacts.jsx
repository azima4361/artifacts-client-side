import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';

const AddArtifacts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

     const imageUrl = form.image.value.trim();
  const imageRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i;

  if (!imageRegex.test(imageUrl)) {
    Swal.fire('Invalid Image URL', 'Please enter a valid image URL that ends with .jpg, .png, etc.', 'error');
    return; 
  }
    const newArtifact = {
      name: form.name.value,
      image: form.image.value,
      type: form.type.value,
      historicalContext: form.context.value,
      artifactsCreatedAt: form.artifactsCreatedAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
      addedBy: {
        name: user.displayName,
        email: user.email
      },
      userEmail: user.email,
      likeCount: 0 ,
      likedBy: []
    };

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this artifact?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, add it!'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch('http://localhost:5000/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArtifact)
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Artifact added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          form.reset();
          navigate('/artifacts');
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add artifact.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }

  

  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-white shadow-2xl rounded-xl border">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Add New Artifact</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Artifact Name</label>
          <input name="name" required className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400" placeholder="Artifact" />
        </div>

        <div>
          <label className="block font-medium mb-1">Artifact Image URL</label>
          <input name="image" required className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400" placeholder="https://example.com/artifact.jpg" />
        </div>

        <div>
          <label className="block font-medium mb-1">Artifact Type</label>
          <select name="type" required className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400">
            <option value="">Select Type</option>
            <option value="Tools">Tools</option>
            <option value="Weapons">Weapons</option>
            <option value="Documents">Documents</option>
            <option value="Writings">Writings</option>
            <option value="Painting">Painting</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Historical Context</label>
          <textarea name="context" required className="w-full border rounded-lg px-4 py-2 h-28 focus:outline-blue-400" placeholder="Brief description..." />
        </div>

        <div>
          <label className="block font-medium mb-1">Created At</label>
          <input name="artifactsCreatedAt" required className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400" placeholder="e.g., 196 BC" />
        </div>

        <div>
          <label className="block font-medium mb-1">Discovered At</label>
          <input name="discoveredAt" required className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400" placeholder="e.g., 1799" />
        </div>

        <div>
          <label className="block font-medium mb-1">Discovered By</label>
          <input name="discoveredBy" required className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400" placeholder="e.g., Pierre-François Bouchard" />
        </div>

        <div>
          <label className="block font-medium mb-1">Present Location</label>
          <input name="presentLocation" required className="w-full border rounded-lg px-4 py-2 focus:outline-blue-400" placeholder="e.g., British Museum, London" />
        </div>

        <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
          <input readOnly value={user?.displayName} className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-700" />
          <input readOnly value={user?.email} className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-700" />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
            Add Artifact
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArtifacts;
