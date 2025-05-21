import React from 'react';
import Banner from '../components/Banner';
import FeaturedArtifacts from '../components/FeaturedArtifacts';
import DiscoveryTimeline from '../components/DiscoveryTimeline';
import ArtifactCategories from '../components/ArtifactCategories';


const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <FeaturedArtifacts></FeaturedArtifacts>

            <DiscoveryTimeline></DiscoveryTimeline>

           <ArtifactCategories></ArtifactCategories>
        </div>
        
    );
};

export default Home;