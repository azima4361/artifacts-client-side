import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const LikedArtifacts = () => {
  const { user, loading } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  if (user?.email) {
    setIsLoading(true);
    fetch(`https://artifacts-server-side.vercel.app/users/liked/${user.email}`)
      .then(res => res.json())
      .then(data => {
        // console.log('Fetched liked artifacts:', data);
        setLikedArtifacts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching liked artifacts:', err);
        setIsLoading(false);
      });
  }
}, [user]);

  if (loading) return <Loader></Loader>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Liked Artifacts</h2>
      {isLoading ? (
        <Loader></Loader>
      ) : likedArtifacts.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t liked any artifacts yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {likedArtifacts.map(artifact => (
            <div key={artifact._id} className="p-4 border rounded-lg shadow">
              <img src={artifact.image} alt={artifact.name} className="w-full h-40 object-cover mb-3 rounded" />
              <h3 className="text-xl font-semibold">{artifact.name}</h3>
              <p>{artifact.type}</p>
              <p>Discovered: {artifact.discoveredAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedArtifacts;
