import { createBrowserRouter, Navigate  } from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/HomePage/HomePage';
import PersonalizedPage from '../pages/PersonalizedPage/PersonalizedPage';
import { NotRouteFound } from '../components';
import RegistrationForm from '../pages/Login/RegistrationForm';
import PHomePage from '../pages/HomePage/PHomePage';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
		children: [
			{
				path: "/",
				element: <Navigate to="/home" replace={true} />,
			},
			{
				path: "/home",
				element: <HomePage />
			},
			{
				path: "/phome",
				element: <PHomePage/>
			},
			{
				path: "/personalized",
				element: <PersonalizedPage />
			},
			{
				path: "*",
				element: <NotRouteFound />
			},
			{
				path: "/login",
				element: <RegistrationForm/>
			}
		]
	}
]);

export default appRouter;