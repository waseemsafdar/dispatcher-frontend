import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './privateRoute'; // Import your PrivateRoute component
import DeliveryForm from '../views/forms/DeliveryForm';
import PartnerForm from '../views/forms/PartnerForm';
import LocationForm from '../views/forms/LocationForm';
import LocationList from '../views/listing/LocationList';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const LoadForm = Loadable(lazy(() => import('../views/forms/LoadForm')));


const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/createload', exact: true, element: <PrivateRoute><LoadForm /></PrivateRoute> },
      { path: '/addlocation', exact: true, element: <PrivateRoute><LocationForm /></PrivateRoute> },
      { path: '/edit-location/:id', element: <PrivateRoute><LocationForm /></PrivateRoute> },
      { path: '/locations', exact: true, element: <PrivateRoute><LocationList /></PrivateRoute> },
      { path: '/addpartner', exact: true, element: <PrivateRoute><PartnerForm /></PrivateRoute> },
      { path: '/icons', exact: true, element: <PrivateRoute><Icons /></PrivateRoute> },
      { path: '/ui/typography', exact: true, element: <PrivateRoute><TypographyPage /></PrivateRoute> },
      { path: '/ui/shadow', exact: true, element: <PrivateRoute><Shadow /></PrivateRoute> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
