import React from 'react';

const DiscoveryTimeline = () => {
  const timelineData = [
    { year: "1500 BC", name: "Rosetta Stone", image:`https://i.ibb.co/Ld9DcRWX/Rosetta-Stone.jpg`, location: "Egypt" },
    { year: "200 AD", name: "Terracotta Army", image: `https://i.ibb.co/qMYhNBV7/Terracotta-Army.jpg`, location: "China" },
    
  ];

  return (
    <div className="px-4 md:px-16 py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700"> Artifact Discovery Timeline</h2>
      <div className="space-y-8">
        {timelineData.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">Discovered in: {item.year} | Location: {item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default DiscoveryTimeline;