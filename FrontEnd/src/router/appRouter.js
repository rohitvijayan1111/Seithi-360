import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import PersonalizedPage from "../pages/PersonalizedPage/PersonalizedPage";
import { NotRouteFound } from "../components";
import RegistrationForm from "../pages/Login/RegistrationForm";
import PHomePage from "../pages/HomePage/PHomePage";
import Landingpage from "../components/LandingPage/LandingPage";
import Feed from "../components/Feed/Feed";
import QuizPage from "../pages/QuizPage";
import QuizSection from "../pages/QuizSection";
import LandingPage from "../components/LandingPage/LandingPage";
import Personalization from "../components/Personalization/Personalization";

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
        element: <Feed />,
      },
      {
        path: "/phome",
        element: <PHomePage />,
      },
      {
        path: "/seithi360",
        element: <LandingPage />,
      },
      {
        path:"/yourfeed",
        element:<Personalization />
      },
      {
        path: "/personalized",
        element: <PersonalizedPage />,
      },
      {
        path: "*",
        element: <NotRouteFound />,
      },
      {
        path: "/login",
        element: <RegistrationForm />,
      },
	  {
		path: "/quiz",
		element: <QuizPage/>
	  },
	  {
		path: "/quizw",
		element: <QuizSection/>
	  }
    ],
  },
]);

export default appRouter;
