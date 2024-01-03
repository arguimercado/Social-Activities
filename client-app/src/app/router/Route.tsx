import {createBrowserRouter,RouteObject} from 'react-router-dom';
import App from '../layout/App';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../features/activities/form/ActivityForm';
import ActivityDetail from '../features/activities/details/ActivityDetail';

export const routes: RouteObject[] =  [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/activities', element: <ActivityDashboard/>},
            {path: '/activities/:id',element: <ActivityDetail />},
            {path: '/create' , element: <ActivityForm key='create'/>},
            {path: '/edit/:id', element: <ActivityForm key='manage' />}
        ]
    }
]

export const router = createBrowserRouter(routes);