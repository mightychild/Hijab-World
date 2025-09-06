import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CartProvider } from './context/CartContext';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import './styles/globalStyles.css';

// Wrap pages that need layout
const WithLayout = ({ children }) => (
  <Layout>
    {children}
  </Layout>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public routes without layout */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected routes with layout */}
              <Route path="/dashboard" element={<WithLayout><DashboardPage /></WithLayout>} />
              <Route path="/products" element={<WithLayout><ProductsPage /></WithLayout>} />
              <Route path="/cart" element={<WithLayout><CartPage /></WithLayout>} />
              <Route path="/" element={<WithLayout><ProductsPage /></WithLayout>} />
              
              {/* Add more routes as needed */}
              <Route path="/profile" element={<WithLayout><DashboardPage /></WithLayout>} />
              <Route path="/wishlist" element={<WithLayout><DashboardPage /></WithLayout>} />
              <Route path="/checkout" element={<WithLayout><CheckoutPage /></WithLayout>} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/order-success/:orderId" element={<WithLayout><OrderSuccessPage /></WithLayout>} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;