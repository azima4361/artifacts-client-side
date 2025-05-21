// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../contexts/AuthContext';
// import Loader from './Loader';

// const ArtifactDetails = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [artifact, setArtifact] = useState(null);
//   const [likeCount, setLikeCount] = useState(0);
//   const [isLiking, setIsLiking] = useState(false);

//   useEffect(() => {
//     fetch(`https://artifacts-server-side.vercel.app/all/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setArtifact(data);
//         setLikeCount(data.likeCount || 0);
//       })
//       .catch(err => console.error(err));
//   }, [id]);

//   const handleLike = async () => {
//     if (!user) {
//       Swal.fire({
//         title: 'Login Required',
//         text: 'You must be logged in to like artifacts.',
//         icon: 'warning',
//         confirmButtonText: 'Login Now'
//       }).then(() => navigate('/login'));
//       return;
//     }

//     setIsLiking(true);

//     try {
      
//       const likeRes = await fetch(`https://artifacts-server-side.vercel.app/artifact/like/${id}`, {
//         method: 'PATCH'
//       });

//       if (!likeRes.ok) throw new Error('Failed to update like count');

      
//       const userRes = await fetch(`https://artifacts-server-side.vercel.app/users/like`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: user.email,
//           artifactId: id
//         })
//       });

//       if (!userRes.ok) throw new Error('Failed to update user liked list');

      
//       setLikeCount(prev => prev + 1);

//       Swal.fire({
//         title: 'Success!',
//         text: 'You liked this artifact!',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       });

//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Something went wrong while liking.',
//         icon: 'error',
//         confirmButtonText: 'Try Again'
//       });
//     } finally {
//       setIsLiking(false);
//     }
//   };
  

//   if (!artifact) return <Loader />;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">{artifact.name}</h2>
//       <img src={artifact.image} alt={artifact.name} className="w-full h-96 object-cover mb-4 rounded-lg" />
//       <div className="mb-4">
//         <p><strong>Type:</strong> {artifact.type}</p>
//         <p><strong>Created At:</strong> {new Date(artifact.createdAt).toLocaleString()}</p>
//         <p><strong>Artifact Created (Historically):</strong> {artifact.artifactsCreatedAt}</p>
//         <p><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
//         <p><strong>Discovered By:</strong> {artifact.discoveredBy}</p>
//         <p><strong>Present Location:</strong> {artifact.presentLocation}</p>
//         <p><strong>Historical Context:</strong> {artifact.historicalContext}</p>
//         <p className="font-semibold mt-2"><strong>Likes:</strong> {likeCount}</p>
//       </div>

//       <button
//         onClick={handleLike}
//         className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
//         disabled={isLiking}
//       >
//         {isLiking ? 'Liking...' : 'Like'}
//       </button>
//     </div>
//   );
// };

// export default ArtifactDetails;


import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';
import Loader from './Loader';

const ArtifactDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [artifact, setArtifact] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch(`https://artifacts-server-side.vercel.app/all/${id}`)
      .then(res => res.json())
      .then(data => {
        setArtifact(data);
        setLikeCount(data.likeCount || 0);
        setIsLiked(data.likedBy.includes(user?.email)); 
      })
      .catch(err => console.error(err));
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'You must be logged in to like artifacts.',
        icon: 'warning',
        confirmButtonText: 'Login Now'
      }).then(() => navigate('/login'));
      return;
    }

    setIsLiking(true);

    try {
      const method = isLiked ? 'DELETE' : 'PATCH'; 
      const likeRes = await fetch(`https://artifacts-server-side.vercel.app/artifact/like/${id}`, {
        // method
         method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    },
  body: JSON.stringify({ email: user.email }),
      });

      if (!likeRes.ok) throw new Error('Failed to update like count');

      const userRes = await fetch(`https://artifacts-server-side.vercel.app/users/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          artifactId: id
        })
      });

      if (!userRes.ok) throw new Error('Failed to update user liked list');

      setIsLiked(!isLiked);  
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));  

      Swal.fire({
        title: 'Success!',
        text: isLiked ? 'You disliked this artifact!' : 'You liked this artifact!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while updating like status.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setIsLiking(false);
    }
  };

  if (!artifact) return <Loader />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{artifact.name}</h2>
      <img src={artifact.image} alt={artifact.name} className="w-full h-96 object-cover mb-4 rounded-lg" />
      <div className="mb-4">
        <p><strong>Type:</strong> {artifact.type}</p>
        <p><strong>Created At:</strong> {new Date(artifact.createdAt).toLocaleString()}</p>
        <p><strong>Artifact Created (Historically):</strong> {artifact.artifactsCreatedAt}</p>
        <p><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
        <p><strong>Discovered By:</strong> {artifact.discoveredBy}</p>
        <p><strong>Present Location:</strong> {artifact.presentLocation}</p>
        <p><strong>Historical Context:</strong> {artifact.historicalContext}</p>
        <p className="font-semibold mt-2"><strong>Likes:</strong> {likeCount}</p>
      </div>

      <button
        onClick={handleLike}
        className={`py-2 px-6 rounded-lg ${isLiked ? 'bg-red-600' : 'bg-blue-600'} text-white hover:${isLiked ? 'bg-red-700' : 'bg-blue-700'} disabled:opacity-60 cursor-pointer`}
        disabled={isLiking}
      >
        {isLiking ? (isLiked ? 'Disliking...' : 'Liking...') : (isLiked ? 'Dislike' : 'Like')}
      </button>
    </div>
  );
};

export default ArtifactDetails;
