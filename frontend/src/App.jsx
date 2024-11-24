// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import TestUpload from './components/TestUpload/TestUpload';

// import SpotsList from './components/SpotsList/SpotsList';
// import * as spotsListActions from './store/spots'; 
// import SpotDetails from './components/SpotDetails/SpotDetails';
// import CreateSpotPage from './components/CreateSpotPage/CreateSpotPage';
// import ManageSpots from './components/ManageSpots/ManageSpots';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />} */}
      <TestUpload />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/art-pieces',
    element: <TestUpload />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;