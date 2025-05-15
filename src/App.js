import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './components/SignUp';
import SignIn from './components/SignIn';
import Addproduct from './components/AddProduct';
import Navbar from './components/Navbar';
import SingleProduct from './components/SingleProduct';
import About from './components/About';
import ChatBox from './components/ChatBox';
import Test from './components/Test';
import Map from './components/Map';
import Cart from './components/Cart';
import GetProducts from './components/GetProducts';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import Delivery from './components/Delivery';
import ProtectedRoute from './components/ProtectedRoute'; // Import your protected route

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Navigate to="/getproducts" />} />
          <Route path="/getproducts" element={<GetProducts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <Addproduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/singleproduct"
            element={
                <SingleProduct />
            }
          />
          <Route
            path="/about"
            element={
                <About />
            }
          />
          <Route
            path="/chatbox"
            element={
                <ChatBox />
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <Test />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            }
          /><Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact/>
            </ProtectedRoute>
          }
        />
          <Route
            path="/delivery"
            element={
              <ProtectedRoute>
                <Delivery />
              </ProtectedRoute>
            }
          />
    
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
             <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
