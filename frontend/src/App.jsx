// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
// import TestUpload from './components/TestUpload/TestUpload';
// import LoginSplashPage from './components/WelcomePage/WelcomePage';
import WelcomePage from './components/WelcomePage/WelcomePage';

// import SpotsList from './components/SpotsList/SpotsList';
// import * as spotsListActions from './store/spots'; 
// import SpotDetails from './components/SpotDetails/SpotDetails';
// import CreateSpotPage from './components/CreateSpotPage/CreateSpotPage';
// import ManageSpots from './components/ManageSpots/ManageSpots';

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) navigate("/");
  }, [user, isLoaded, navigate]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return isLoaded ? <Outlet /> : null;
}

const router = createBrowserRouter([
  {
    element: (
      <>
        <Layout />
      </>
    ),
    path: "/",
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;