import {createBrowserRouter,Navigate,RouteObject} from 'react-router-dom';
import App from '../layout/App';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../features/activities/form/ActivityForm';
import ActivityDetail from '../features/activities/details/ActivityDetail';
import TestErrors from '../features/errors/TestErrors';
import NotFound from '../features/errors/NotFound';
import ServerError from '../features/errors/ServerError';
import Profile from '../features/profiles/ProfilePage';

export const routes: RouteObject[] =  [
    {
        path: '/',
        element: <App />,
        children: [
            
            {path: '/activities', element: <ActivityDashboard/>},
            {path: '/activities/:id',element: <ActivityDetail />},
            {path: '/create' , element: <ActivityForm key='create'/>},
            {path: '/edit/:id', element: <ActivityForm key='manage' />},
            {path: '/profile/:username', element: <Profile />},
            {path: '/errors', element: <TestErrors />},
            {path: '/not-found', element: <NotFound />},
            {path: '/server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
            
        ]
    }
]

export const router = createBrowserRouter(routes);