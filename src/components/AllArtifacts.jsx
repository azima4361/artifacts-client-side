import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all')
      .then(res => res.json())
      .then(data => setArtifacts(data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artifacts.map(artifact => (
        <div key={artifact._id} className="border shadow-lg rounded-lg p-4 bg-white">
          <img src={artifact.image} alt={artifact.name} className="h-48 w-full object-cover rounded-md mb-3" />
          <h2 className="text-xl font-semibold mb-1">{artifact.name}</h2>
          <p className="text-sm text-gray-600"><strong>Type:</strong> {artifact.type}</p>
          <p className="text-sm text-gray-600"><strong>Location:</strong> {artifact.presentLocation}</p>
          <Link
            to={`/artifact/${artifact._id}`}
            className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Detail
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllArtifacts;
