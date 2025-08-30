import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import SpinnerContextProvider from "./components/SpinnerContext";
import ScrollToTop from "./components/ScrollToTop";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Corrected import paths for Login and Signup components
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./components/notfound";

const queryClient = new QueryClient();

const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails")
);
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const AdminLogin = lazy(() => import("./pages/AdminLogin/AdminLogin"));
const ProfileLayout = lazy(() => import("./components/ProfileLayout"));
const UserProfile = lazy(() => import("./pages/User/UserProfile/UserProfile"));
const Wishlist = lazy(() => import("./pages/User/Wishlist/Wishlist"));
const Address = lazy(() => import("./pages/User/Address/Address"));
const OverviewDashboard = lazy(() => import("./pages/Dashboard"));
const OrderHistory = lazy(() =>
  import("./pages/User/OrderHistory/OrderHistory")
);
const Support = lazy(() => import("./pages/User/Support/Support"));

// Admin panel
const AdminPanelLayout = lazy(() =>
  import("./components/admin/AdminPanelLayout")
);
const Dashboard = lazy(() => import("./pages/AdminPanel/Dashboard/Dashboard"));
const ProductsPage = lazy(() =>
  import("./pages/AdminPanel/ProductsPage/ProductsPage")
);
const Orders = lazy(() => import("./pages/AdminPanel/Orders/Orders"));
const Coupons = lazy(() => import("./pages/AdminPanel/Coupons/Coupons"));
const Reports = lazy(() => import("./pages/AdminPanel/Reports/Reports"));

AOS.init({
  once: true,
  duration: 500,
  offset: -50,
});

function App() {
  return (
    <SpinnerContextProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner />}>
          <Router>
            <ScrollToTop />
            {/* <FacebookPixelTracker /> */}
            <Toaster
              toastOptions={{
                style: {
                  backgroundColor: "#edce8b",
                },
              }}
            />
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Products listing */}
              <Route
                path="/shop/*"
                element={<Navigate to="/shop/necklace" />}
              />
              <Route
                path="/shop/:category"
                element={
                  <>
                    <Shop />
                  </>
                }
              />

              {/* About us */}
              <Route path="/about-us" element={<AboutUs />} />

              {/* Product details */}
              <Route
                path="/product-details/:productId"
                element={<ProductDetails />}
              />

              {/* Checkout */}
              <Route path="/checkout" element={<Checkout />} />

              {/* Auth */}
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />

              {/* Cart */}
              <Route path="/cart" element={<Cart />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProfileLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="profile" element={<UserProfile />} />
                <Route path="address" element={<Address />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="support" element={<Support />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanelLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="*" element={<Navigate to="/admin" />} />
                <Route path="" exact element={<OverviewDashboard />} />
                <Route path="dashboard" exact element={<Dashboard />} />
                <Route path="products" exact element={<ProductsPage />} />
                <Route path="orders" exact element={<Orders />} />
                <Route path="coupons" exact element={<Coupons />} />
                <Route path="reports" exact element={<Reports />} />
              </Route>
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* Temporary test component for Facebook Pixel */}
            {/* <FacebookPixelTest /> */}
          </Router>
        </Suspense>
      </QueryClientProvider>
    </SpinnerContextProvider>
  );
}

export default App;
