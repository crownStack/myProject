import React, { useEffect, useState } from "react"
import { BrowserRouter , Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from "./HomePages/Navbar"
import NavbarLogout from "./LogoutPage/NavbarLog"
import Home from "./HomePages/Home"
import About from "./HomePages/About"
import Signin from "./Form/Signin"
import Signup from "./Form/Signup"
import LogoutPage from "./LogoutPage/LogoutPage"
import AboutLogout from "./LogoutPage/About"
import Awoofriday from "./HomePages/awoofriday"
import ServiceCenter from "./HomePages/serviceCenter"
import ServiceCenter2 from "./HomePages/serviceCenter2"
import SignupPassword from "./Form/SignupPassword"
import Products from "./Products/Products"
import Findus from "./HomePages/About"
import AddProduct from "./Products/AddProduct"
import ProductNavbar from "./Products/productNavbar"
import Category from "./Products/Category"
import TopSales from "./Products/TopSales"
import ProductsDetails from "./Products/ProductsDetails"
import Cart from './Cart/Cart'
import ConfirmOrder from './Payment/ConfirmOrder'
import Profile from "./HomePages/Profile"
import CodeRequest from "./Form/CodeRequest"
import CreatePassword from "./Form/CreatePassword"
import AdminDashboard from "./Admin/AdminDashboard"
import { API_URL } from "./config"

const isUserSignedIn = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem('signinData') || 'null');
    return Boolean(savedUser && savedUser.email);
  } catch {
    return false;
  }
};

const ProtectedRoute = () => {
  const [accountStatus, setAccountStatus] = useState('checking');

  useEffect(() => {
    let isMounted = true;
    const savedUser = JSON.parse(localStorage.getItem('signinData') || 'null');

    if (!savedUser?.email) {
      setAccountStatus('signed-out');
      return () => {
        isMounted = false;
      };
    }

    const verifyAccount = () => {
      fetch(`${API_URL}/CurrentUser?email=${encodeURIComponent(savedUser.email)}`)
        .then(response => {
          if (response.status === 404) {
            localStorage.removeItem('signinData');
            localStorage.removeItem('signupData');
            if (isMounted) setAccountStatus('deleted');
            return;
          }

          if (!response.ok) throw new Error('Unable to verify account');
          if (isMounted) setAccountStatus('active');
        })
        .catch(() => {
          if (isMounted) setAccountStatus('active');
        });
    };

    verifyAccount();
    const accountCheck = window.setInterval(verifyAccount, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(accountCheck);
    };
  }, []);

  if (accountStatus === 'checking') return null;
  if (accountStatus === 'deleted') return <Navigate to="/" replace />;
  if (accountStatus === 'signed-out' || !isUserSignedIn()) return <Navigate to="/Signin" replace />;

  return <Outlet />;
};

function App() {
  const routerBaseName = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <div>
      <BrowserRouter basename={routerBaseName}>
        <Routes>
          <Route element={<NavbarLogout />}>
            <Route index element={<LogoutPage />} />
            <Route path="/AboutLogOut" element={<AboutLogout />} />
            <Route path="/findus" element={<Findus />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Navbar />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/findus" element={<Findus />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/ConfirmOrder" element={<ConfirmOrder />} />

              <Route element={<ProductNavbar />}>
                <Route path="/Home" element={<Home />} />
                <Route path="/Categories" element={<Category />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/products/:id" element={<ProductsDetails />} />
              </Route>
            </Route>
          </Route>

          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/SignupPassword" element={<SignupPassword />} />
          <Route path="/CodeRequest" element={<CodeRequest />} />
          <Route path="/CreatePassword" element={<CreatePassword />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/awoofriday" element={<Awoofriday />} />
          <Route path="/serviceCenter" element={<ServiceCenter />} />
          <Route path="/serviceCenter2" element={<ServiceCenter2 />} />
          <Route path="/TopSales" element={<TopSales />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
