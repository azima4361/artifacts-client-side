import React from 'react';

const categoryDescriptions = {
  'Ancient Coins': 'Historical currency from ancient civilizations.',
  Pottery: 'Ceramic wares crafted by skilled artisans.',
  Jewelry: 'Ornaments made of precious metals and stones.',
  Sculptures: 'Artistic carvings and statues.',
  Paintings: 'Visual artworks on canvas or walls.',
  Manuscripts: 'Handwritten historical documents.',
  Textiles: 'Fabric arts and woven goods.',
  'Tools & Weapons': 'Implements used for work or defense.',
};

const ArtifactCategories = () => {

  const categoryStats = [
    { name: 'Ancient Coins', count: 34 },
    { name: 'Pottery', count: 28 },
    { name: 'Jewelry', count: 19 },
    { name: 'Sculptures', count: 15 },
    { name: 'Paintings', count: 22 },
    { name: 'Manuscripts', count: 10 },
    { name: 'Textiles', count: 13 },
    { name: 'Tools & Weapons', count: 17 },
  ];

  const totalArtifacts = categoryStats.reduce((sum, c) => sum + c.count, 0);
  const maxCount = Math.max(...categoryStats.map(c => c.count));

  return (
    <div className="px-6 md:px-20 py-12 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border-t border-indigo-200">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-4 relative inline-block">
         Artifact Categories Overview
        <span className="block h-1 w-24 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded mt-2 mx-auto"></span>
      </h2>

      <p className="text-center text-indigo-600 font-semibold mb-10">
        Total Artifacts: <span className="text-indigo-900">{totalArtifacts}</span>
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categoryStats.map((category, idx) => {
          const progressPercent = (category.count / maxCount) * 100;

          return (
            <div
              key={idx}
              className="bg-white border border-indigo-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">{category.name}</h3>
              <p className="text-sm text-indigo-500 mb-4">{categoryDescriptions[category.name]}</p>
              <p className="text-4xl font-extrabold text-indigo-600">{category.count}</p>
              <p className="text-sm text-indigo-400 uppercase tracking-wide mb-4">Artifacts</p>

              
              <div className="w-full bg-indigo-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease' }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

  
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ArtifactCategories;
