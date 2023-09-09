import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PagePath} from "./helpers/page_helper";
import {RootPage} from "./pages/root/RootPage";
import NotificationView from "./components/NotificationView";
import {ProjectPage} from "./pages/project/ProjectPage";
import {app} from "./contexts/AppContext";
import {InvoicesPage} from "./pages/invoices/InvoicesPage";
import {InvoicePage} from "./pages/invoice/InvoicePage";
import "./style/global.scss";

const router = createBrowserRouter([
    {
        path: PagePath.LANDING, element: <RootPage/>, loader: () => {
            if (!app.model.projects.loaded)
                app.model.projects.clear();
            return null;
        }
    },
    {path: PagePath.PROJECT, element: <ProjectPage/>},
    {path: PagePath.INVOICES, element: <InvoicesPage/>},
    {path: PagePath.INVOICE, element: <InvoicePage/>},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//	<React.StrictMode>
    <>
        <NotificationView/>
        <RouterProvider router={router}/>
    </>
//	</React.StrictMode>,
);
