import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

useEffect(() => {
  const path = location.pathname;

  let pageTitle = 'Historical Artifacts Tracker'; 

  if (path === '/') {
    pageTitle = 'Home | Historical Artifacts Tracker';
  } else if (path === '/artifacts') {
    pageTitle = 'All Artifacts | Historical Artifacts Tracker';
  } else if (path === '/add-artifact') {
    pageTitle = 'Add Artifact | Historical Artifacts Tracker';
  } else if (path === '/my-artifacts') {
    pageTitle = 'My Artifacts | Historical Artifacts Tracker';
  } else if (path === '/liked-artifacts') {
    pageTitle = 'Liked Artifacts | Historical Artifacts Tracker';
  } else if (path === '/login') {
    pageTitle = 'Login | Historical Artifacts Tracker';
  } else if (path === '/register') {
    pageTitle = 'Register | Historical Artifacts Tracker';
  } else if (path.startsWith('/artifact/')) {
    pageTitle = 'Details | Historical Artifacts Tracker';
  } else if (path.startsWith('/update/')) {
    pageTitle = 'Update | Historical Artifacts Tracker';
  } else {
    pageTitle = 'Historical Artifacts Tracker';
  }

  document.title = pageTitle;
}, [location.pathname]);
}

export default DynamicTitle;
