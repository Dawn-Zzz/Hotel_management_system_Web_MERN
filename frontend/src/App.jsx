import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/Routes";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { Fragment, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { publicAdminRoutes } from "./routes/AdminRoutes";
import AdminDefaultLayout from "./admin/components/layouts/AdminDefaultLayout";
import { useDispatch } from "react-redux";
import { handleRefresh } from "./redux/auth/authAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleRefresh());
  }, []);
  return (
    <>
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
        <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
