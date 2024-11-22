// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import TestUpload from './components/TestUpload';

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
    element: <Layout />,
    children: [
      {
        path: '/art-pieces',         
        element: <TestUpload />
      },
      // {
      //   path: '/spots/:spotId',  
      //   element: <SpotDetails />
      // },
      // {
      //   path: '/spots/new',
      //   element: <CreateSpotPage />
      // },
      // {
      //   path: '/spots/manage-spots',  
      //   element: <ManageSpots />
      // },
      // {
      //   path: '/spots/:spotId/edit',  
      //   element: <CreateSpotPage manage={true} />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
