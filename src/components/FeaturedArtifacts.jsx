import React, { useEffect, useState } from 'react';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const FeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    fetch('https://artifacts-server-side.vercel.app/artifacts/featured')
      .then(res => res.json())
      .then(data => setArtifacts(data))
      .catch(err => console.error('Error fetching featured artifacts:', err));
  }, []);

  return (
    <div className="my-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 flex justify-center items-center gap-2"> <FaStarHalfAlt></FaStarHalfAlt> Featured Artifacts</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {artifacts.map(artifact => (
          <div key={artifact._id} className="bg-white shadow-md rounded-lg p-4">
            <img src={artifact.image} alt={artifact.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-4">{artifact.name}</h3>
            <p className="text-gray-600 mt-2">{artifact.shortDescription}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-700 flex justify-center items-center gap-2"><FcLike></FcLike> {artifact.likeCount}</span>
              <Link
                to={`/artifact/${artifact._id}`}
                className="text-sm text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/artifacts"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArtifacts;
