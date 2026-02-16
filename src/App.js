import "./App.css";
import Home from "./Component/HomePage/Home";
import Login from "./Component/Navbar/Login";
import Signup from "./Component/Navbar/Signup";
import Navbar from "./Component/Navbar/Nav";
import DesginOne from "./Component/Resume/DesginMain/DesginOne/DesginOne";
import Profile from "./Component/Navbar/Profile";
import { Route, Routes, Navigate } from "react-router-dom";
import Desgin from "./Component/Resume/DesginMain/Desgin";
import FormProvider from "../src/Component/Resume/Context/FormProvider";
import Footer from "./Component/Footer/Footer";

// Simple Auth Guard Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content-area">
        <div className="app-content-with-nav">
          <FormProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute><Profile /></ProtectedRoute>
              }></Route>
              <Route path="/DesginOne" element={
                <ProtectedRoute><DesginOne /></ProtectedRoute>
              }></Route>
              <Route path="/MainDesgin" element={
                <ProtectedRoute><Desgin /></ProtectedRoute>
              }></Route>
            </Routes>
          </FormProvider>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
