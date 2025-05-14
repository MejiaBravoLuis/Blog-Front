import { Welcome } from "./components/Welcome"
import { DashboardPage } from "./pages/dashboard/dashboardPage"
import {PublicationDetailPage} from "./pages/publications/PublicationPageDetail"


const routes = [
    {path : '/', element: <Welcome/>},
    {path : '/dashboard', element: <DashboardPage/>},
    { path: '/publications/:id', element: <PublicationDetailPage /> }
]

export default routes