import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/Routes";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { publicAdminRoutes } from "./routes/AdminRoutes";
import AdminDefaultLayout from "./admin/components/layouts/AdminDefaultLayout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.Layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {publicAdminRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = AdminDefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <Toaster />
            </BrowserRouter>
        </>
    );
}

export default App;
