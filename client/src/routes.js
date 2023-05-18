import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/Register';
import App from './App';
import {createBrowserRouter} from "react-router-dom";
import CheckAuth from './utils/CheckAuth.js';
import Guest from './utils/Guest';
import Profile from './Pages/profile';


const router = createBrowserRouter([
    {
       element:<App />,
      children:
      [{
        path:'/',
        element:<CheckAuth>
            <Home/>
            </CheckAuth>
            
      },
      {
        path:'/profile',
        element:<CheckAuth>
            <Profile/>
            </CheckAuth>
            
      },
      
      {
        path:'/login',
        element:
        <Guest>
          <Login/>
        </Guest>
     
      },
      {
        path:'/register',
        element:
        <Guest>
            <Register/>
        </Guest>
      }]
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
  export default router