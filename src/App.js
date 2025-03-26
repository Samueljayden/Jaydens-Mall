import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/SignUp';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import SignIn from './components/SignIn';
import Addproduct from './components/AddProduct';
import GetProduct from './components/GetProduct';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import SingleProduct from './components/SingleProduct';
import "bootstrap-icons/font/bootstrap-icons.min.css";

function App() {
  return (
    <Router>
      <Navbar/>
    <div className="App">
      <header className="App-header">
        <h1>Welcome to JAYDENS MALL</h1>
      </header>
      <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/addproduct" element={<Addproduct/>} />
      <Route path="/" element={<GetProduct/>} />
      <Route path="/singleproduct" element={<SingleProduct/>} />
      </Routes>
    </div>
    </Router>
  );

}

export default App;
