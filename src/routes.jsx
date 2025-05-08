import { Welcome } from "./components/Welcome"
import { DashboardPage } from "./pages/dashboard/dashboardPage"

const routes = [
    {path : '/', element: <Welcome/>},
    {path : '/dashboard', element: <DashboardPage/>}
]

export default routes