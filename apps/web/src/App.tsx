import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Otp from './pages/Otp';
import Login from './pages/Login';
import ForgotPassword from './pages/Forgotpassword';
import Address from './pages/Address';

import GirlsReadymade from './pages/GirlsReadymade';
import ProductDetail from './pages/ProductDetail';
import PlaceOrder from './pages/PlaceOrder';
import OrderTracking from './pages/OrderTracking';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import GoogleSuccess from './pages/GoogleSuccess';
import ResetPassword from './pages/ResetPassword';

import WhatsappBot from './components/WhatsappBot';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUpload from './pages/admin/AdminUpload';

import BlouseMeasurementPage from './pages/BlouseMeasurementPage';
import SalwarKameezPage from './pages/SalwarKameezPage';
// import BlouseShared from './pages/shared/blouseShared'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/address" element={<Address />} />

        <Route path="/readymade" element={<GirlsReadymade />} />

        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<AdminUpload />} />

        <Route path="/blouseMeasurementPage" element={<BlouseMeasurementPage />} />
        <Route path="/salwarKameezPage" element={<SalwarKameezPage />} />
        {/* <Route path="/blouseShared" element={<BlouseShared/>} /> */}
        {/* <BlouseShared/> */}
      </Routes>
      <WhatsappBot />
      <Footer />
    </Router>
  );
}

export default App;
