// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import WelcomePage from './components/WelcomePage/WelcomePage';
import GalleryHome from './components/GalleryHome/GalleryHome';
import Navigation from './components/Navigation/Navigation';
import ArtDetailsPage from './components/ArtDetailsPage/ArtDetailsPage';
import ManageArtPage from './components/ManageArtPage/ManageArtPage';

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
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "/art-pieces",
        element: (
          <>
          <Navigation />
          <GalleryHome />
          </>
        )
      },
      {
        path: '/art-pieces/:artId',  // art-details page
        element:  (
          <>
          <Navigation />
          <ArtDetailsPage />
          </>
        )
      },
      {
        path: '/art-pieces/manage-art',  
        element: (
          <>
          <Navigation />
          <ManageArtPage />
          </>
        )
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;