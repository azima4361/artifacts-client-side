import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from './Loader';

const MyArtifacts = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myArtifacts, setMyArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      fetch(`http://localhost:5000/all/user?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setMyArtifacts(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [user, loading]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This artifact will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/artifact/${id}`, {
          method: 'DELETE'
        });

        const result = await res.json();
        if (result.deletedCount > 0) {
          setMyArtifacts(prev => prev.filter(artifact => artifact._id !== id));
          Swal.fire('Deleted!', 'Your artifact has been deleted.', 'success');
          navigate('/artifacts');
        } else {
          Swal.fire('Not Found', 'Artifact not found.', 'info');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Failed to delete artifact.', 'error');
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  if (isLoading || loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Artifacts</h2>
      {myArtifacts.length === 0 ? (
        <div className="text-center mt-20">
          <h3 className="text-xl text-gray-600"> You haven’t added any artifacts yet.</h3>
          <p className="text-gray-500 mt-2">Go to the Add Artifact page to create your first submission.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myArtifacts.map(artifact => (
            <div key={artifact._id} className="border rounded-lg shadow p-4 bg-white">
              <img src={artifact.image} alt={artifact.name} className="w-full h-60 object-cover rounded mb-3" />
              <h3 className="text-xl font-semibold">{artifact.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Type: {artifact.type}</p>
              <div className="flex justify-between gap-3 mt-4">
                <button
                  onClick={() => handleUpdate(artifact._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(artifact._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtifacts;
