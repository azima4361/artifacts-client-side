import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from './Loader';

const UpdateArtifact = () => {
  const { id } = useParams(); 
  const [artifact, setArtifact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://artifacts-server-side.vercel.app/all/${id}`)
      .then(res => res.json())
      .then(data => setArtifact(data))
      .catch(err => console.error('Failed to load artifact', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      image: form.image.value,
      type: form.type.value,
      historicalContext: form.context.value,
    //   createdAt: form.createdAt.value,
      artifactsCreatedAt: form.artifactsCreatedAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value
    };

    if (!/\.(jpeg|jpg|gif|png|webp|svg)$/i.test(updatedData.image)) {
      Swal.fire('Invalid Image URL', 'Please enter a valid image URL.', 'error');
      return;
    }

    try {
      const res = await fetch(`https://artifacts-server-side.vercel.app/all/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Artifact has been successfully updated.'
        }).then(() => {
          navigate('/my-artifacts'); 
        });
      } else {
        Swal.fire('No Changes', 'No updates were made.', 'info');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update artifact.', 'error');
    }
  };

  if (!artifact) return <Loader></Loader>;

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Update Artifact</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Artifact Name</label>
          <input name="name" defaultValue={artifact.name} required className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Artifact Image URL</label>
          <input name="image" defaultValue={artifact.image} required className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Artifact Type</label>
          <select name="type" defaultValue={artifact.type} required className="w-full border rounded-lg px-4 py-2">
            <option value="">Select Type</option>
            <option value="Tools">Tools</option>
            <option value="Weapons">Weapons</option>
            <option value="Documents">Documents</option>
            <option value="Writings">Writings</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Historical Context</label>
          <textarea name="context" defaultValue={artifact.historicalContext} required className="w-full border rounded-lg px-4 py-2 h-28" />
        </div>

        <div>
          <label className="block font-medium mb-1">Artifacts Created At</label>
          <input name="artifactsCreatedAt" defaultValue={artifact.artifactsCreatedAt} required className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Discovered At</label>
          <input name="discoveredAt" defaultValue={artifact.discoveredAt} required className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Discovered By</label>
          <input name="discoveredBy" defaultValue={artifact.discoveredBy} required className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Present Location</label>
          <input name="presentLocation" defaultValue={artifact.presentLocation} required className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
            Update Artifact
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArtifact;
