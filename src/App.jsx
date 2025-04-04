import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectRoute from "./Components/ProtectRoute/ProtectRoute";
import Users from "./Pages/Users/Users";
import Engineers from "./Pages/Engineers/Engineers";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Layout />
              </ProtectRoute>
            }
          >
            <Route
              index
              element={
                <ProtectRoute>
                  <Dashboard />
                </ProtectRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectRoute>
                  <Users />
                </ProtectRoute>
              }
            />
            <Route
              path="engineers"
              element={
                <ProtectRoute>
                  <Engineers />
                </ProtectRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
